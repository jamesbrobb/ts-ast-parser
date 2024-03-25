import {stripQuotes} from "../../utilities";

export type PathResolutionMapEntry = [matcher: string | RegExp, prepend?: string, append?: string]
export type PathResolutionMap = PathResolutionMapEntry[]

export function resolvePath(path: string, map: PathResolutionMap): string {

  path = stripQuotes(path);

  map.forEach((value) => {

    if(path.search(value[0]) === -1) {
      return;
    }

    if(value[0] instanceof RegExp && value[0].test(path)) {
      path = path.replace(value[0], value[1] || '');
    }

    if(typeof value[0] === 'string') {
      path = `${value[1] || ''}${path.split(value[0]).slice(-1)[0]}${value[2] || ''}`;
    }
  });

  return path.replace(/^\//, '');
}
