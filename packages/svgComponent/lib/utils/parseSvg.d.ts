import { SAXParser } from 'sax';
interface ParseSvgProps {
    tagNames?: string[];
    svgName?: string;
    onParseEnd?: (e: any) => void;
    onParseError?: (e: any) => void;
}
declare class ParseSvg {
    saxParser: SAXParser;
    _props: ParseSvgProps;
    parsingError: boolean;
    svgDatas: any[];
    names: {};
    constructor(props: ParseSvgProps);
    parserInit(): void;
    getNameAndPath(data: any): any[];
}
export { ParseSvg, ParseSvgProps, };
