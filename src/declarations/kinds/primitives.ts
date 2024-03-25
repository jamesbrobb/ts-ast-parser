import * as ts from "typescript";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";


export type TupleDeclaration = {
  raw: string
} & Declaration<DeclarationKind.TUPLE_TYPE>


export function getTupleDeclaration(node: ts.TupleTypeNode, sourceFile: ts.SourceFile): TupleDeclaration {

  return {
    kind: DeclarationKind.TUPLE_TYPE,
    raw: node.getText(sourceFile)
  }
}
