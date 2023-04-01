import path from 'path';
import debug from 'debug';
import { getFilename, getContentDir } from './utilities/pathUtilities.js';
import { makeDir, makeFile } from './utilities/fsUtilities.js';
import { loadContent, getPageContent } from './utilities/loadUtilities.js';

const log = debug('page-loader');

const pageLoader = (output, link) => {
  const url = new URL(link);

  const pagePath = path.join(output, getFilename(url));
  const contentDir = getContentDir(url);
  log('Input data', { url: url.href, path: pagePath, dir: output });

  return loadContent(link)
    .then((data) => {
      log('Create page content directory', { dir: path.join(output, contentDir) });
      return makeDir(path.join(output, contentDir)).then(() => data);
    })
    .then((data) => {
      log('Load page content', { url: url.href });
      return getPageContent(data, contentDir, url.origin);
    })
    .then(({ page, content }) => {
      log('Save page', { url: url.href, path: pagePath });
      return makeFile(pagePath, page).then(() => content);
    })
    .then((content) => {
      content.map((file) => {
        log('Save content', { url: file.link, path: file.path });
        return loadContent(file.link)
          .then((data) => makeFile(path.join(output, file.path), data));
      });
    })
    .then(() => pagePath);
};

export default pageLoader;
