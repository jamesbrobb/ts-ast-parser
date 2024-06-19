import * as ts from "typescript";


type EnumToMappedType<E> = {
    [K in (keyof E) as E[K] & PropertyKey]: K
}

type KindMap<M> = {
    [K in keyof M]?: {kind: M[K]}
}

export type SyntaxKinds = `${ts.SyntaxKind}` extends `${infer T extends number}` ? T : never;
export type SyntaxKindKeys = keyof typeof ts.SyntaxKind;

export type SyntaxKindMappedType = KindMap<EnumToMappedType<typeof ts.SyntaxKind>>;

/*
const a: SyntaxKindMappedType = {
    0: {kind: 'Unknown'},
}
*/


export type SyntaxKindToTSNodeTypeMap = {
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