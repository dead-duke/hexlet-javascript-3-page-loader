import os from 'os';
import path from 'path';
import nock from 'nock';
import * as fsp from 'node:fs/promises';
import pageLoader from '../src/pageLoader.js';

const getFixturePath = (...filepaths) => path.resolve(`__fixtures__/${path.join(...filepaths)}`);
const isExist = (filepath) => {
  const { dir, base } = path.parse(filepath);
  return fsp.readdir(dir).then((filenames) => filenames.includes(base));
};

const pagePath = 'ru-hexlet-io-courses.html';
const pageUrl = new URL('https://ru.hexlet.io/courses');
const contentDir = 'ru-hexlet-io-courses_files';

let expectedPage = '';
let tempDir = '';
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
];

const formats = content.map(({ format }) => format);
const scope = nock(pageUrl.origin).persist();

nock.disableNetConnect();

beforeAll(async () => {
  tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
  expectedPage = await fsp.readFile(getFixturePath('expected', pagePath), 'utf-8');

  const promises = content.map((file) => fsp.readFile(
    getFixturePath('expected', file.filename),
  ).then((data) => ({ ...file, data })));
  content = await Promise.all(promises);

  const page = await fsp.readFile(getFixturePath(pagePath), 'utf-8');
  scope.get(pageUrl.pathname).reply(200, page);
  content.forEach(({ url, data }) => scope.get(url).reply(200, data));
});

describe('page loader', () => {
  test('load page', async () => {
    await pageLoader(tempDir, pageUrl.href);

    const isPageExist = await isExist(path.join(tempDir, pagePath));
    expect(isPageExist).toBeTruthy();

    const actualPage = await fsp.readFile(path.join(tempDir, pagePath), 'utf-8');
    expect(actualPage).toEqual(expectedPage);
  });

  test.each(formats)('load .%s file', async (format) => {
    const { filename, data } = content.find((file) => file.format === format);

    const isFileExist = await isExist(path.join(tempDir, filename));
    expect(isFileExist).toBeTruthy();

    const actualFile = await fsp.readFile(path.join(tempDir, filename));
    expect(actualFile).toEqual(data);
  });
});
