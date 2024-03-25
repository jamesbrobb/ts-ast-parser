import {PathHandler} from "./handlers";
import {IgnorePathsMap} from "../maps";
import {DuplicatePathPrecedenceMap, PathResolutionMap, PathConversionMap} from "./resolvers";


export type PathParserMaps = {
  ignorePathsMap: IgnorePathsMap
  duplicatePathPrecedenceMap: DuplicatePathPrecedenceMap
  pathResolutionMap: PathResolutionMap
  pathConversionMap: PathConversionMap
}


export function buildPathMaps(...pathHandlers: PathHandler[]): PathParserMaps {

  const maps: PathParserMaps = {
    ignorePathsMap: [],
    duplicatePathPrecedenceMap: [],
    pathResolutionMap: [],
    pathConversionMap: []
  }

  pathHandlers.forEach((handler) => {
    maps.ignorePathsMap = maps.ignorePathsMap.concat(handler.getIgnorePathsMap())
    maps.duplicatePathPrecedenceMap = maps.duplicatePathPrecedenceMap.concat(handler.getDuplicatePathPrecedenceMap())
    maps.pathResolutionMap = maps.pathResolutionMap.concat(handler.getPathResolutionMap())
    maps.pathConversionMap = maps.pathConversionMap.concat(handler.getPathConversionMap())
  });

  return maps;
}
