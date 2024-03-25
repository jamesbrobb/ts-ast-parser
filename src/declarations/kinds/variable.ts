import * as ts from "typescript";
import {getText} from "../../utilities";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";


export type VariableDeclaration = {
  name: string,
  type?: string,
  exclamationToken?: string,
  initializer?: string,
  raw: string
} & Declaration<DeclarationKind.VARIABLE>

export function getVariableDeclaration(node: ts.VariableDeclaration, sourceFile: ts.SourceFile): VariableDeclaration {

  const name = getText(node.name, sourceFile),
    type = node.type ? getText(node.type, sourceFile) : undefined,
    exclamationToken = node.exclamationToken ? getText(node.exclamationToken, sourceFile) : undefined,
    initializer = node.initializer ? getText(node.initializer, sourceFile) : undefined;

  return {
    kind: DeclarationKind.VARIABLE,
    name,
    type,
    exclamationToken,
    initializer,
    raw: node.getText(sourceFile)
  };
}
