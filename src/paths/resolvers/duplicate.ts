
export type DuplicatePathPrecedenceMapEntry = [path: string | RegExp, priority: number]
export type DuplicatePathPrecedenceMap = DuplicatePathPrecedenceMapEntry[]

export function resolveDuplicatePath(existingPath: string, newPath: string, map: DuplicatePathPrecedenceMap): number {

  let result = 0;

  const a = map.find((value) => {
    return existingPath.search(value[0]) !== -1;
  });

  const b = map.find((value) => {
    return newPath.search(value[0]) !== -1;
  });

  if(a && b) {
    result = Math.min(Math.max(a[1] - b[1], 1), -1);
  }

  return result;
}
