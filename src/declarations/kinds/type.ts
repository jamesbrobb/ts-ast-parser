import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {getText} from "../../utilities";
import {getPropertySignature, PropertySignature} from "./property";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type TypeParameter = {
  name: string,
  constraint?: string,
  default?: string,
  raw: string
} & Declaration<DeclarationKind.TYPE_PARAMETER> & Modifiers;

export type TypeReference = {
  name: string,
  raw: string
} & Declaration<DeclarationKind.TYPE_REFERENCE>

export type ExpressionWithTypeArguments = {
  expression: string,
  typeArguments?: string[],
  raw: string
} & Declaration<DeclarationKind.EXPRESSION_WITH_TYPE_ARGUMENTS>

export type TypeAliasDeclaration = {
  name: string,
  typeParameters?: TypeParameter[],
  type: string,
  raw: string
} & Declaration<DeclarationKind.TYPE_ALIAS> & Modifiers;

export type TypeLiteral = {
  members: ({kind: number, nodeType: string, raw: string} | PropertySignature) [],
  raw: string
} & Declaration<DeclarationKind.TYPE_LITERAL>

export type TypeElement = {
  name: string,
  optional?: boolean
} & Declaration<DeclarationKind.TYPE_ELEMENT>


export function getTypeParameterDeclaration(node: ts.TypeParameterDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): TypeParameter {

  const modifiers = getModifiers(node, sourceFile, parser) || {};

  return {
    kind: DeclarationKind.TYPE_PARAMETER,
    name: getText(node.name, sourceFile),
    constraint: node.constraint ? getText(node.constraint, sourceFile) : undefined,
    default: node.default ? getText(node.default, sourceFile) : undefined,
    raw: node.getText(sourceFile),
    ...modifiers
  }
}


export function getTypeReference(node: ts.TypeReferenceNode, sourceFile: ts.SourceFile): TypeReference {
  return {
    kind: DeclarationKind.TYPE_REFERENCE,
    name: getText(node.typeName, sourceFile),
    raw: node.getText(sourceFile)
  }
}


export function getExpressionWithTypeArguments(node: ts.ExpressionWithTypeArguments, sourceFile: ts.SourceFile): ExpressionWithTypeArguments {
    return {
      kind: DeclarationKind.EXPRESSION_WITH_TYPE_ARGUMENTS,
      expression: getText(node.expression, sourceFile),
      typeArguments: node.typeArguments ? node.typeArguments.map(typeArg => getText(typeArg, sourceFile)) : undefined,
      raw: node.getText(sourceFile)
    }
}


export function getTypeAliasDeclaration(node: ts.TypeAliasDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): TypeAliasDeclaration {

  const modifiers = getModifiers(node, sourceFile, parser) || {};

  return {
    kind: DeclarationKind.TYPE_ALIAS,
    name: getText(node.name, sourceFile),
    typeParameters: node.typeParameters ? node.typeParameters.map(typeParam => getTypeParameterDeclaration(typeParam, sourceFile, parser)) : undefined,
    type: getType(node.type, sourceFile, parser),
    raw: node.getText(sourceFile),
    ...modifiers
  }
}

export function getTypeLiteral(node: ts.TypeLiteralNode, sourceFile: ts.SourceFile, parser: Parser<any>): TypeLiteral {

  return {
    kind: DeclarationKind.TYPE_LITERAL,
    members: node.members.map(member => {

      if(ts.isPropertySignature(member)) {
        return getPropertySignature(member, sourceFile, parser);
      }

      return {
        kind: member.kind,
        nodeType: ts.SyntaxKind[member.kind],
        raw: getText(member, sourceFile)
      }
    }),
    raw: node.getText(sourceFile)
  }
}

export function getTypeElement(node: ts.TypeElement, sourceFile: ts.SourceFile): TypeElement {

    return {
      kind: DeclarationKind.TYPE_ELEMENT,
      name: node.name ? getText(node.name, sourceFile) : '',
      optional: !!node.questionToken
    }
}


export function getType(node: ts.Node, sourceFile: ts.SourceFile, parser: Parser<any>): string | any {

  if(ts.isTypeReferenceNode(node)) {
    return getTypeReference(node, sourceFile);
  }

  if(ts.isTypeElement(node)) {
    return getTypeElement(node, sourceFile);
  }

  if(ts.isTypeLiteralNode(node)) {
    return getTypeLiteral(node, sourceFile, parser);
  }

  if(ts.isUnionTypeNode(node)) {
    return node.types.map(type => getType(type, sourceFile, parser));
  }

  return getText(node, sourceFile);
}
