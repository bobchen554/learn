"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
var path_1 = __importDefault(require("path"));
var COMPILABLE_EXTENSIONS = ['.svg', '.SVG'];
var isCompilable = function (filename) {
    var ext = path_1.default.extname(filename);
    return COMPILABLE_EXTENSIONS.includes(ext);
};
exports.isCompilable = isCompilable;
/**
 * Synchronously check if path is a directory. Tolerant to errors like ENOENT.
 * @param {string} path
 */
var isDir = function (path) {
    try {
        return fs_1.default.lstatSync(path).isDirectory();
    }
    catch (e) {
        return false;
    }
};
exports.isDir = isDir;
var isFile = function (filePath) {
    try {
        var stats = fs_1.default.statSync(filePath);
        return stats.isFile();
    }
    catch (error) {
        return false;
    }
};
exports.isFile = isFile;
var readdirPromise = util_1.promisify(fs_1.default.readdir);
exports.readdirPromise = readdirPromise;
var readFilePromise = util_1.promisify(fs_1.default.readFile);
exports.readFilePromise = readFilePromise;
//# sourceMappingURL=fs.js.map