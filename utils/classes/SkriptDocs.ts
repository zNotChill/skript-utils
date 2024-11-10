
import { Import } from "./Imports.ts";

export type SkriptDoc = {
  name: string,
  description: string,
  parameters: DocParam[],
  returns: DocReturn,
  dependencies: Import[],
}

export type DocParam = {
  unchangedName: string,
  type: string,
  defaultValue?: string,
  description: string,
}

export type DocReturn = {
  type: string,
  description: string,
}

export type DocDependency = Import