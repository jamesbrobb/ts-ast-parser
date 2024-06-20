import * as path from "node:path";
import * as fs from "node:fs";

import {
  CommonPathHandler,
  JBRPathHandler,
  NgPathHandler,
  NodeModulesPathHandler,
  RxjsPathHandler,
  AngularMaterialPathHandler,
  LightweightChartsPathHandler,
  parse,
  Parser
} from "../src";
import {NgDeclarationFunctionMap} from "../src/ng/declarations";


const pathHandlers = [
  new CommonPathHandler(),
  new NodeModulesPathHandler(),
  new AngularMaterialPathHandler(),
  new NgPathHandler(),
  new RxjsPathHandler(),
  new JBRPathHandler(),
  new LightweightChartsPathHandler()
]


function run() {

  const sourcePath = process.argv.slice(2)[0];

  let relativePath = sourcePath;

  if(path.isAbsolute(sourcePath)) {
    relativePath = path.relative(process.cwd(), sourcePath);
  }

  const dir = path.dirname(relativePath);

  process.chdir(dir);

  const source = parse({
    debug: false,
    lazy: false,
    walk: false,
    sourcePath,
    pathHandlers,
    parser: new Parser(NgDeclarationFunctionMap)
  });

  fs.writeFileSync(
      path.join('/Users/James/WebstormProjects/ts-ast-parser/scripts/output', 'test.json'),
      JSON.stringify(source, null, '  ')
  );
}


run();