import * as ts from "typescript";

import {defaultDeclarationFunctionMap} from "./default-function-map";


export type NoParseFunctionReturnType = {
  raw: string,
  kind: ts.SyntaxKind,
  type: string
}


export function parseDeclaration<N extends ts.Node>(
  node: N,
  sourceFile: ts.SourceFile,
  debug?: boolean
): unknown | NoParseFunctionReturnType { // GetDeclarationTypeForSyntaxKind<N['kind']>

  const parseFunc = defaultDeclarationFunctionMap[node.kind];

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
