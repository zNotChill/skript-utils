import { Import } from "./classes/Imports.ts";

export function parseImports(content: string): Import[] {
  // import:
  //  java.time.Duration
  //  java.time.Instant
  //  java.time.temporal.ChronoUnit

  // turns into:
  // ["java.time.Duration", "java.time.Instant", "java.time.temporal.ChronoUnit"]

  const imports: Import[] = [];
  const lines = content.split("\n");

  let isImportBlock = false;
  let indentLevel = 0;
  for (const line of lines) {
    // identify the indent level (number of spaces/tabs before the first non-whitespace character)
    const split = line.split("");
    for (let i = 0; i < split.length; i++) {
      if (split[i] !== " " && split[i] !== "\t") {
        indentLevel = i;
        break;
      }
    }
    
    if (line.trim().startsWith("import")) {
      isImportBlock = true;
      continue;
    }

    if (indentLevel === 0) isImportBlock = false;
    if (line.trim().length === 0) continue;

    if (isImportBlock) {
      const importString = line.trim();
      imports.push({
        class: importString,
      });
    }
    
  }

  return imports;
}