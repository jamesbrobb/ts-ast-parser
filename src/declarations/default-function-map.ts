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


export const defaultDeclarationFunctionMap: DeclarationParseFunctionMap = {
  [ts.SyntaxKind.ImportDeclaration]: getImportDeclaration,
  [ts.SyntaxKind.ImportClause]: getImportClause,
  [ts.SyntaxKind.NamedImports]: getNamedImports,
  [ts.SyntaxKind.ImportSpecifier]: getImportSpecifier,
  [ts.SyntaxKind.NamespaceImport]: getNamespaceImport,
  [ts.SyntaxKind.ClassDeclaration]: getClassDeclaration,
  [ts.SyntaxKind.InterfaceDeclaration]: getInterfaceDeclaration,
  [ts.SyntaxKind.Decorator]: getDecorator,
  [ts.SyntaxKind.TypeParameter]: getTypeParameterDeclaration,
  [ts.SyntaxKind.TypeReference]: getTypeReference,
  [ts.SyntaxKind.ExpressionWithTypeArguments]: getExpressionWithTypeArguments,
  [ts.SyntaxKind.TypeAliasDeclaration]: getTypeAliasDeclaration,
  [ts.SyntaxKind.TypeLiteral]: getTypeLiteral,
  [ts.SyntaxKind.HeritageClause]: getHeritageClause,
  [ts.SyntaxKind.Constructor]: getConstructor,
  [ts.SyntaxKind.PropertyDeclaration]: getPropertyDeclaration,
  [ts.SyntaxKind.PropertySignature]: getPropertySignature,
  [ts.SyntaxKind.MethodDeclaration]: getMethodDeclaration,
  [ts.SyntaxKind.GetAccessor]: getGetAccessorDeclaration,
  [ts.SyntaxKind.SetAccessor]: getSetAccessorDeclaration,
  [ts.SyntaxKind.TupleType]: getTupleDeclaration,
  [ts.SyntaxKind.EnumDeclaration]: getEnumDeclaration,
  [ts.SyntaxKind.EnumMember]: getEnumMemberDeclaration,
  [ts.SyntaxKind.VariableDeclaration]: getVariableDeclaration,
  [ts.SyntaxKind.Identifier]: getText,
  [ts.SyntaxKind.StringLiteral]: getText,
  [ts.SyntaxKind.Parameter]: getParameter
}
