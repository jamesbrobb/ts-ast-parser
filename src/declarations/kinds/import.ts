import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type Import = {
  moduleSpecifier: string,
  importClause?: ImportClause,
  //attributes?: ts.ImportAttributes, // TODO - add declaration
  raw: string,
  children?: ImportClause[] // TODO - needed in import map factory - look at removing
} & Declaration<DeclarationKind.IMPORT> & Modifiers

export function getImportDeclaration(node: ts.ImportDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): Import {
  return {
    kind: DeclarationKind.IMPORT,
    moduleSpecifier: parser.parse(node.moduleSpecifier, sourceFile),
    ...(getModifiers(node, sourceFile, parser) || {}),
    raw: node.getText(sourceFile)
  };
}


export type ImportClause = {
  name?: string
  isTypeOnly?: boolean
  //namedBindings?: NamedImportBindings // TODO - add declaration
  raw: string
  children?: NamedImports[]
} & Declaration<DeclarationKind.IMPORT_CLAUSE>

export function getImportClause(node: ts.ImportClause, sourceFile: ts.SourceFile, parser: Parser<any>): ImportClause {
  return {
    kind: DeclarationKind.IMPORT_CLAUSE,
    name: parser.parse(node.name, sourceFile),
    isTypeOnly: node.isTypeOnly,
    raw: node.getText(sourceFile)
  }
}

export type NamedImports = {
  elements: ImportSpecifier[]
  raw: string
  children?: ImportSpecifier[]
} & Declaration<DeclarationKind.NAMED_IMPORTS>

export function getNamedImports(node: ts.NamedImports, sourceFile: ts.SourceFile, parser: Parser<any>): NamedImports {
  return {
    kind: DeclarationKind.NAMED_IMPORTS,
    elements: parser.parse(node.elements, sourceFile),
    raw: node.getText(sourceFile)
  }
}


export type ImportSpecifier = {
  name: string
  propertyName?: string,
  isTypeOnly: boolean,
  raw: string
} & Declaration<DeclarationKind.IMPORT_SPECIFIER>

export function getImportSpecifier(node: ts.ImportSpecifier, sourceFile: ts.SourceFile, parser: Parser<any>): ImportSpecifier {
  return {
    kind: DeclarationKind.IMPORT_SPECIFIER,
    name: parser.parse(node.name, sourceFile),
    propertyName: parser.parse(node.propertyName, sourceFile),
    isTypeOnly: node.isTypeOnly,
    raw: node.getText(sourceFile)
  }
}

export type NamespaceImport = {
  name: string,
  raw: string
} & Declaration<DeclarationKind.NAMESPACED_IMPORT>


export function getNamespaceImport(node: ts.NamespaceImport, sourceFile: ts.SourceFile, parser: Parser<any>): NamespaceImport {
  return {
    kind: DeclarationKind.NAMESPACED_IMPORT,
    name: parser.parse(node.name, sourceFile),
    raw: node.getText(sourceFile)
  }
}


export function isImportDeclaration(result: any): result is Import {
  return 'kind' in result && result.kind === DeclarationKind.IMPORT
}
