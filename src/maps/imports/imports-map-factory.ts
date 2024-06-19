import * as ts from "typescript";
import * as path from "path";

import {PathResolutionMap, resolvePath} from "../../paths";
import {Import} from "../../declarations";
import {walkNodeTree} from "../../utilities";
import {ImportsMap, ImportsMapElement} from "./imports-map";
import {DependencyMap} from "../dependencies/dependency-map";
import {AdditionalMapProps} from "../common";


type _Options = {
  debug?: boolean
  pathResolutionMap?: PathResolutionMap,
  dependencyMap?: DependencyMap
}


export type ImportsMapFactoryOptions<O extends AdditionalMapProps = {}> =
  keyof O extends never ?
    _Options :
    _Options & { importsMapElementCreatorFn: ImportsMapElementCreatorFn<O> }

export type ImportsMapElementCreatorFnParams<O extends AdditionalMapProps = {}> = {
  sourceFile: ts.SourceFile,
  importDec: ts.ImportDeclaration,
  imprt: Import,
  element: ImportsMapElement,
  options?: ImportsMapFactoryOptions<O>
}

export type ImportsMapElementCreatorFn<O extends AdditionalMapProps = {}> = (
  params: ImportsMapElementCreatorFnParams<O>
) => O;


export function createImportsMap<O extends AdditionalMapProps = {}>(
  sourceFile: ts.SourceFile,
  options?: ImportsMapFactoryOptions<O>
): ImportsMap<O> {

  const map = getImportDeclarations(sourceFile, options)
    .flatMap(([importDec, imprt]) =>
      createImportMapElements(importDec, imprt, sourceFile, options))
    .map(([importDec, imprt, element]) =>
      addAdditionalPropsToImportMapElement({sourceFile, importDec, imprt, element, options}));

  if(options?.debug) {
    console.log(map);
  }

  return map;
}



function getImportDeclarations(sourceFile: ts.SourceFile, options?: ImportsMapFactoryOptions): [ts.ImportDeclaration, Import][] {
  return sourceFile.statements.filter(ts.isImportDeclaration)
    .map((importDec) => {

      const imprt = walkNodeTree(importDec, sourceFile, {
        ...options
      }) as Import;

      return [importDec, imprt]
    });
}


function createImportMapElements(
  importDec: ts.ImportDeclaration,
  imprt: Import,
  sourceFile: ts.SourceFile,
  options?: ImportsMapFactoryOptions
): [ts.ImportDeclaration, Import, ImportsMapElement][] {
  return parseImportToImportMapElement(imprt, sourceFile, options)
    .map(element => [importDec, imprt, element])
}


function addAdditionalPropsToImportMapElement<O extends AdditionalMapProps = {}>(
  params: ImportsMapElementCreatorFnParams<O>
): ImportsMapElement<O> {

  let additional: O = {} as O;
  const options = params.options;

  if(options && 'importsMapElementCreatorFn' in options) {
    additional = options.importsMapElementCreatorFn(params);
  }

  return {
    ...params.element,
    ...additional
  };
}


function parseImportToImportMapElement (
  imprt: Import,
  sourceFile: ts.SourceFile,
  options?: ImportsMapFactoryOptions
): ImportsMap {

  return getImportNames(imprt)
    .map<ImportsMapElement>(name => {

      let props: ImportsMapElement ={
        name,
        module: imprt.module,
        resolvedModulePath: resolveModulePath(
          imprt.module,
          sourceFile,
          options?.pathResolutionMap || []
        )
      }

      if(options?.dependencyMap) {
        const dep = options.dependencyMap.get(props.resolvedModulePath, name);
        if(dep?.convertedPath) {
          props.convertedModulePath = dep.convertedPath;
        }
      }

      return props;
    }
  )
}


function resolveModulePath(modulePath: string, sourceFile: ts.SourceFile, pathResolutionMap: PathResolutionMap = []): string {

  if(modulePath.startsWith('.')) {
    modulePath = path.resolve(path.dirname(sourceFile.fileName), modulePath);
  }

  return resolvePath(modulePath, pathResolutionMap);
}


function getImportNames(imprt: Import): string[] {

  if(!imprt.children) {
    return [];
  }

  return imprt.children.map(child => child)
    .flatMap(child => child.children?.map(namedImport => namedImport))
    .flatMap(namedImport => namedImport?.children?.map(importSpecifier => importSpecifier))
    .map(importSpecifier => importSpecifier?.name)
    .filter((name): name is string => !!name);
}
