import main from "../main.ts";
import { FunctionType } from "./classes/Functions.ts";

export interface UseInfo {
  use: FunctionType;
  line: number;
  char: number;
}

export function findUses(content: string, definitions: FunctionType[]): UseInfo[] {
  const uses: UseInfo[] = [];
  const lines = content.split("\n");

  let lineCount = 0;

  lines.forEach((line: string) => {
    lineCount += 1;
    
    if (line.trim().startsWith(main.getConfig().commentChar)) return;
    if (line.trim().startsWith("function")) return;

    definitions.forEach((def: FunctionType) => {
      if (line.includes(def.unchangedName)) {
        const char = line.indexOf(def.unchangedName);
        uses.push({
          use: def,
          line: lineCount,
          char: char,
        });
      }
    });
  });

  return uses;
}