import {SourceFileDeclaration} from "./declarations/kinds/source-file";
import {buildPathMaps, PathParserMaps, PathHandler} from "./paths";
import {
  createProgram,
  getParsedTSConfig,
  ParseNodeOptions,
  parseSourceFile,
  ParseSourceFileOptions,
  parseSourceFiles
} from "./utilities";
import {createDependencyMap} from "./maps";


export type ParseOptions<R> = {
  pathHandlers?: PathHandler[],
  sourcePath?: string,
  walk?: boolean
} & ParseNodeOptions<R>


export function parse<R>(options?: ParseOptions<R>): SourceFileDeclaration[] | SourceFileDeclaration {

  const config = getParsedTSConfig(),
    entryFile = config.fileNames[0],
    program = createProgram(entryFile, config.options);

  const pathHandlers = options?.pathHandlers || [],
    pathMaps: PathParserMaps = buildPathMaps(...pathHandlers);

  const dependencyMap = createDependencyMap(program, {
    debug: false,
    ...pathMaps
  });

  const sfParseOptions: ParseSourceFileOptions<R> = {
    ...options,
    ...pathMaps,
    dependencyMap
  }

  if(options?.sourcePath && !options?.walk) {
    return parseSourceFile(program, options.sourcePath, sfParseOptions)
  }

  return parseSourceFiles(program, options?.sourcePath || entryFile, sfParseOptions);
}
