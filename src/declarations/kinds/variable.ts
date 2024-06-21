import * as ts from "typescript";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type VariableDeclaration = {
  name: string,
  type?: string,
  exclamationToken?: string,
  initializer?: string,
  raw: string
} & Declaration<DeclarationKind.VARIABLE>


export function getVariableDeclaration(node: ts.VariableDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): VariableDeclaration {
  return {
    kind: DeclarationKind.VARIABLE,
    name: parser.parse(node.name, sourceFile),
    type: parser.parse(node.type, sourceFile),
    exclamationToken: parser.parse(node.exclamationToken, sourceFile),
    initializer: parser.parse(node.initializer, sourceFile),
    raw: node.getText(sourceFile)
  };
}
