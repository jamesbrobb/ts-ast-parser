import {PathResolutionMap, PathResolutionMapEntry, PathConversionMap, PathConversionMapEntry} from "../resolvers";
import {BasePathHandler} from "./path-handler";


const JBR_PATH_RESOLVER: PathResolutionMapEntry = [/^.*?\/jbr\/(?:dist\/)?libraries\/(?:@jamesbenrobb\/)?(.*?)$/g, '@jamesbenrobb/$1']
const JBR_PATH_CONVERTOR: PathConversionMapEntry = [/^@jamesbenrobb\/([^\/]*)(?:\/src)?\/lib/g, 'libraries/$1']


export class JBRPathHandler extends BasePathHandler {
  override getPathResolutionMap(): PathResolutionMap {
    return [JBR_PATH_RESOLVER];
  }

  override getPathConversionMap(): PathConversionMap {
    return [JBR_PATH_CONVERTOR];
  }
}

