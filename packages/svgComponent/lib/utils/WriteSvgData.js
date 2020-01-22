"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var WriteSvgData = /** @class */ (function () {
    function WriteSvgData() {
    }
    WriteSvgData.prototype.serializeName = function (svgDatas) {
        return svgDatas.map(function (item) { return (item.name.indexOf('-') > -1 ? {
            name: item.name.replace(/-/i, '_'),
            d: item.d,
        } : item); });
    };
    WriteSvgData.prototype.toString = function (svgDatas) {
        var data = '';
        var exportStr = '';
        svgDatas.forEach(function (item) {
            data = data + ("const " + item.name + " = \"" + item.d + "\"\n");
            exportStr = exportStr + ("  " + item.name + ",\n");
        });
        return data + "export default {\n" + exportStr + "}";
    };
    WriteSvgData.prototype.mkdir = function (path) {
        fs_1.default.mkdirSync(path);
    };
    WriteSvgData.prototype.writeFile = function (path, data, callback) {
        fs_1.default.writeFile(path, data, function (err) {
            if (err)
                throw err;
            if (callback) {
                callback();
            }
        });
    };
    return WriteSvgData;
}());
exports.WriteSvgData = WriteSvgData;
//# sourceMappingURL=WriteSvgData.js.map