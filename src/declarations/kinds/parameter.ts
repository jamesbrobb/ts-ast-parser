import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";

import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {getText} from "../../utilities";


export type Parameter = {
  name: string,
  optional: boolean,
  signature: string
  type?: string,
  initializedValue?: string,
  raw: string
} & Declaration<DeclarationKind.PARAMETER> & Modifiers;


export function getParameter(node: ts.ParameterDeclaration, sourceFile: ts.SourceFile): Parameter {

  const name = getText(node.name, sourceFile),
    type = node.type ? getText(node.type, sourceFile) : undefined,
    optional = !!node.questionToken,
    modifiers = getModifiers(node, sourceFile) || {},
    initializedValue = node.initializer ? getText(node.initializer, sourceFile) : undefined;

  return {
    kind: DeclarationKind.PARAMETER,
    name,
    type,
    optional,
    initializedValue,
    signature: getParameterSignature(name, type, optional, initializedValue),
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
