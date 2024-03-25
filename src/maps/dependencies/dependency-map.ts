import * as ts from "typescript";
import { log } from "../../utilities";
import {AdditionalMapProps} from "../common";
import {
  convertPath,
  DuplicatePathPrecedenceMap,
  PathConversionMap, PathParserMaps,
  PathResolutionMap,
  resolveDuplicatePath,
  resolvePath
} from "../../paths";


export type DependencyMapElement<O extends AdditionalMapProps = {}> = {
  module: string
  name: string
  path: string
  resolvedPath: string
  convertedPath?: string
  kind: ts.SyntaxKind
} & O

export type DependencyModuleMap<O extends AdditionalMapProps = {}> = Map<string, DependencyMapElement<O>>

export type DependencyMapOptions = {
  moduleKeyRegex?: RegExp
  debug?: boolean
} & Partial<Omit<PathParserMaps, 'ignorePathsMap'>>

export const dependencyMapKeyRegex = /^((@.*?\/)*[^\/]*)/g;


export class DependencyMap<O extends AdditionalMapProps = {}> {

  readonly #keyRegex: RegExp = dependencyMapKeyRegex;
  readonly #pathResolutionMap: PathResolutionMap = [];
  readonly #debug: boolean = false;

  readonly #duplicatePathPrecedenceMap?: DuplicatePathPrecedenceMap;
  readonly #pathConversionMap?: PathConversionMap;

  #map = new Map<string, DependencyModuleMap<O>>();

  constructor(options?: DependencyMapOptions) {
    this.#keyRegex = options?.moduleKeyRegex || this.#keyRegex;
    this.#pathResolutionMap = options?.pathResolutionMap || this.#pathResolutionMap;
    this.#debug = options?.debug ?? this.#debug;

    this.#duplicatePathPrecedenceMap = options?.duplicatePathPrecedenceMap;
    this.#pathConversionMap = options?.pathConversionMap;
  }

  set(modulePath: string, entityName: string, kind: ts.SyntaxKind, additional?: O): void {

    const resolvedPath = resolvePath(modulePath, this.#pathResolutionMap),
      key = resolvedPath.match(this.#keyRegex)?.[0] || '';

    if(!key && this.#debug) {
      log(`${entityName} skipped for ${resolvedPath}`, 'NO KEY FOUND');
      return;
    }

    const moduleMap: DependencyModuleMap<O> = this.#map.get(key) || new Map();

    let props: DependencyMapElement<O> = {
      module: key,
      name: entityName,
      path: modulePath,
      resolvedPath,
      kind,
      ...(additional ?? {} as O)
    };

    props = this.#handleDuplicatePath(props, moduleMap);
    props = this.#handlePathConversion(props);

    moduleMap.set(entityName, props);

    this.#map.set(key, moduleMap);
  }

  get(modulePath: string, entityName: string): DependencyMapElement<O> | undefined {

    const key = modulePath.match(this.#keyRegex)?.[0] || '';

    if(!key) {
      if(this.#debug) {
        log(`${entityName} skipped for ${modulePath}`, 'NO KEY FOUND');
      }
      return;
    }

    const moduleMap = this.#map.get(key);

    if(!moduleMap) {
      if(this.#debug) {
        console.log(`No source module map found for ${key}`);
      }
      return;
    }

    return moduleMap.get(entityName);
  }

  toString(): string {
    console.log(this.#map);
    return '';
  }

  #handleDuplicatePath(props: DependencyMapElement<O>, moduleMap: DependencyModuleMap<O>): DependencyMapElement<O> {

    if(!this.#duplicatePathPrecedenceMap) {
      return props;
    }

    const entityName = props.name,
      modulePath = props.resolvedPath,
      existingElement = moduleMap.get(entityName);

    if(existingElement) {

      const resolution = resolveDuplicatePath(existingElement.resolvedPath, modulePath, this.#duplicatePathPrecedenceMap);

      if(resolution === 0) {
        if(this.#debug) {
          log(`Name: ${entityName}\nStored path: ${existingElement.path}\nDuplicate path: ${modulePath}`, 'DUPLICATE PATH FOUND');
        }
        return existingElement;
      }
    }

    return props;
  }

  #handlePathConversion(props: DependencyMapElement<O>): DependencyMapElement<O> {

    if(!this.#pathConversionMap) {
      return props;
    }

    const convertedPath = convertPath(props.name, props.resolvedPath, props.kind, this.#pathConversionMap);

    if(convertedPath === props.resolvedPath) {
      return props;
    }

    return {
      ...props,
      convertedPath
    }
  }
}


