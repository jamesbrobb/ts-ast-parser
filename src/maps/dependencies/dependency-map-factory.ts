import * as ts from "typescript";

import {log, getSourceFileSymbol, stripQuotes} from "../../utilities";
import {DependencyMap, DependencyMapOptions} from "./dependency-map";
import {AdditionalMapProps} from "../common";


type _SymbolWithExports = ts.Symbol & {exports: ts.SymbolTable};
type _SourceAndSymbolTuple = [sourceFile: ts.SourceFile, symbol: _SymbolWithExports];

type _Options = {
  ignorePathsMap?: IgnorePathsMap,
} & DependencyMapOptions


export type IgnorePathsMap = (string | RegExp)[];
export type SourceModuleCreatorFn<O extends AdditionalMapProps = {}> = (
  node: ts.Node,
  sourceFile: ts.SourceFile,
  debug?: boolean
) => O;

export type DependencyMapFactoryOptions<O extends AdditionalMapProps = {}> =
  keyof O extends never ?
    _Options :
    _Options & { sourceModuleCreatorFn: SourceModuleCreatorFn<O> }


export function createDependencyMap<O extends AdditionalMapProps = {}>(
  program: ts.Program,
  options?: DependencyMapFactoryOptions<O>
): DependencyMap<O> {

  const dependencyMap = new DependencyMap<O>(options);

  program.getSourceFiles()
    .filter(sourceFile => isSourceFileEligible(program, sourceFile, options))
    .map(sourceFile => [sourceFile, getSymbolFromSource(program, sourceFile)])
    .filter((arg): arg is _SourceAndSymbolTuple => !!arg[1])
    .forEach(([sourceFile, symbol]) => {

      symbol.exports.forEach((value, _key) => {

        if (['__export', '__exportStar'].includes(value.name) || value.name.startsWith('ɵ')) {
          return;
        }

        const declaration = value.declarations?.[0];

        if (!declaration) {
          return;
        }

        let additional: O = {} as O;

        if(options && 'sourceModuleCreatorFn' in options) {
          additional = options.sourceModuleCreatorFn(declaration, sourceFile, options.debug);
        }

        dependencyMap.set(stripQuotes(symbol.name), value.name, declaration.kind, additional);
      });
    });

  if(options?.debug) {
    log(dependencyMap.toString(), 'SOURCE FILES MAP');
  }

  return dependencyMap;
}

function isSourceFileEligible(program: ts.Program, sourceFile: ts.SourceFile, options?: DependencyMapFactoryOptions): boolean {

  const baseUrl = program.getCompilerOptions().baseUrl || '';

  if(!baseUrl && options?.debug) {
    console.warn('No baseUrl found in tsconfig.json');
  }

  if(!sourceFile.fileName.includes(baseUrl)) {
    return false;
  }

  return !ignorePath(sourceFile.fileName, options?.ignorePathsMap || [], options?.debug)
}

function getSymbolFromSource(program: ts.Program, sourceFile: ts.SourceFile): _SymbolWithExports | undefined {

  const symbol = getSourceFileSymbol(program, sourceFile);

  return isSymbolWithExports(symbol) ? symbol : undefined;
}

function isSymbolWithExports(symbol?: ts.Symbol): symbol is _SymbolWithExports {
  return !!symbol?.exports?.size;
}


function ignorePath(path: string, map: IgnorePathsMap, debug: boolean = false): boolean {

  const ignore = map.some(value => {
    return path.search(value) !== -1;
  });

  if(ignore && debug) {
    log(path, 'IGNORING PATH')
  }

  return ignore;
}
