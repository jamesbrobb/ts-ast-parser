import * as ts from "typescript";
import {
    ClassDeclaration,
    Constructor,
    Decorator,
    EnumDeclaration,
    EnumMemberDeclaration,
    ExpressionWithTypeArguments,
    GetAccessor,
    HeritageClause,
    Import,
    ImportClause,
    ImportSpecifier,
    Interface,
    Method,
    NamedImports,
    NamespaceImport,
    Parameter,
    PropertyDeclaration,
    PropertySignature,
    SetAccessor,
    TupleDeclaration,
    TypeAliasDeclaration,
    TypeLiteral,
    TypeParameter,
    TypeReference,
    VariableDeclaration
} from "./kinds";
import {CallExpressionDeclaration} from "./kinds/call-expression";
import {FunctionDeclaration} from "./kinds/function";


export type SyntaxKindToDeclarationTypeMap = {
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
    [ts.SyntaxKind.ObjectLiteralExpression]: Record<string, any>
    [ts.SyntaxKind.TrueKeyword]: boolean
    [ts.SyntaxKind.FalseKeyword]: boolean
    [ts.SyntaxKind.BooleanKeyword]: boolean
    [ts.SyntaxKind.NumberKeyword]: number
    [ts.SyntaxKind.ArrayLiteralExpression]: any[]
    [ts.SyntaxKind.Parameter]: Parameter,
    [ts.SyntaxKind.CallExpression]: CallExpressionDeclaration,
    [ts.SyntaxKind.FunctionDeclaration]: FunctionDeclaration
}
