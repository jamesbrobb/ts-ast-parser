import {ParsedNodeResult} from "../utilities";
import {GetDeclarationFn} from "./declaration-types";

// TODO - need to think about where this function should live
export function ignoreChildren<F extends GetDeclarationFn<any>>(func: F) {

  return (...args: Parameters<F>): ParsedNodeResult<ReturnType<F>> => {

    const result: ReturnType<F> = func.apply(undefined, args);

    return {
      exit: true,
      result
    }
  }
}
