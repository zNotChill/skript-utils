
import { Import } from "./Imports.ts";

export type SkriptDoc = {
  name: string,
  description: string,
  parameters: DocParam[],
  returns: DocReturn,
  dependencies: Import[],
  author: string,
  example: DocExample,
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

export type DocExample = {
  function: string,
  returnedExample: string,
}

export type DocDependency = Import