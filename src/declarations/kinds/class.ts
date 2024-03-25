import * as ts from "typescript";
import {Declaration} from "../declaration-types";
import {DeclarationKind} from "../declaration-kind";
import {Modifiers} from "./modifiers";
import {getText} from "../../utilities";
import {Decorator} from "./decorator";
import {TypeParameter} from "./type";
import {HeritageClause} from "./heritage";
import {Constructor} from "./constructor";
import {PropertyDeclaration} from "./property";
import {Method} from "./method";
import {GetAccessor} from "./get-accessor";
import {SetAccessor} from "./set-accessor";


export type ClassDeclaration = {
    name: string,
    children?: (
        Decorator | Modifiers | TypeParameter | HeritageClause |
        Constructor | PropertyDeclaration | Method | GetAccessor | SetAccessor
    )[]
} & Declaration<DeclarationKind.CLASS> & Modifiers


export function getClassDeclaration(node: ts.ClassDeclaration, sourceFile: ts.SourceFile): ClassDeclaration {

    return {
        kind: DeclarationKind.CLASS,
        name: node.name ? getText(node.name, sourceFile) : 'Class name not found',
    }
}
