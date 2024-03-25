import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {getParameter, Parameter} from "./parameter";
import {getText} from "../../utilities";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";


export type SetAccessor = {
  name: string,
  type?: string,
  parameters: Parameter[]
} & Declaration<DeclarationKind.SETTER> & Modifiers;


export function getSetAccessorDeclaration(node: ts.SetAccessorDeclaration, sourceFile: ts.SourceFile): SetAccessor {

  const modifiers = getModifiers(node, sourceFile) || {};

  return {
    kind: DeclarationKind.SETTER,
    name: getText(node.name, sourceFile),
    type: node.type ? getText(node.type, sourceFile) : undefined,
    parameters: node.parameters.map(param => getParameter(param, sourceFile)),
    ...modifiers
  };
}
