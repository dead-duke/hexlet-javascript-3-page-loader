import axios from 'axios'
import path from 'path'
import * as cheerio from 'cheerio'
import { getFilename } from './pathUtilities.js'

export const loadContent = link => axios
  .get(link, { responseType: 'arraybuffer' }).then(({ data }) => data)

export const getPageContent = (data, contentDir, originUrl) => {
  const html = cheerio.load(data)

  const tags = [
    { tag: 'img', attr: 'src' },
    { tag: 'link', attr: 'href' },
    { tag: 'script', attr: 'src' },
  ]

  const content = tags.flatMap(({ tag, attr }) => html(tag).toArray()
    .filter((element) => {
      const url = new URL(html(element).attr(attr), originUrl)

      return url.origin === originUrl
    })
    .map((element) => {
      const url = new URL(html(element).attr(attr), originUrl)
      const filePath = path.join(contentDir, getFilename(url))
      html(element).attr(attr, filePath)

      return { link: url.href, path: filePath }
    }))

  return { page: html.html(), content }
}
