import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";
import {TypeParameter} from "./type";
import {HeritageClause} from "./heritage";
import {ClassElement} from "typescript";


export type Interface = {
  name: string,
  typeParameters?: TypeParameter[],
  heritage?: HeritageClause[],
  members: ClassElement[]
} & Declaration<DeclarationKind.INTERFACE> & Modifiers;


export function getInterfaceDeclaration(node: ts.InterfaceDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): Interface {
  return {
    kind: DeclarationKind.INTERFACE,
    name: parser.parse(node.name, sourceFile),
    typeParameters: parser.parse(node.typeParameters, sourceFile),
    heritage: parser.parse(node.heritageClauses, sourceFile),
    ...(getModifiers(node, sourceFile, parser) || {}),
    members: parser.parse(node.members, sourceFile)
  }
}
