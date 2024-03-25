import * as ts from "typescript";


export function createProgram(entryPoint: string, options: ts.CompilerOptions): ts.Program {
  return ts.createProgram([entryPoint], options);
}
