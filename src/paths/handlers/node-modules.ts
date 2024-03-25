import {PathResolutionMap, PathResolutionMapEntry} from "../resolvers";
import {BasePathHandler} from "./path-handler";


const NODE_MODULE_PATH_RESOLVER: PathResolutionMapEntry = [/^.*?\/node_modules\/(.*?)(?:\/index)?$/g, '$1']


export class NodeModulesPathHandler extends BasePathHandler {

  override getPathResolutionMap(): PathResolutionMap {
    return [NODE_MODULE_PATH_RESOLVER]
  }
}
