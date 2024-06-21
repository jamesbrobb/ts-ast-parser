import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


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


export function getEnumDeclaration(node: ts.EnumDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): EnumDeclaration {

  return {
    kind: DeclarationKind.ENUM,
    name: parser.parse(node.name, sourceFile),
    ...(getModifiers(node, sourceFile, parser) || {}),
    members: parser.parse(node.members, sourceFile),
    raw: node.getText(sourceFile)
  };
}


export function getEnumMemberDeclaration(node: ts.EnumMember, sourceFile: ts.SourceFile, parser: Parser<any>): EnumMemberDeclaration {
    return {
      kind: DeclarationKind.ENUM_MEMBER,
      name: parser.parse(node.name, sourceFile),
      initializer: parser.parse(node.initializer, sourceFile),
      raw: node.getText(sourceFile)
    };
}
