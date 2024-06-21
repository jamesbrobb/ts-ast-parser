import * as ts from "typescript";
import {getExportedDeclarationsFromSource} from "../../utilities";
import {parseString} from "../../declarations";


export type LocalMapElement = [kind: ts.SyntaxKind, node: ts.Declaration]
export type LocalMap = Map<string, LocalMapElement>


export function createLocalMap(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  debug: boolean = false
): LocalMap {
  return new Map(
    getExportedDeclarationsFromSource(program, sourceFile, debug)
      .map(node => [
        'name' in node && node.name? parseString(node.name as any, sourceFile) : 'Name not found',
        [node.kind, node]
      ])
  );
}
