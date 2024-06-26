import * as ts from "typescript";
import {
  GetDeclarationTypeForSyntaxKind,
  NoParseFunctionReturnType,
  SyntaxKindToTypeMap,
  SyntaxKindToDeclarationTypeMap,
  Parser
} from "../declarations";


export type ParsedNodeResult<R> = {result: R, exit: boolean};

export function isParsedNodeResult<R>(result: any): result is ParsedNodeResult<R> {
  return typeof result === 'object' && 'result' in result && 'exit' in result;
}

export type ParseNodeOptions<M extends SyntaxKindToTypeMap<unknown>> = {
  parser: Parser<M>
  returnArray?: boolean,
  lazy?: boolean,
  debug?: boolean
}


export function walkNodeTree<
  N extends ts.Node,
  M extends SyntaxKindToTypeMap<unknown> = SyntaxKindToDeclarationTypeMap,
  R = GetDeclarationTypeForSyntaxKind<N['kind'], M> | NoParseFunctionReturnType,
>(node: N, sourceFile: ts.SourceFile, options: ParseNodeOptions<M>): any[] | Record<PropertyKey, unknown> {

  const children: any[] = [];

  let parsed: R | (() => R),
    exit = false;

  if(options.lazy) {

    parsed = (() => {

      let parsedNode: R;

      return () => {

        if(!parsedNode) {

          const res = options.parser.parse(node, sourceFile, options.debug);

          parsedNode = (isParsedNodeResult<R>(res) ? res.result : res) as any;
        }

        return parsedNode;
      }
    })();

  } else {

    const res = options.parser.parse(node, sourceFile, options.debug);

    if(isParsedNodeResult<R>(res)) {
      parsed = res.result;
      exit = res.exit;
    } else {
      parsed = res as any;
    }
  }

  if(!exit && node.getChildCount(sourceFile) >= 0) {
    node.forEachChild(childNode => {
      children.push(walkNodeTree(childNode, sourceFile, options));
    });
  }

  if(options.returnArray) {
    return children.length ? [parsed, children] : [parsed];
  }

  if(children.length) {
    (parsed as any)['children'] = children;
  }

  return parsed as any;
}
