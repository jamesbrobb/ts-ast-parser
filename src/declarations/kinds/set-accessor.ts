import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {Parameter} from "./parameter";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type SetAccessor = {
  name: string,
  type?: string,
  parameters: Parameter[]
} & Declaration<DeclarationKind.SETTER> & Modifiers;


export function getSetAccessorDeclaration(node: ts.SetAccessorDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): SetAccessor {

  // TODO - add props from ts.FunctionLikeDeclarationBase and ts.SignatureDeclarationBase

  return {
    kind: DeclarationKind.SETTER,
    name: parser.parse(node.name, sourceFile),
    type: parser.parse(node.type, sourceFile),
    parameters: parser.parse(node.parameters, sourceFile),
    ...(getModifiers(node, sourceFile, parser) || {})
  };
}
