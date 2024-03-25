import * as ts from "typescript";


export type ParsedNodeResult<R> = {result: R, exit: boolean};

export function isParsedNodeResult<R>(result: any): result is ParsedNodeResult<R> {
  return typeof result === 'object' && 'result' in result && 'exit' in result;
}

export type ParseNodeFunc<R> = (node: ts.Node, sourceFile: ts.SourceFile, debug?: boolean) => R | ParsedNodeResult<R>;

export type ParseNodeOptions<R> = {
  nodeParseFn?: ParseNodeFunc<R>,
  returnArray?: boolean,
  lazy?: boolean,
  debug?: boolean
}


export function walkNodeTree<R = ts.Node>(node: ts.Node, sourceFile: ts.SourceFile, options?: ParseNodeOptions<R>): any[] | Record<PropertyKey, unknown> {

  const parseFn: ParseNodeFunc<R> = options?.nodeParseFn || ((node: ts.Node): R => node as R),
    children: any[] = [];

  let parsed: R | (() => R),
    exit = false;

  if(options?.lazy) {

    parsed = (() => {

      let parsedNode: R;

      return () => {

        if(!parsedNode) {

          const res = parseFn(node, sourceFile, options?.debug);

          parsedNode = isParsedNodeResult<R>(res) ? res.result : res;
        }

        return parsedNode;
      }
    })();

  } else {

    const res = parseFn(node, sourceFile, options?.debug);

    if(isParsedNodeResult<R>(res)) {
      parsed = res.result;
      exit = res.exit;
    } else {
      parsed = res;
    }
  }

  if(!exit && node.getChildCount(sourceFile) >= 0) {
    node.forEachChild(childNode => {
      children.push(walkNodeTree(childNode, sourceFile, options));
    });
  }

  if(options?.returnArray) {
    return children.length ? [parsed, children] : [parsed];
  }

  if(children.length) {
    (parsed as any)['children'] = children;
  }

  return parsed as any;
}
