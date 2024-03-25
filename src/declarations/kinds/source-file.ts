import {DeclarationKind} from "../declaration-kind";
import {Declaration} from "../declaration-types";
import {ImportsMap, AdditionalMapProps} from "../../maps";


export type SourceFileDeclaration<O extends AdditionalMapProps = {}> = {
  fileName: string,
  path: string,
  imports: ImportsMap<O>,
  exports: Declaration<any>[],
} & Declaration<DeclarationKind.SOURCE_FILE>;
