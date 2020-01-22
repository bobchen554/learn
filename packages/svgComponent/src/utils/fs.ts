import FS from 'fs'
import { promisify } from 'util'
import path from 'path'
const COMPILABLE_EXTENSIONS = ['.svg', '.SVG']

const isCompilable = function (filename) {
  const ext = path.extname(filename)
  return COMPILABLE_EXTENSIONS.includes(ext)
}

/**
 * Synchronously check if path is a directory. Tolerant to errors like ENOENT.
 * @param {string} path
 */
const isDir = function (path) {
  try {
    return FS.lstatSync(path).isDirectory()
  } catch (e) {
    return false
  }
}

const isFile = function (filePath) {
  try {
    const stats = FS.statSync(filePath)
    return stats.isFile()
  } catch (error) {
    return false
  }
}

const readdirPromise = promisify(FS.readdir)
const readFilePromise = promisify(FS.readFile)

export {
  isDir,
  isFile,
  readdirPromise,
  isCompilable,
  readFilePromise,
}
