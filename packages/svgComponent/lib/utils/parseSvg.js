"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sax_1 = require("sax");
var option = {
    trim: false,
    normalize: true,
    lowercase: true,
    xmlns: true,
    position: true,
};
var STRICT = true;
var defalutParseSvgProps = {
    tagNames: ['glyph'],
    svgName: 'glyph-name',
    onParseEnd: function () { },
    onParseError: function () { },
};
var ParseSvg = /** @class */ (function () {
    function ParseSvg(props) {
        this.svgDatas = [];
        this.names = {};
        this.saxParser = sax_1.parser(STRICT, option);
        this._props = Object.assign(defalutParseSvgProps, props || {});
        this.parserInit();
    }
    ParseSvg.prototype.parserInit = function () {
        var _this = this;
        var parser = this.saxParser;
        parser.onerror = function (e) {
            e.message = 'Error in parsing SVG: ' + e.message;
            if (e.message.indexOf('Unexpected end') < 0) {
                throw e;
            }
        };
        parser.ontext = function () {
            // got some text.  t is the string of text.
        };
        parser.onopentag = function (node) {
            // opened a tag.  node has "name" and "attributes" like <div id="id">
            var _a = _this._props, tagNames = _a.tagNames, svgName = _a.svgName;
            if (!tagNames.includes(node.name)) {
                return;
            }
            var attrs = node.attributes;
            var name = attrs && attrs[svgName] && attrs[svgName].value;
            var d = attrs && attrs.d && attrs.d.value;
            if (name && d) {
                var rename = name.indexOf('zaihui_') > -1 ? name : "zaihui_" + name;
                if (!_this.names[rename]) {
                    _this.svgDatas.push({
                        d: d,
                        name: rename,
                    });
                }
                _this.names[rename] = true;
            }
        };
        parser.onattribute = function () {
            // an attribute.  attr has "name" and "value"
        };
        parser.onclosetag = function () {
            // closed a tag like </div>
        };
        parser.onend = function () {
            _this._props.onParseEnd(_this);
            // parser stream is done, and ready to have more stuff written to it.
        };
    };
    ParseSvg.prototype.getNameAndPath = function (data) {
        try {
            this.saxParser.write(data);
        }
        catch (e) {
            this._props.onParseError({ error: e.message });
            this.parsingError = true;
        }
        if (!this.parsingError)
            this.saxParser.close();
        return this.svgDatas;
    };
    return ParseSvg;
}());
exports.ParseSvg = ParseSvg;
//# sourceMappingURL=parseSvg.js.map