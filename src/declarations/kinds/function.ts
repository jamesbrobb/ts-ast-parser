import * as ts from "typescript";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {getModifiers, Modifiers} from "./modifiers";
import {Parser} from "../declaration-parser";
import {TypeParameter} from "./type";
import {Parameter} from "./parameter";


export type FunctionDeclaration = {
  name: string,
  type?: string,
  typeParameters?: TypeParameter[],
  parameters: Parameter[]
} & Declaration<DeclarationKind.FUNCTION> & Modifiers;


export function parseFunction(node: ts.FunctionDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): FunctionDeclaration {

  // TODO - add props from ts.FunctionLikeDeclarationBase and ts.SignatureDeclarationBase

  return {
    kind: DeclarationKind.FUNCTION,
    name: parser.parse(node.name, sourceFile),
    type: parser.parse(node.type, sourceFile),
    parameters: parser.parse(node.parameters, sourceFile),
    typeParameters: parser.parse(node.typeParameters, sourceFile),
    ...(getModifiers(node, sourceFile, parser) || {})
  }
}