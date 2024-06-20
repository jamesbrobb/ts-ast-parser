import * as ts from "typescript";
import {getText} from "../../utilities";
import {getModifiers, Modifiers} from "./modifiers";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type Import = {
  module: string
  raw: string
  children?: ImportClause[]
} & Declaration<DeclarationKind.IMPORT> & Modifiers

export type ImportClause = {
  name?: string
  isTypeOnly?: boolean
  raw: string
  children?: NamedImports[]
} & Declaration<DeclarationKind.IMPORT_CLAUSE>

export type NamedImports = {
  raw: string
  children?: ImportSpecifier[]
} & Declaration<DeclarationKind.NAMED_IMPORTS>

export type ImportSpecifier = {
  name: string
  propertyName?: string
  raw: string
} & Declaration<DeclarationKind.IMPORT_SPECIFIER>

export type NamespaceImport = {
  name: string,
  raw: string
} & Declaration<DeclarationKind.NAMESPACED_IMPORT>


export function isImportDeclaration(result: any): result is Import {
  return 'kind' in result && result.kind === DeclarationKind.IMPORT
}

export function getImportDeclaration(node: ts.ImportDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): Import {

  const module = getText(node.moduleSpecifier, sourceFile),
    modifiers = getModifiers(node, sourceFile, parser) || {};

  return {
    kind: DeclarationKind.IMPORT,
    module,
    raw: node.getText(sourceFile),
    ...modifiers
  };
}

export function getNamedImports(node: ts.NamedImports, sourceFile: ts.SourceFile): NamedImports {
  return {
    kind: DeclarationKind.NAMED_IMPORTS,
    raw: node.getText(sourceFile)
  }
}

export function getImportClause(node: ts.ImportClause, sourceFile: ts.SourceFile): ImportClause {

  const name = node.name ? getText(node.name, sourceFile) : undefined;

  return {
    kind: DeclarationKind.IMPORT_CLAUSE,
    name,
    isTypeOnly: node.isTypeOnly,
    raw: node.getText(sourceFile)
  }
}

export function getImportSpecifier(node: ts.ImportSpecifier, sourceFile: ts.SourceFile): ImportSpecifier {

  const name = getText(node.name, sourceFile),
    propertyName = node.propertyName ? getText(node.propertyName, sourceFile) : undefined;

  return {
    kind: DeclarationKind.IMPORT_SPECIFIER,
    name,
    propertyName,
    raw: node.getText(sourceFile)
  }
}

export function getNamespaceImport(node: ts.NamespaceImport, sourceFile: ts.SourceFile): NamespaceImport {

  const name = getText(node.name, sourceFile);

  return {
    kind: DeclarationKind.NAMESPACED_IMPORT,
    name,
    raw: node.getText(sourceFile)
  }
}
