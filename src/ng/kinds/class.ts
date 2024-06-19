import * as ts from "typescript";

import {getClassDeclaration, ClassDeclaration} from "../../declarations";
import {isUIClass} from "../ng-helpers";
// import {NgPropertyDeclaration} from "./property";


export type NgClassDeclaration = {
    isUI: boolean,
    //children?: ClassDeclaration['children'] & (NgPropertyDeclaration)[]
} & ClassDeclaration


export function getNgClassDeclaration(node: ts.ClassDeclaration, sourceFile: ts.SourceFile): NgClassDeclaration {
    const dec = getClassDeclaration(node, sourceFile),
        isUI = isUIClass(dec);

    return {
        ...dec,
        isUI
    }
}