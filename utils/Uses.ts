import { Config } from "../main.ts";
import { FunctionType } from "./classes/Functions.ts";

export interface UseInfo {
  use: FunctionType;
  line: number;
  char: number;
}

export function findUses(content: string, definitions: FunctionType[]): UseInfo[] {
  const uses: UseInfo[] = [];
  const lines = content.split("\n");

  // console.log("Definitions:", definitions.map(def => def.unchangedName));

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const lineContent = lines[lineIndex];

    if (lineContent.trim().startsWith(Config.commentChar)) {
      continue;
    }

    if (lineContent.trim().startsWith("function")) {
      continue;
    }

    // console.log(`Processing line ${lineIndex + 1}: ${lineContent}`);

    for (const definition of definitions) {
      const regex = new RegExp(`\\b${definition.unchangedName}\\b`, 'g');
      let match;
      while ((match = regex.exec(lineContent)) !== null) {
        uses.push({
          use: definition,
          line: lineIndex + 1,
          char: match.index + 1,
        });

        // console.log(`Matched ${definition.unchangedName} at line ${lineIndex + 1}, char ${match.index + 1}`);
      }
    }
  }

  return uses;
}