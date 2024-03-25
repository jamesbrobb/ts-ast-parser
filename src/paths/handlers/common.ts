import {BasePathHandler} from "./path-handler";
import {IgnorePathsMap} from "../../maps";


export class CommonPathHandler extends BasePathHandler {
  override getIgnorePathsMap(): IgnorePathsMap {
    return ['tslib', 'public-api', '.spec.ts', '.mock.ts']
  }
}
