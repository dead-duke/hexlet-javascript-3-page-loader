import path from 'path'

const getPathParts = ({ hostname, pathname }) => path.parse(`${hostname}${pathname}`)

const normalize = string => string.replace(/[^\da-zа-я]/gi, '-')

export const getFilename = (url, extension = null) => {
  const { dir, name, ext } = getPathParts(url)
  if (extension) {
    const pathname = normalize(path.join(dir, name, ext.slice(1)))

    return `${pathname}${extension}`
  }

  const pathname = normalize(path.join(dir, name))

  return `${pathname}${ext || '.html'}`
}

export const getContentDir = (url, dirname = '_files') => {
  const { dir, name } = getPathParts(url)
  const pathname = normalize(path.join(dir, name))

  return `${pathname}${dirname}`
}
