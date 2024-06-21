import * as ts from "typescript";
import {getModifiers, Modifiers} from "./modifiers";
import {PropertySignature} from "./property";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Parser} from "../declaration-parser";


export type TypeParameter = {
  name: string,
  constraint?: string,
  default?: string,
  // expression: Expression // TODO - check this out
  raw: string
} & Declaration<DeclarationKind.TYPE_PARAMETER> & Modifiers;

export type TypeReference = {
  name: string,
  // typeArguments?: NodeArray<TypeNode> // TODO - check this out
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
  return {
    kind: DeclarationKind.TYPE_PARAMETER,
    name: parser.parse(node.name, sourceFile),
    constraint: parser.parse(node.constraint, sourceFile),
    default: parser.parse(node.default, sourceFile),
    ...(getModifiers(node, sourceFile, parser) || {}),
    raw: node.getText(sourceFile),
  }
}


export function getTypeReference(node: ts.TypeReferenceNode, sourceFile: ts.SourceFile, parser: Parser<any>): TypeReference {
  return {
    kind: DeclarationKind.TYPE_REFERENCE,
    name: parser.parse(node.typeName, sourceFile),
    raw: node.getText(sourceFile)
  }
}


export function getExpressionWithTypeArguments(node: ts.ExpressionWithTypeArguments, sourceFile: ts.SourceFile, parser: Parser<any>): ExpressionWithTypeArguments {
    return {
      kind: DeclarationKind.EXPRESSION_WITH_TYPE_ARGUMENTS,
      expression: parser.parse(node.expression, sourceFile),
      typeArguments: parser.parse(node.typeArguments, sourceFile),
      raw: node.getText(sourceFile)
    }
}


export function getTypeAliasDeclaration(node: ts.TypeAliasDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): TypeAliasDeclaration {
  return {
    kind: DeclarationKind.TYPE_ALIAS,
    name: parser.parse(node.name, sourceFile),
    typeParameters: parser.parse(node.typeParameters, sourceFile),
    type: getType(node.type, sourceFile, parser),
    ...(getModifiers(node, sourceFile, parser) || {}),
    raw: node.getText(sourceFile)
  }
}

export function getTypeLiteral(node: ts.TypeLiteralNode, sourceFile: ts.SourceFile, parser: Parser<any>): TypeLiteral {

  return {
    kind: DeclarationKind.TYPE_LITERAL,
    members: parser.parse(node.members, sourceFile),
    /*members: node.members.map(member => {

      if(ts.isPropertySignature(member)) {
        return getPropertySignature(member, sourceFile, parser);
      }

      return {
        kind: member.kind,
        nodeType: ts.SyntaxKind[member.kind],
        raw: parser.parse(member, sourceFile)
      }
    }),*/
    raw: node.getText(sourceFile)
  }
}

export function getTypeElement(node: ts.TypeElement, sourceFile: ts.SourceFile, parser: Parser<any>): TypeElement {
    return {
      kind: DeclarationKind.TYPE_ELEMENT,
      name: parser.parse(node.name, sourceFile),
      optional: !!node.questionToken
    }
}


export function getType(node: ts.Node, sourceFile: ts.SourceFile, parser: Parser<any>): string | any {

  if(ts.isTypeReferenceNode(node) || ts.isTypeLiteralNode(node)) {
    return parser.parse(node, sourceFile);
  }

  if(ts.isTypeElement(node)) {
    // TODO - work out how to move this to parse map
    return getTypeElement(node, sourceFile, parser);
  }

  if(ts.isUnionTypeNode(node)) {
    return node.types.map(type => getType(type, sourceFile, parser));
  }

  return parser.parse(node, sourceFile);
}
