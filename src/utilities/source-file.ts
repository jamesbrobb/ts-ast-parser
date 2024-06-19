import * as ts from 'typescript';
import * as path from "path";

import {logResults} from "./log";
import {ParseNodeOptions, walkNodeTree} from "./node";
import {AdditionalMapProps, createImportsMap, ImportsMapFactoryOptions} from "../maps";
import {SourceFileDeclaration} from "../declarations/kinds/source-file";
import {DeclarationKind, SyntaxKindToTypeMap} from "../declarations";


export function getSourceFile(program: ts.Program, sourcePath: string): ts.SourceFile {

  const sourceFile = program.getSourceFile(sourcePath);

  if(!sourceFile) {
    throw new Error(`No source file found for ${sourcePath} - if it\'s part of a library make sure it\'s exported in the public-api.ts file`);
  }

  return sourceFile;
}

export function getSourceFileSymbol(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  debug: boolean = false
): ts.Symbol | undefined {

  const typeChecker = program.getTypeChecker(),
    symbol = typeChecker.getSymbolAtLocation(sourceFile);

  if(!symbol && debug) {
    console.log(`No symbols found in ${sourceFile.fileName}`);
  }

  return symbol;
}

export function getExportedDeclarationsFromSource(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  debug: boolean = false
): ts.Declaration[] {

  const symbol = getSourceFileSymbol(program, sourceFile, debug),
    typeChecker = program.getTypeChecker();

  if(!symbol) {
    return [];
  }

  return typeChecker.getExportsOfModule(symbol)
    .map(value => value.declarations?.[0])
    .filter((declaration): declaration is ts.Declaration => !!declaration);
}


export type ParseSourceFileOptions<M extends SyntaxKindToTypeMap<unknown>, O extends AdditionalMapProps = {}> =
  ParseNodeOptions<M> & ImportsMapFactoryOptions<O>


export function parseSourceFile<M extends SyntaxKindToTypeMap<unknown>, O extends AdditionalMapProps = {}>(
  program: ts.Program,
  source: ts.SourceFile | string,
  options?: ParseSourceFileOptions<M, O>
): SourceFileDeclaration {

  const sourceFile: ts.SourceFile = typeof source === 'string' ? getSourceFile(program, source) : source;

  const exports: any[] = getExportedDeclarationsFromSource(program, sourceFile)
      .map(declaration => walkNodeTree(declaration, sourceFile, options));

  if(options?.debug) {
    logResults(exports);
  }

  const imports = createImportsMap(sourceFile, options);

  return {
    kind: DeclarationKind.SOURCE_FILE,
    fileName: path.basename(sourceFile.fileName),
    path: path.dirname(sourceFile.fileName),
    imports,
    exports
  }
}

export function parseSourceFiles<M extends SyntaxKindToTypeMap<unknown>>(
  program: ts.Program,
  entryPoint: string,
  options?: ParseNodeOptions<M>
) {
  const basePath = path.dirname(entryPoint),
    ignoreFiles = ['index.ts', 'public-api.ts', '.d.ts', '.spec.ts', '.mock.ts'];
  return program.getSourceFiles()
    .filter(sourceFile => sourceFile.fileName.startsWith(basePath))
    .filter(sourceFile => {
      return !ignoreFiles.some(ignoreFile => sourceFile.fileName.endsWith(ignoreFile));
    })
    .map(sourceFile => parseSourceFile(program, sourceFile, options));
}
