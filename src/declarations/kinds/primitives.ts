import * as ts from "typescript";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";
import {stripQuotes} from "../../utilities";


export type TupleDeclaration = {
  raw: string
} & Declaration<DeclarationKind.TUPLE_TYPE>


export function getTupleDeclaration(node: ts.TupleTypeNode, sourceFile: ts.SourceFile): TupleDeclaration {

  return {
    kind: DeclarationKind.TUPLE_TYPE,
    raw: node.getText(sourceFile)
  }
}


export function parseObjectLiteral(node: ts.ObjectLiteralExpression, sourceFile: ts.SourceFile, parser: Parser<any>): Record<string, any> {

  const res: Record<string, any> = {};

  node.forEachChild((child: ts.Node) => {

    if (!ts.isPropertyAssignment(child)) {
      throw new Error(`Child is not a property assignment - ${child}`);
    }

    if (!child.name || !ts.isIdentifier(child.name)) {
      throw new Error(`Property name is not an identifier - ${child}`);
    }

    res[child.name.getText(sourceFile)] = parser.parse(child.initializer, sourceFile);
  });

  return res;
}

export function parseArrayLiteral(node: ts.ArrayLiteralExpression, sourceFile: ts.SourceFile, parser: Parser<any>): any[] {
    return node.elements.map((element) => parser.parse(element, sourceFile));
}

export function parseBoolean(node: ts.BooleanLiteral, sourceFile: ts.SourceFile): boolean {
  return node.getText(sourceFile) === 'true';
}

export function parseString(node: ts.Node, sourceFile: ts.SourceFile): string {
  return stripQuotes(ts.isStringLiteral(node) ? node.text : node.getText(sourceFile));
}