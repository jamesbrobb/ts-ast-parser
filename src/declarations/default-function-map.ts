import * as ts from "typescript";

import {DeclarationParseFunctionMap} from "./declaration-types";
import {
  getClassDeclaration, getConstructor, getDecorator, getEnumDeclaration, getEnumMemberDeclaration,
  getExpressionWithTypeArguments, getGetAccessorDeclaration, getHeritageClause, getImportClause,
  getImportDeclaration, getImportSpecifier, getInterfaceDeclaration, getMethodDeclaration,
  getNamedImports, getNamespaceImport, getParameter, getPropertyDeclaration, getPropertySignature,
  getSetAccessorDeclaration, getTupleDeclaration, getTypeAliasDeclaration, getTypeLiteral,
  getTypeParameterDeclaration, getTypeReference, getVariableDeclaration
} from "./kinds";
import {getText} from "../utilities";
import {ignoreChildren} from "./helpers";
import {SyntaxKindToDeclarationTypeMap} from "./declaration-type-map";


export const defaultDeclarationFunctionMap: DeclarationParseFunctionMap<SyntaxKindToDeclarationTypeMap> = {
  [ts.SyntaxKind.ImportDeclaration]: getImportDeclaration,
  [ts.SyntaxKind.ImportClause]: getImportClause,
  [ts.SyntaxKind.NamedImports]: getNamedImports,
  [ts.SyntaxKind.ImportSpecifier]: ignoreChildren(getImportSpecifier),
  [ts.SyntaxKind.NamespaceImport]: getNamespaceImport,
  [ts.SyntaxKind.ClassDeclaration]: getClassDeclaration,
  [ts.SyntaxKind.InterfaceDeclaration]: getInterfaceDeclaration,
  [ts.SyntaxKind.Decorator]: ignoreChildren(getDecorator),
  [ts.SyntaxKind.TypeParameter]: getTypeParameterDeclaration,
  [ts.SyntaxKind.TypeReference]: ignoreChildren(getTypeReference),
  [ts.SyntaxKind.ExpressionWithTypeArguments]: getExpressionWithTypeArguments,
  [ts.SyntaxKind.TypeAliasDeclaration]: ignoreChildren(getTypeAliasDeclaration),
  [ts.SyntaxKind.TypeLiteral]: getTypeLiteral,
  [ts.SyntaxKind.HeritageClause]: ignoreChildren(getHeritageClause),
  [ts.SyntaxKind.Constructor]: ignoreChildren(getConstructor),
  [ts.SyntaxKind.PropertyDeclaration]: getPropertyDeclaration,
  [ts.SyntaxKind.PropertySignature]: ignoreChildren(getPropertySignature),
  [ts.SyntaxKind.MethodDeclaration]: ignoreChildren(getMethodDeclaration),
  [ts.SyntaxKind.GetAccessor]: getGetAccessorDeclaration,
  [ts.SyntaxKind.SetAccessor]: getSetAccessorDeclaration,
  [ts.SyntaxKind.TupleType]: getTupleDeclaration,
  [ts.SyntaxKind.EnumDeclaration]: ignoreChildren(getEnumDeclaration),
  [ts.SyntaxKind.EnumMember]: getEnumMemberDeclaration,
  [ts.SyntaxKind.VariableDeclaration]: ignoreChildren(getVariableDeclaration),
  [ts.SyntaxKind.Identifier]: getText,
  [ts.SyntaxKind.StringLiteral]: getText,
  [ts.SyntaxKind.Parameter]: getParameter
}
