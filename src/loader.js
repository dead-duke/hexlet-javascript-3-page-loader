import axios from 'axios';
import path from 'path';
import * as fsp from 'node:fs/promises';

export const getFilename = (url) => `${url.replace(/.*:\/\//, '').replace(/[^\da-zа-я]/ig, '-')}.html`;

const pageLoader = (output, url) => {
  const filepath = path.join(output, getFilename(url));

  return axios
    .get(url)
    .then((response) => response.data)
    .then((data) => fsp.writeFile(filepath, data))
    .then(() => filepath)
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
