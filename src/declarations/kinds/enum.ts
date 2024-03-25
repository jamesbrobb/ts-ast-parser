import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {getText} from "../../utilities";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";


export type EnumDeclaration = {
  name: string,
  members: EnumMemberDeclaration[],
  raw: string
} & Declaration<DeclarationKind.ENUM> & Modifiers;


export type EnumMemberDeclaration = {
  name: string,
  initializer?: string,
  raw: string
} & Declaration<DeclarationKind.ENUM_MEMBER>


export function getEnumDeclaration(node: ts.EnumDeclaration, sourceFile: ts.SourceFile): EnumDeclaration {

  const name = getText(node.name, sourceFile),
    modifiers = getModifiers(node, sourceFile) || {},
    members = node.members.map(member => getEnumMemberDeclaration(member, sourceFile));

  return {
    kind: DeclarationKind.ENUM,
    name,
    members,
    raw: node.getText(sourceFile),
    ...modifiers
  };
}


export function getEnumMemberDeclaration(node: ts.EnumMember, sourceFile: ts.SourceFile): EnumMemberDeclaration {

    const name = getText(node.name, sourceFile),
      initializer = node.initializer ? getText(node.initializer, sourceFile) : undefined;

    return {
      kind: DeclarationKind.ENUM_MEMBER,
      name,
      initializer,
      raw: node.getText(sourceFile)
    };
}
