import * as ts from "typescript";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {getModifiers, Modifiers} from "./modifiers";
import {Decorator} from "./decorator";
import {TypeParameter} from "./type";
import {HeritageClause} from "./heritage";
import {Constructor} from "./constructor";
import {PropertyDeclaration} from "./property";
import {Method} from "./method";
import {GetAccessor} from "./get-accessor";
import {SetAccessor} from "./set-accessor";
import {Parser} from "../declaration-parser";


export type ClassDeclaration = {
    name: string,
    children?: (
        Decorator | Modifiers | TypeParameter | HeritageClause |
        Constructor | PropertyDeclaration | Method | GetAccessor | SetAccessor
    )[]
} & Declaration<DeclarationKind.CLASS> & Modifiers


export function getClassDeclaration(node: ts.ClassDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): ClassDeclaration {
    const modifiers = getModifiers(node, sourceFile, parser) || {};
    return {
        kind: DeclarationKind.CLASS,
        name: node.name ? parser.parse(node.name, sourceFile) : 'Class name not found',
        ...modifiers
    }
}
