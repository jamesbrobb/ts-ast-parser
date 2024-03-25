import * as ts from "typescript";
import {getParameter, getParametersAsString, Parameter} from "./parameter";
import {getDecoratorsAsString, getKeywordsAsString, getModifiers, isPublic, Modifiers} from "./modifiers";
import {getText} from "../../utilities";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";



export type Method = {
  name: string,
  signature: string,
  parameters: Parameter[],
  type?: string
} & Declaration<DeclarationKind.METHOD> & Modifiers;


export function getMethodDeclaration(node: ts.MethodDeclaration, sourceFile: ts.SourceFile): Method {

  const name = getText(node.name, sourceFile),
    type = node.type ? getText(node.type, sourceFile) : undefined,
    parameters = node.parameters.map(param => getParameter(param, sourceFile)),
    modifiers = getModifiers(node, sourceFile) || {};

  return {
    kind: DeclarationKind.METHOD,
    name,
    type,
    parameters,
    signature: getMethodSignature(name, parameters, modifiers, type),
    ...modifiers
  };
}


export function getPublicMethodSignatures(methods: Method[]): string[] {
  return methods
    .filter(mthd => isPublic(mthd.name, mthd))
    .map(mthd => mthd.signature);
}


function getMethodSignature(name: string, parameters: Parameter[], modifiers?: Modifiers, type: string = 'void'): string {

  const params = getParametersAsString(parameters),
    decorators = getDecoratorsAsString(modifiers),
    keywords = getKeywordsAsString(modifiers);

  return `${decorators}${keywords}${name}(${params}): ${type === 'void' && keywords.includes('async') ? 'Promise<void>' : type}`;
}
