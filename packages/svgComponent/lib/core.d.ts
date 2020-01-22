import { ParseSvgProps } from './utils/parseSvg';
interface SvgComponentConfig {
    baseUrl?: string;
    outDir?: string;
    parseSvgProps: ParseSvgProps;
    afterWriteFile?: (e: any) => void;
    afterParse?: (e: any) => void;
}
declare class SvgComponent {
    _config: SvgComponentConfig;
    parseSvgInstance: any;
    writeSvgData: any;
    constructor();
    initConfig(): void;
    parse(fliePath: any): Promise<any>;
    run(pathName: any): Promise<void>;
    parseAll(pathName: any): Promise<void>;
}
export { SvgComponent, };
