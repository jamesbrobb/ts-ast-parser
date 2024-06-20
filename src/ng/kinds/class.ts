import * as ts from "typescript";

import {
    getClassDeclaration,
    ClassDeclaration,
    Decorator,
    Modifiers,
    TypeParameter,
    HeritageClause, Constructor, Method, GetAccessor, SetAccessor, Parser
} from "../../declarations";
import {isUIClass} from "../ng-helpers";
import {NgPropertyDeclaration} from "./property";


export type NgClassDeclaration = ClassDeclaration & {
    isUI: boolean,
    children?: (
        Decorator | Modifiers | TypeParameter | HeritageClause |
        Constructor | NgPropertyDeclaration | Method | GetAccessor | SetAccessor
        )[]
}


export function getNgClassDeclaration(node: ts.ClassDeclaration, sourceFile: ts.SourceFile, parser: Parser<any>): NgClassDeclaration {
    const dec = getClassDeclaration(node, sourceFile, parser),
        isUI = isUIClass(dec);

    return {
        ...dec,
        isUI
    }
}