"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var parseSvg_1 = require("./utils/parseSvg");
var WriteSvgData_1 = require("./utils/WriteSvgData");
var fs_1 = require("./utils/fs");
var chalk_1 = __importDefault(require("chalk"));
var defalutConfig = {
    parseSvgProps: {},
    baseUrl: '.',
    outDir: './dist',
};
var SvgComponent = /** @class */ (function () {
    function SvgComponent() {
        this.initConfig();
        this.parseSvgInstance = new parseSvg_1.ParseSvg(this._config.parseSvgProps);
        this.writeSvgData = new WriteSvgData_1.WriteSvgData();
    }
    SvgComponent.prototype.initConfig = function () {
        var configPath = path_1.default.resolve(process.cwd(), 'svg.config.js');
        var fileConfig;
        if (fs_1.isFile(configPath)) {
            try {
                fileConfig = require(configPath);
                if (!fileConfig || typeof fileConfig !== 'object') {
                    console.log("Error loading " + chalk_1.default.bold('svg.config.js') + ": should export an object.");
                    fileConfig = null;
                }
            }
            catch (e) {
                console.log("Error loading " + chalk_1.default.bold('svg.config.js') + ":");
                throw e;
            }
        }
        this._config = Object.assign(defalutConfig, fileConfig || {});
    };
    SvgComponent.prototype.parse = function (fliePath) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fs_1.isCompilable(fliePath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_1.readFilePromise(fliePath, 'utf-8')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, this.parseSvgInstance.getNameAndPath(data)];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SvgComponent.prototype.run = function (pathName) {
        return __awaiter(this, void 0, void 0, function () {
            var distPath, outDir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parseAll(pathName)];
                    case 1:
                        _a.sent();
                        if (this._config.afterParse) {
                            this._config.afterParse(this.parseSvgInstance);
                        }
                        distPath = path_1.default.resolve(process.cwd(), this._config.outDir);
                        if (!fs_1.isDir(distPath)) {
                            this.writeSvgData.mkdir(distPath);
                        }
                        outDir = path_1.default.resolve(distPath, './index.js');
                        this.parseSvgInstance.svgDatas = this.writeSvgData.serializeName(this.parseSvgInstance.svgDatas);
                        this.writeSvgData.writeFile(outDir, this.writeSvgData.toString(this.parseSvgInstance.svgDatas), this._config.afterWriteFile);
                        return [2 /*return*/];
                }
            });
        });
    };
    SvgComponent.prototype.parseAll = function (pathName) {
        return __awaiter(this, void 0, void 0, function () {
            var fliePath, files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fliePath = path_1.default.resolve(process.cwd(), this._config.baseUrl, pathName);
                        if (!fs_1.isDir(fliePath)) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs_1.readdirPromise(fliePath)];
                    case 1:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(files.map(function (relativeFile) {
                                var absFile = path_1.default.join('./', pathName, relativeFile);
                                return _this.parseAll(absFile);
                            }))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.parse(fliePath)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return SvgComponent;
}());
exports.SvgComponent = SvgComponent;
//# sourceMappingURL=core.js.map