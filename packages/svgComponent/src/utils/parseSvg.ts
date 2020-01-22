import { SAXOptions, parser, SAXParser } from 'sax'

const option: SAXOptions = {
  trim: false,
  normalize: true,
  lowercase: true,
  xmlns: true,
  position: true,
}
const STRICT: boolean = true

interface ParseSvgProps {
  tagNames?: string[],
  svgName?: string,
  onParseEnd?: (e: any) => void,
  onParseError?: (e: any) => void,
}

const defalutParseSvgProps: ParseSvgProps = {
  tagNames: ['glyph'],
  svgName: 'glyph-name',
  onParseEnd: () => {},
  onParseError: () => {},
}

class ParseSvg {

  saxParser: SAXParser // svg编译器

  _props: ParseSvgProps

  parsingError: boolean

  svgDatas = []

  names = {}

  constructor(props: ParseSvgProps) {
    this.saxParser = parser(STRICT, option)
    this._props = Object.assign(defalutParseSvgProps, props || {})
    this.parserInit()

  }

  parserInit() {
    const parser = this.saxParser

    parser.onerror = function (e) {
      e.message = 'Error in parsing SVG: ' + e.message
      if (e.message.indexOf('Unexpected end') < 0) {
        throw e
      }
    }
    parser.ontext = function () {
      // got some text.  t is the string of text.
    }
    parser.onopentag = (node: any) => {
      // opened a tag.  node has "name" and "attributes" like <div id="id">
      const { tagNames, svgName } = this._props
      if (!tagNames.includes(node.name)) {
        return
      }
      const attrs = node.attributes
      const name = attrs && attrs[svgName] && attrs[svgName].value
      const d = attrs && attrs.d && attrs.d.value
      if (name && d) {
        const rename = name.indexOf('zaihui_') > -1 ? name : `zaihui_${name}`
        if (!this.names[rename]) {
          this.svgDatas.push({
            d,
            name: rename,
          })
        }
        this.names[rename] = true
      }
    }
    parser.onattribute = function () {
      // an attribute.  attr has "name" and "value"
    }
    parser.onclosetag = () => {
      // closed a tag like </div>
    }
    parser.onend = () => {
      this._props.onParseEnd(this)
      // parser stream is done, and ready to have more stuff written to it.
    }
  }

  getNameAndPath(data) {
    try {
      this.saxParser.write(data)
    } catch (e) {
      this._props.onParseError({ error: e.message })
      this.parsingError = true
    }
    if (!this.parsingError) this.saxParser.close()
    return this.svgDatas
  }
}

export {
  ParseSvg,
  ParseSvgProps,
}
