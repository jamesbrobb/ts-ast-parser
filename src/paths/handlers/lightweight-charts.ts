import * as ts from "typescript";
import {BasePathHandler} from "./path-handler";
import {PathConversionMap, PathConversionMapEntry, PathReplacementFn} from "../resolvers";


const DOCS_URI = 'https://tradingview.github.io/lightweight-charts/docs/api';

const typeMap: Record<string, string> = {
    [ts.SyntaxKind.EnumDeclaration]: '/enums/',
    [ts.SyntaxKind.InterfaceDeclaration]: '/interfaces/'
}

const pathReplaceFn: PathReplacementFn = (_importName, _importModule, kind) => {
    return `${DOCS_URI}${typeMap[kind || ''] || '#' }${_importName.toLowerCase()}`;
}

const PATH_CONVERTOR: PathConversionMapEntry = [/^lightweight-charts\/dist\/typings$/g, pathReplaceFn];



export class LightweightChartsPathHandler extends BasePathHandler {

    override getPathConversionMap(): PathConversionMap {
        return [PATH_CONVERTOR];
    }
}