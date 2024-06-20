import * as ts from "typescript";

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


export class Parser<M extends SyntaxKindToTypeMap<unknown>> {

  readonly #map: DeclarationParseFunctionMap<M>;

  constructor(map: DeclarationParseFunctionMap<M>) {
    this.#map = map;
  }

  parse<N extends ts.Node>(
    node: N,
    sourceFile: ts.SourceFile,
    debug?: boolean
  ): GetDeclarationTypeForSyntaxKind<N['kind'], M> | NoParseFunctionReturnType {

    const parseFunc: GetDeclarationFn<N['kind'], M> | undefined = this.#map[node.kind];

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

    return parseFunc(node as any, sourceFile, this);
  }
}
