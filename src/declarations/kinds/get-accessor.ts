import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {getText} from "../../utilities";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";


export type GetAccessor = {
  name: string,
  type?: string
} & Declaration<DeclarationKind.GETTER> & Modifiers;


export function getGetAccessorDeclaration(node: ts.GetAccessorDeclaration, sourceFile: ts.SourceFile): GetAccessor {

  const modifiers = getModifiers(node, sourceFile) || {};

  return {
    kind: DeclarationKind.GETTER,
    name: getText(node.name, sourceFile),
    type: node.type ? getText(node.type, sourceFile) : undefined,
    ...modifiers
  };
}
