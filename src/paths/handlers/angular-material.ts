import * as ts from "typescript";

import {PathConversionMap, PathConversionMapEntry} from "../resolvers";
import {BasePathHandler} from "./path-handler";
import {IgnorePathsMap} from "../../maps";


const matPathReplaceFn = (_importName: string, _importModule: string, _kind: ts.SyntaxKind) => {
  //console.log(importName, importModule, kind);
  return 'https://material.angular.io/cdk/$name';
}


export const ANGULAR_MATERIAL_PATH_CONVERTOR: PathConversionMapEntry = [
  /^@angular\/(material|cdk)\/(.*?)$/g,
  matPathReplaceFn
]


export class AngularMaterialPathHandler extends BasePathHandler {

  override getIgnorePathsMap(): IgnorePathsMap {
    return [/^(?!.*@angular).*?\/index((\.d)*?\.ts)*?$/g]
  }

  override getPathConversionMap(): PathConversionMap {
    return [ANGULAR_MATERIAL_PATH_CONVERTOR];
  }
}
