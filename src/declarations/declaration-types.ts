import * as ts from 'typescript';
import {DeclarationKind} from "./declaration-kind";
import {ParsedNodeResult} from "../utilities";
import {SyntaxKinds, SyntaxKindToTSNodeTypeMap} from "./ts/syntax-kinds";


export type Declaration<K extends DeclarationKind> = {
  kind: K
}

export type SyntaxKindToTypeMap<V> = {[key in SyntaxKinds]?: V}
export type GetTypeForSyntaxKind<K extends SyntaxKinds, M extends SyntaxKindToTypeMap<unknown>> = M[K]
export type GetTSNodeTypeForSyntaxKind<K extends SyntaxKinds> = GetTypeForSyntaxKind<K, SyntaxKindToTSNodeTypeMap>

export type GetDeclarationTypeForSyntaxKind<
    K extends SyntaxKinds,
    M extends SyntaxKindToTypeMap<unknown>
> = GetTypeForSyntaxKind<K, M>

export type GetDeclarationFn<
    K extends SyntaxKinds,
    M extends SyntaxKindToTypeMap<unknown>,
    R = GetDeclarationTypeForSyntaxKind<K, M>
> = (node: GetTSNodeTypeForSyntaxKind<K>, sourceFile: ts.SourceFile) => R | ParsedNodeResult<R>

export type DeclarationParseFunctionMap<
    M extends SyntaxKindToTypeMap<unknown>
> = {[key in SyntaxKinds]?: GetDeclarationFn<key, M>}
