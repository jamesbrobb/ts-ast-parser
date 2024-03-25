import * as ts from "typescript";

import {IgnorePathsMap} from "../../maps";
import {DuplicatePathPrecedenceMap, PathConversionMap, PathConversionMapEntry, PathReplacementFn} from "../resolvers";
import {BasePathHandler} from "./path-handler";


const RXJS_DOCS_URI = 'https://rxjs.dev/api/index/';

const rxjsTypeMap: Record<string, string> = {
  [ts.SyntaxKind.ClassDeclaration]: 'class',
  [ts.SyntaxKind.FunctionDeclaration]: 'function',
  [ts.SyntaxKind.TypeAliasDeclaration]: 'type-alias',
  [ts.SyntaxKind.InterfaceDeclaration]: 'interface',
  [ts.SyntaxKind.VariableDeclaration]: 'const'
}

const rxjsPathReplaceFn: PathReplacementFn = (_importName, _importModule, kind) => {
  return `${RXJS_DOCS_URI}${rxjsTypeMap[kind || ''] || '' }/`;
}

const IGNORE_INTERNAL_TYPES = 'rxjs/dist/types/internal/types';

const RXJS_PATH_CONVERTOR: PathConversionMapEntry = [/^rxjs(.*[\\\/])/g, rxjsPathReplaceFn];

const rxjsDuplicatePrecedenceMap: DuplicatePathPrecedenceMap = [
  ['rxjs/dist/types/internal/operators', 0],
  ['rxjs/dist/types/internal/observable', 1],
];


export class RxjsPathHandler extends BasePathHandler {

  override getIgnorePathsMap(): IgnorePathsMap {
    return [IGNORE_INTERNAL_TYPES]
  }

  override getDuplicatePathPrecedenceMap(): DuplicatePathPrecedenceMap {
    return rxjsDuplicatePrecedenceMap
  }

  override getPathConversionMap(): PathConversionMap {
    return [RXJS_PATH_CONVERTOR]
  }
}
