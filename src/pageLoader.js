import path from 'path';
import { getFilename, getContentDir } from './utilities/pathUtilities.js';
import { makeDir, makeFile } from './utilities/fsUtilities.js';
import { loadContent, getPageContent } from './utilities/loadUtilities.js';

const pageLoader = (output, link) => {
  const url = new URL(link);

  const pagePath = path.join(output, getFilename(url));
  const contentDir = getContentDir(url);

  return loadContent(link)
    .then((data) => makeDir(path.join(output, contentDir)).then(() => data))
    .then((data) => getPageContent(data, contentDir, url.origin))
    .then(({ page, content }) => makeFile(pagePath, page).then(() => content))
    .then((content) => content.map(
      (file) => loadContent(file.link)
        .then((data) => makeFile(path.join(output, file.path), data)),
    ))
    .then(() => pagePath)
    .catch((err) => {
      switch (err.code) {
        case 'ENOENT':
          return `no such directory: ${output}`;
        case 'ENOTFOUND':
          return `no such url: ${url}`;
        default:
          return err;
      }
    });
};

export default pageLoader;
