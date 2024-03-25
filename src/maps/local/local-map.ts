import * as ts from "typescript";
import {getExportedDeclarationsFromSource, getText} from "../../utilities";


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
        'name' in node && node.name? getText(node.name as any, sourceFile) : 'Name not found',
        [node.kind, node]
      ])
  );
}
