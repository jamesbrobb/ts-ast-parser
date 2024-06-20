import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {getText} from "../../utilities";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type Interface = {
  name: string,
  isExported?: boolean,
} & Declaration<DeclarationKind.INTERFACE> & Modifiers;


export function getInterfaceDeclaration(node: ts.InterfaceDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): Interface {

  const modifiers = getModifiers(node, sourceFile, parser) || {};

  return {
    kind: DeclarationKind.INTERFACE,
    name: getText(node.name, sourceFile),
    ...modifiers
  }
}
