import os from 'os'
import path from 'path'
import nock from 'nock'
import * as fsp from 'node:fs/promises'
import {
  describe,
  test,
  expect,
  beforeAll,
} from '@jest/globals'
import pageLoader from '../src/pageLoader.js'

const getFixturePath = (...filepaths) => path.resolve(`__fixtures__/${path.join(...filepaths)}`)
const isExist = (filepath) => {
  const { dir, base } = path.parse(filepath)
  return fsp.readdir(dir).then(filenames => filenames.includes(base))
}

const pagePath = 'ru-hexlet-io-courses.html'
const pageUrl = new URL('https://ru.hexlet.io/courses')
const contentDir = 'ru-hexlet-io-courses_files'

let expectedPage = ''
let tempDir = ''
let content = [
  {
    format: 'css',
    url: '/assets/application.css',
    filename: path.join(contentDir, 'ru-hexlet-io-assets-application.css'),
  },
  {
    format: 'png',
    url: '/assets/professions/nodejs.png',
    filename: path.join(contentDir, 'ru-hexlet-io-assets-professions-nodejs.png'),
  },
  {
    format: 'js',
    url: '/packs/js/runtime.js',
    filename: path.join(contentDir, 'ru-hexlet-io-packs-js-runtime.js'),
  },
  {
    format: 'html',
    url: '/courses',
    filename: path.join(contentDir, 'ru-hexlet-io-courses.html'),
  },
]

const formats = content.map(({ format }) => format)
const scope = nock(pageUrl.origin).persist()

nock.disableNetConnect()

beforeAll(async () => {
  tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))
  expectedPage = await fsp.readFile(getFixturePath('expected', pagePath), 'utf-8')

  const promises = content.map(file => fsp.readFile(
    getFixturePath('expected', file.filename),
  ).then(data => ({ ...file, data })))
  content = await Promise.all(promises)

  const page = await fsp.readFile(getFixturePath(pagePath), 'utf-8')
  scope.get(pageUrl.pathname).reply(200, page)
  content.forEach(({ url, data }) => scope.get(url).reply(200, data))
})

describe('page loader negative cases', () => {
  test('load page: invalid url', async () => {
    const isFileAlreadyExist = await isExist(path.join(tempDir, pagePath))
    expect(isFileAlreadyExist).toBeFalsy()

    const invalidUrl = new URL('https://badsite')
    const expectedError = `getaddrinfo ENOTFOUND ${invalidUrl.host}`
    nock(invalidUrl).persist().get('/').replyWithError(expectedError)
    await expect(pageLoader(invalidUrl, tempDir)).rejects.toThrow(expectedError)

    const isFileExist = await isExist(path.join(tempDir, pagePath))
    await expect(isFileExist).toBeFalsy()
  })

  test.each([404, 500])('load page: response status code %s', async (code) => {
    scope.get(`/${code}`).reply(code, null)
    await expect(pageLoader(new URL(`${pageUrl.origin}/${code}`), tempDir))
      .rejects.toThrow(`Request failed with status code ${code}`)
  })

  test('load page: file system errors', async () => {
    const invalidPath = getFixturePath('invalidPath')
    const invalidPathError = `ENOENT: no such file or directory, mkdir '${path.join(invalidPath, contentDir)}'`
    await expect(pageLoader(pageUrl.href, invalidPath)).rejects.toThrow(invalidPathError)

    const rootDir = '/sys'
    const permissionDeniedError = `EACCES: permission denied, mkdir '${path.join(rootDir, contentDir)}'`
    await expect(pageLoader(pageUrl.href, rootDir)).rejects.toThrow(permissionDeniedError)

    const filepath = getFixturePath(pagePath)
    const directoryTypeError = `ENOTDIR: not a directory, mkdir '${path.join(filepath, contentDir)}'`
    await expect(pageLoader(pageUrl.href, filepath)).rejects.toThrow(directoryTypeError)
  })
})

describe('page loader positive cases', () => {
  test('load page', async () => {
    const isFileAlreadyExist = await isExist(path.join(tempDir, pagePath))
    expect(isFileAlreadyExist).toBeFalsy()

    await pageLoader(pageUrl.href, tempDir)

    const isPageExist = await isExist(path.join(tempDir, pagePath))
    await expect(isPageExist).toBeTruthy()

    const actualPage = await fsp.readFile(path.join(tempDir, pagePath), 'utf-8')
    await expect(actualPage).toEqual(expectedPage)
  })

  test.each(formats)('load .%s file', async (format) => {
    const { filename, data } = content.find(file => file.format === format)

    const isFileExist = await isExist(path.join(tempDir, filename))
    await expect(isFileExist).toBeTruthy()

    const actualFile = await fsp.readFile(path.join(tempDir, filename))
    await expect(actualFile).toEqual(data)
  })
})
