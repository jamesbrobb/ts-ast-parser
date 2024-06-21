import * as ts from "typescript";
import {getParametersAsString, Parameter} from "./parameter";
import {getDecoratorsAsString, getKeywordsAsString, getModifiers, isPublic, Modifiers} from "./modifiers";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";
import {TypeParameter} from "./type";



export type Method = {
  name: string,
  signature: string,
  parameters: Parameter[],
  type?: string,
  typeParameters?: TypeParameter[]
} & Declaration<DeclarationKind.METHOD> & Modifiers;


export function getMethodDeclaration(node: ts.MethodDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): Method {

  const name = parser.parse(node.name, sourceFile),
    type = parser.parse(node.type, sourceFile),
    parameters = parser.parse(node.parameters, sourceFile),
    modifiers = getModifiers(node, sourceFile, parser) || {},
    typeParameters = parser.parse(node.typeParameters, sourceFile);

  // TODO - add props from ts.FunctionLikeDeclarationBase and ts.SignatureDeclarationBase

  return {
    kind: DeclarationKind.METHOD,
    name,
    type,
    parameters,
    typeParameters,
    ...modifiers,
    signature: getMethodSignature(name, parameters, modifiers, type),
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
