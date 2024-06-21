import * as ts from "typescript";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {getModifiers, Modifiers} from "./modifiers";
import {TypeParameter} from "./type";
import {HeritageClause} from "./heritage";
import {Parser} from "../declaration-parser";
import {ClassElement} from "typescript";


export type ClassDeclaration = {
    name: string,
    typeParameters?: TypeParameter[],
    heritage?: HeritageClause[],
    members: ClassElement[]
} & Declaration<DeclarationKind.CLASS> & Modifiers


export function getClassDeclaration(node: ts.ClassDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): ClassDeclaration {
    return {
        kind: DeclarationKind.CLASS,
        name: parser.parse(node.name, sourceFile, 'Class name not found'),
        typeParameters: parser.parse(node.typeParameters, sourceFile),
        heritage: parser.parse(node.heritageClauses, sourceFile),
        ...(getModifiers(node, sourceFile, parser) || {}),
        members: parser.parse(node.members, sourceFile)
    }
}
