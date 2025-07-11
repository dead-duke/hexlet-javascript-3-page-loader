import * as fsp from 'node:fs/promises'

export const makeDir = dirpath => fsp.readdir(dirpath).catch(() => fsp.mkdir(dirpath))

export const makeFile = (filepath, data) => fsp.writeFile(filepath, data, { encoding: 'utf-8' })
