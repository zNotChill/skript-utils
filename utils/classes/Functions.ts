import { UseInfo } from '../Uses.ts';

export type VariableType = {
  isParameter: boolean,
  unchangedName: string,
  type?: string,
  defaultValue?: string,
}

export type FunctionType = {
  unchangedName: string,
  parameters: VariableType[],
  returnType: string,
  indentLevel: number,
  highestLine: number,
  lowestLine: number,
  functionContent: string,
  filePath: string,
}

export type FunctionCallType = {
  functionName: string,
  parameters: VariableType[],
}

export type Registry = {
  functions: FunctionType[],
  functionCalls: UseInfo[],
  dependencies: FunctionType[],
  requiredFunctions: FunctionType[],
}