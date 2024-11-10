import { UseInfo } from "./Uses.ts";
import { FunctionType } from "./classes/Functions.ts";

export function filterUseList(uses: UseInfo[]): UseInfo[] {
  return uses.filter((use: UseInfo, index: number) => {
    return uses.findIndex((u: UseInfo) => u.use === use.use) === index;
  })
}

export function filterFunctionList(functions: FunctionType[]): FunctionType[] {
  return functions.filter((func: FunctionType, index: number) => {
    return functions.findIndex((f: FunctionType) => f.unchangedName === func.unchangedName) === index;
  })
}