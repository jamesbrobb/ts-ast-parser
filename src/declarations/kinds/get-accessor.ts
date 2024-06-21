import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type GetAccessor = {
  name: string,
  type?: string
} & Declaration<DeclarationKind.GETTER> & Modifiers;


export function getGetAccessorDeclaration(node: ts.GetAccessorDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): GetAccessor {
  // TODO - add props from ts.FunctionLikeDeclarationBase and ts.SignatureDeclarationBase
  return {
    kind: DeclarationKind.GETTER,
    name: parser.parse(node.name, sourceFile),
    type: parser.parse(node.type, sourceFile),
    ...(getModifiers(node, sourceFile, parser) || {})
  };
}
