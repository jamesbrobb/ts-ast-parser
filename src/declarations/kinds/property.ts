import * as ts from "typescript";
import {getDecoratorsAsString, getKeywordsAsString, getModifiers, Modifiers} from "./modifiers";
import {getText} from "../../utilities";
import {getType} from "./type";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type PropertyDeclaration = {
  name: string,
  optional: boolean,
  exclamation: boolean,
  signature: string,
  raw: string
  type?: string,
  initializedValue?: string,
} & Declaration<DeclarationKind.PROPERTY> & Modifiers;


export type PropertySignature = {
  name: string,
  optional: boolean,
  type?: string,
  signature: string,
  raw: string
} & Declaration<DeclarationKind.PROPERTY_SIGNATURE> & Modifiers;



export function getPropertyDeclaration(node: ts.PropertyDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): PropertyDeclaration {

  const name = getText(node.name, sourceFile),
    modifiers = getModifiers(node, sourceFile, parser) || {},
    type = node.type ? getText(node.type, sourceFile) : undefined,
    optional = !!node.questionToken,
    exclamation = !!node.exclamationToken,
    initializedValue = node.initializer ? getText(node.initializer, sourceFile) : undefined;

  return {
    kind: DeclarationKind.PROPERTY,
    name,
    type,
    optional,
    exclamation,
    initializedValue,
    signature: getSignature(name, modifiers, optional, exclamation, type, initializedValue),
    raw: node.getText(sourceFile),
    ...modifiers
  };
}


export function getPropertySignature(node: ts.PropertySignature, sourceFile: ts.SourceFile, parser: Parser<any>): PropertySignature {

    const name = getText(node.name, sourceFile),
      modifiers = getModifiers(node, sourceFile, parser) || {},
      type = node.type ? getType(node.type, sourceFile, parser) : undefined,
      optional = !!node.questionToken;

    return {
      kind: DeclarationKind.PROPERTY_SIGNATURE,
      name,
      type,
      optional,
      signature: getSignature(name, modifiers, optional, false, type),
      raw: node.getText(sourceFile),
      ...modifiers
    };
}

function getSignature(name: string, modifiers?: Modifiers, optional?: boolean, exclamation?: boolean, type?: string, initializedValue?: string): string {

  const decorators = getDecoratorsAsString(modifiers),
    keywords = getKeywordsAsString(modifiers);

  return `${decorators}${keywords}${name}${optional ? '?' : ''}${exclamation ? '!' : ''}${type ? ': ' + type : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}
