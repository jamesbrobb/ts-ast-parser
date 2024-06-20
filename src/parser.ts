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
import {SyntaxKindToTypeMap} from "./declarations";


export type ParseOptions<M extends SyntaxKindToTypeMap<unknown>> = {
  pathHandlers?: PathHandler[],
  sourcePath?: string,
  walk?: boolean
} & ParseNodeOptions<M>


export function parse<M extends SyntaxKindToTypeMap<unknown>>(options: ParseOptions<M>): SourceFileDeclaration[] | SourceFileDeclaration {

  const config = getParsedTSConfig(),
    entryFile = config.fileNames[0],
    program = createProgram(entryFile, config.options);

  const pathHandlers = options.pathHandlers || [],
    pathMaps: PathParserMaps = buildPathMaps(...pathHandlers);

  const dependencyMap = createDependencyMap(program, {
    debug: !!options.debug,
    ...pathMaps
  });

  const sfParseOptions: ParseSourceFileOptions<M> = {
    ...options,
    ...pathMaps,
    dependencyMap
  }

  if(options.sourcePath && !options.walk) {
    return parseSourceFile(program, options.sourcePath, sfParseOptions)
  }

  return parseSourceFiles(program, options.sourcePath || entryFile, sfParseOptions);
}
