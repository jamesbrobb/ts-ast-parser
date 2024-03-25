import * as ts from 'typescript';
import {DeclarationKind} from "./declaration-kind";
import {
  ClassDeclaration, Constructor, Decorator, EnumDeclaration, EnumMemberDeclaration, ExpressionWithTypeArguments,
  GetAccessor, HeritageClause, Import, ImportClause, ImportSpecifier, Interface, Method, NamedImports,
  NamespaceImport, Parameter, PropertyDeclaration, PropertySignature, SetAccessor, TupleDeclaration,
  TypeAliasDeclaration, TypeLiteral, TypeParameter, TypeReference, VariableDeclaration
} from "./kinds";


type SyntaxKindToTSNodeTypeMap = {
  [ts.SyntaxKind.ImportDeclaration]: ts.ImportDeclaration
  [ts.SyntaxKind.ImportClause]: ts.ImportClause
  [ts.SyntaxKind.NamespaceImport]: ts.NamespaceImport
  [ts.SyntaxKind.NamedImports]: ts.NamedImports
  [ts.SyntaxKind.ImportSpecifier]: ts.ImportSpecifier
  [ts.SyntaxKind.ClassDeclaration]: ts.ClassDeclaration
  [ts.SyntaxKind.InterfaceDeclaration]: ts.InterfaceDeclaration
  [ts.SyntaxKind.Decorator]: ts.Decorator
  [ts.SyntaxKind.TypeParameter]: ts.TypeParameterDeclaration
  [ts.SyntaxKind.TypeReference]: ts.TypeReferenceNode
  [ts.SyntaxKind.ExpressionWithTypeArguments]: ts.ExpressionWithTypeArguments
  [ts.SyntaxKind.TypeAliasDeclaration]: ts.TypeAliasDeclaration
  [ts.SyntaxKind.TypeLiteral]: ts.TypeLiteralNode
  [ts.SyntaxKind.HeritageClause]: ts.HeritageClause
  [ts.SyntaxKind.Constructor]: ts.ConstructorDeclaration
  [ts.SyntaxKind.PropertyDeclaration]: ts.PropertyDeclaration
  [ts.SyntaxKind.PropertySignature]: ts.PropertySignature
  [ts.SyntaxKind.MethodDeclaration]: ts.MethodDeclaration
  [ts.SyntaxKind.GetAccessor]: ts.GetAccessorDeclaration
  [ts.SyntaxKind.SetAccessor]: ts.SetAccessorDeclaration
  [ts.SyntaxKind.TupleType]: ts.TupleTypeNode
  [ts.SyntaxKind.EnumDeclaration]: ts.EnumDeclaration
  [ts.SyntaxKind.EnumMember]: ts.EnumMember
  [ts.SyntaxKind.VariableDeclaration]: ts.VariableDeclaration
  [ts.SyntaxKind.Identifier]: ts.Identifier
  [ts.SyntaxKind.StringLiteral]: ts.StringLiteral
  [ts.SyntaxKind.Parameter]: ts.ParameterDeclaration
}

type SyntaxKindToDeclarationTypeMap = {
  [ts.SyntaxKind.ImportDeclaration]: Import
  [ts.SyntaxKind.ImportClause]: ImportClause
  [ts.SyntaxKind.NamespaceImport]: NamespaceImport
  [ts.SyntaxKind.NamedImports]: NamedImports
  [ts.SyntaxKind.ImportSpecifier]: ImportSpecifier
  [ts.SyntaxKind.ClassDeclaration]: ClassDeclaration
  [ts.SyntaxKind.InterfaceDeclaration]: Interface
  [ts.SyntaxKind.Decorator]: Decorator
  [ts.SyntaxKind.TypeParameter]: TypeParameter
  [ts.SyntaxKind.TypeReference]: TypeReference
  [ts.SyntaxKind.ExpressionWithTypeArguments]: ExpressionWithTypeArguments
  [ts.SyntaxKind.TypeAliasDeclaration]: TypeAliasDeclaration
  [ts.SyntaxKind.TypeLiteral]: TypeLiteral
  [ts.SyntaxKind.HeritageClause]: HeritageClause
  [ts.SyntaxKind.Constructor]: Constructor
  [ts.SyntaxKind.PropertyDeclaration]: PropertyDeclaration
  [ts.SyntaxKind.PropertySignature]: PropertySignature
  [ts.SyntaxKind.MethodDeclaration]: Method
  [ts.SyntaxKind.GetAccessor]: GetAccessor
  [ts.SyntaxKind.SetAccessor]: SetAccessor
  [ts.SyntaxKind.TupleType]: TupleDeclaration
  [ts.SyntaxKind.EnumDeclaration]: EnumDeclaration
  [ts.SyntaxKind.EnumMember]: EnumMemberDeclaration
  [ts.SyntaxKind.VariableDeclaration]: VariableDeclaration
  [ts.SyntaxKind.Identifier]: string
  [ts.SyntaxKind.StringLiteral]: string,
  [ts.SyntaxKind.Parameter]: Parameter
}

type SyntaxKinds = `${ts.SyntaxKind}` extends `${infer T extends number}` ? T : never;

////////////////////////////////////////////////////////////////////////////////////////

export type Declaration<K extends DeclarationKind> = {
  kind: K
}

export type SyntaxKindToTypeMap<V> = {[key in SyntaxKinds]?: V}
export type GetTypeForSyntaxKind<K extends SyntaxKinds, M extends SyntaxKindToTypeMap<unknown>> = M[K]
export type GetTSNodeTypeForSyntaxKind<K extends SyntaxKinds> = GetTypeForSyntaxKind<K, SyntaxKindToTSNodeTypeMap>
export type GetDeclarationTypeForSyntaxKind<K extends SyntaxKinds> = GetTypeForSyntaxKind<K, SyntaxKindToDeclarationTypeMap>

export type GetDeclarationFn<K extends SyntaxKinds> =
  (node: GetTSNodeTypeForSyntaxKind<K>, sourceFile: ts.SourceFile) => GetDeclarationTypeForSyntaxKind<K>

export type DeclarationParseFunctionMap = {[key in SyntaxKinds]?: GetDeclarationFn<key>}
