import * as ts from "typescript";
import {ParsedNodeResult} from "../utilities";
import {GetDeclarationFn} from "./declaration-types";


// TODO - need to think about where this function should live
export function ignoreChildren<F extends GetDeclarationFn<any, any>>(func: F) {

  return (...args: Parameters<F>): ParsedNodeResult<ReturnType<F>> => {

    const result: ReturnType<F> = func.apply(undefined, args);

    return {
      exit: true,
      result
    }
  }
}

export type extractNodeArrayType<T> = T extends Array<infer R> ? R : T

export function isNodeArray(value: any): value is ts.NodeArray<any> {
  return Array.isArray(value);
}
