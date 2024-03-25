import {AdditionalMapProps} from "../common";

export type ImportsMapElement<O extends AdditionalMapProps = {}> = {
  name: string
  module: string
  resolvedModulePath: string
  convertedModulePath?: string
} & O

export type ImportsMap<O extends AdditionalMapProps = {}> = ImportsMapElement<O>[]
