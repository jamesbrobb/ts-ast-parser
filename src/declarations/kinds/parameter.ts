import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";

import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type Parameter = {
  name: string,
  optional: boolean,
  signature: string
  type?: string,
  initializer?: string,
  //dotDotDotToken?: DotDotDotToken // TODO
  raw: string
} & Declaration<DeclarationKind.PARAMETER> & Modifiers;


export function parseParameter(node: ts.ParameterDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): Parameter {

  const name = parser.parse(node.name, sourceFile),
    type = parser.parse(node.type, sourceFile),
    optional = !!node.questionToken,
    modifiers = getModifiers(node, sourceFile, parser) || {},
    initializer = parser.parse(node.initializer, sourceFile);

  return {
    kind: DeclarationKind.PARAMETER,
    name,
    type,
    optional,
    initializer,
    signature: getParameterSignature(name, type, optional, initializer),
    raw: node.getText(sourceFile),
    ...modifiers
  }
}

export function getParametersAsString(parameters: Parameter[], seperator = ', '): string {
  return parameters.map(param => param.signature).join(seperator);
}

function getParameterSignature(name: string, type?: string, optional?: boolean, initializedValue?: string): string {
  return `${name}${optional ? '?' : ''}${type ? ': ' + type : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}
