import * as ts from "typescript";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";


export type HeritageClause = {
  keyword: 'extends' | 'implements',
  types: string[]
} & Declaration<DeclarationKind.HERITAGE>


export function getHeritageClause(node: ts.HeritageClause, sourceFile: ts.SourceFile): HeritageClause {

  const hClause: HeritageClause = {
    kind: DeclarationKind.HERITAGE,
    keyword: 'extends',
    types: []
  };

  node.getChildren(sourceFile)
    .forEach(node => {

      switch (node.kind) {
        case ts.SyntaxKind.ExtendsKeyword:
          hClause.keyword = 'extends';
          break
        case ts.SyntaxKind.ImplementsKeyword:
          hClause.keyword = 'implements';
          break;
      }

      if(node.kind === ts.SyntaxKind.SyntaxList) {
        node.getChildren(sourceFile)
          .forEach(node => {

            if(node.kind === ts.SyntaxKind.ExpressionWithTypeArguments) {
              hClause.types.push(node.getText(sourceFile));
            }
          });
      }
    });

  return hClause;
}

export function getHeritageClausesByType(type: 'extends' | 'implements', clauses: HeritageClause[]): string[][] {

  return clauses.filter(clause => clause.keyword === type)
    .map(clause => clause.types);
}
