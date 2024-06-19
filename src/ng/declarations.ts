import * as ts from "typescript";
import {SyntaxKindToDeclarationTypeMap} from "../declarations/declaration-type-map";
import {getNgClassDeclaration, NgClassDeclaration} from "./kinds/class";
import {DeclarationParseFunctionMap, defaultDeclarationFunctionMap} from "../declarations";


export type NgSyntaxKindToDeclarationTypeMap = SyntaxKindToDeclarationTypeMap & {
    [ts.SyntaxKind.ClassDeclaration]: NgClassDeclaration
}


export const NgDeclarationFunctionMap: DeclarationParseFunctionMap<NgSyntaxKindToDeclarationTypeMap> = {
    ...defaultDeclarationFunctionMap,
    [ts.SyntaxKind.ClassDeclaration]: getNgClassDeclaration
}