import path from 'path';

const getPathParts = ({ hostname, pathname }) => path.parse(`${hostname}${pathname}`);

const normalize = (string) => string.replace(/[^\da-zа-я]/gi, '-');

export const getFilename = (url) => {
  const { dir, name, ext } = getPathParts(url);
  const pathname = normalize(path.join(dir, name));
  const extension = ext || '.html';

  return `${pathname}${extension}`;
};

export const getContentDir = (url, dirname = '_files') => {
  const { dir, name } = getPathParts(url);
  const pathname = normalize(path.join(dir, name));

  return `${pathname}${dirname}`;
};
