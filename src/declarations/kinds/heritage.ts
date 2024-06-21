import * as ts from "typescript";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type HeritageClause = {
  token: 'extends' | 'implements',
  types: string[]
} & Declaration<DeclarationKind.HERITAGE>


export function getHeritageClause(node: ts.HeritageClause, sourceFile: ts.SourceFile, parser: Parser<any>): HeritageClause {
  return {
    kind: DeclarationKind.HERITAGE,
    token: node.token === ts.SyntaxKind.ExtendsKeyword ? 'extends' : 'implements',
    types: parser.parse(node.types, sourceFile)
  }
}

export function getHeritageClausesByType(type: 'extends' | 'implements', clauses: HeritageClause[]): string[][] {

  return clauses.filter(clause => clause.token === type)
    .map(clause => clause.types);
}
