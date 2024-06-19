import * as ts from "typescript";

//import {defaultDeclarationFunctionMap} from "./default-function-map";
import {
  DeclarationParseFunctionMap,
  GetDeclarationFn,
  GetDeclarationTypeForSyntaxKind,
  SyntaxKindToTypeMap
} from "./declaration-types";


export type NoParseFunctionReturnType = {
  raw: string,
  kind: ts.SyntaxKind,
  type: string
}


export function parseDeclaration<N extends ts.Node, M extends SyntaxKindToTypeMap<unknown>>(
  node: N,
  sourceFile: ts.SourceFile,
  declarationParseFunctionMap: DeclarationParseFunctionMap<M>,
  debug?: boolean
): GetDeclarationTypeForSyntaxKind<N['kind'], M> | NoParseFunctionReturnType {

  const parseFunc: GetDeclarationFn<N['kind'], M> | undefined = declarationParseFunctionMap[node.kind];

  if(!parseFunc) {
    if(debug) {
      console.warn(`No parse function registered for ${ts.SyntaxKind[node.kind]} - kind: ${node.kind}`);
    }

    return {
      raw: node.getText(sourceFile),
      kind: node.kind,
      type: ts.SyntaxKind[node.kind]
    }
  }
  // TODO need to fix narrowing issues and remove any
  return parseFunc(node as any, sourceFile);
}
