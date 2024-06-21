import * as ts from "typescript";
import {Parameter} from "./parameter";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";
import {getModifiers, Modifiers} from "./modifiers";


export type Constructor = {
  parameters: Parameter[]
} & Declaration<DeclarationKind.CONSTRUCTOR> & Modifiers;


export function getConstructor(node: ts.ConstructorDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): Constructor {
  return {
    kind: DeclarationKind.CONSTRUCTOR,
    parameters: parser.parse(node.parameters, sourceFile),
    ...(getModifiers(node, sourceFile, parser) || {})
  }
}
