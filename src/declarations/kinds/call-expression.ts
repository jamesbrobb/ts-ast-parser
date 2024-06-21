import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import * as ts from "typescript";
import {Parser} from "../declaration-parser";


export type CallExpressionDeclaration = {
  expression: string,
  questionDotToken?: string,
  typeArguments?: string,
  arguments: string,
} & Declaration<DeclarationKind.CALL_EXPRESSION>


export function parseCallExpression(node: ts.CallExpression, sourceFile: ts.SourceFile, parser: Parser<any>): CallExpressionDeclaration {

  return {
    kind: DeclarationKind.CALL_EXPRESSION,
    expression: parser.parse(node.expression, sourceFile),
    questionDotToken: parser.parse(node.questionDotToken, sourceFile),
    typeArguments: parser.parse(node.typeArguments, sourceFile),
    arguments: parser.parse(node.arguments, sourceFile)
  };
}