/// <reference types="node" />
import FS from 'fs';
declare const isCompilable: (filename: any) => boolean;
/**
 * Synchronously check if path is a directory. Tolerant to errors like ENOENT.
 * @param {string} path
 */
declare const isDir: (path: any) => boolean;
declare const isFile: (filePath: any) => boolean;
declare const readdirPromise: typeof FS.readdir.__promisify__;
declare const readFilePromise: typeof FS.readFile.__promisify__;
export { isDir, isFile, readdirPromise, isCompilable, readFilePromise, };
