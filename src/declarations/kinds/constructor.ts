import * as ts from "typescript";
import {getParameter, Parameter} from "./parameter";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type Constructor = {
  parameters: Parameter[]
} & Declaration<DeclarationKind.CONSTRUCTOR>


export function getConstructor(node: ts.ConstructorDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): Constructor {
  return {
    kind: DeclarationKind.CONSTRUCTOR,
    parameters: node.parameters.map(param => getParameter(param, sourceFile, parser))
  }
}
