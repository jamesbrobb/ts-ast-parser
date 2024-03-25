import * as ts from "typescript";

export function getText(node: ts.Node, sourceFile: ts.SourceFile): string {
  const text = ts.isStringLiteral(node) ? node.text : node.getText(sourceFile)
  return text.replace(/['|"]/g, '');
}

export function stripQuotes(text: string): string {
  return text.replace(/['|"]/g, '');
}
