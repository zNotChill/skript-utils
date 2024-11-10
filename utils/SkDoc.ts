
import { DocParam, SkriptDoc } from "./classes/SkriptDocs.ts";

export function parseSkriptDocs(content: string): SkriptDoc[] {
  const docs: SkriptDoc[] = [];
  const blocks = content.split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.split("\n");
    const skriptDoc: Partial<SkriptDoc> = {
      parameters: [],
      dependencies: [],
    };

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (!trimmedLine.startsWith("#")) {
        if (trimmedLine.length > 0) {
          // stop parsing if an uncommented line is found
          break;
        }
        continue;
      }

      const contentLine = trimmedLine.slice(1).trim(); // remove the "#"

      if (contentLine.startsWith("@name")) {
        skriptDoc.name = contentLine.replace("@name", "").trim();
      } else if (contentLine.startsWith("@description")) {
        skriptDoc.description = contentLine.replace("@description", "").trim();
      } else if (contentLine.startsWith("@param")) {
        const paramMatch = contentLine.match(/@param\s*{(\w+)}\s+(\w+)\s*(\[[^\]]*\])?\s*-\s*(.*)/);
        if (paramMatch) {
          const [, type, unchangedName, defaultValue, description] = paramMatch;

          let defaultVal = defaultValue;
          if (defaultValue) {
            defaultVal = defaultValue.slice(1, -1);
            defaultVal = defaultVal.replace(/"/g, "");
            defaultVal = defaultVal.replace(/'/g, "");
          }

          const param: DocParam = {
            unchangedName,
            type,
            defaultValue: defaultVal,
            description,
          };
          skriptDoc.parameters!.push(param);
        }
      } else if (contentLine.startsWith("@returns")) {
        const returnMatch = contentLine.match(/@returns\s+\{(\w+)\}\s+-\s+(.+)/);
        if (returnMatch) {
          const [, type, description] = returnMatch;
          skriptDoc.returns = { type, description };
        }
      } else if (contentLine.startsWith("@dependencies")) {
        const dependencies = contentLine.replace("@dependencies:", "").trim().split(",").map(dep => dep.trim());
        skriptDoc.dependencies = dependencies.map(dep => ({ class: dep }));
      }
    }

    if (skriptDoc.name && skriptDoc.description && skriptDoc.returns && skriptDoc.parameters && skriptDoc.dependencies) {
      docs.push(skriptDoc as SkriptDoc);
    }
  }

  return docs;
}