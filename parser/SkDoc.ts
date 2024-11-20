
import main from "../main.ts";
import { DocParam, SkriptDoc } from "../utils/classes/SkriptDocs.ts";
import { getUtilsPath } from "../utils/Scripts.ts";

export async function loadAllDocs(): Promise<SkriptDoc[]> {
  main.setFunctionDocs([]);
  for await (const entry of Deno.readDir(getUtilsPath())) {
    if (entry.isFile) {
      if(!entry.name.endsWith(".sk")) {
        continue;
      }
      
      const content = await Deno.readTextFile(`${getUtilsPath()}/${entry.name}`);
      const docs = parseSkriptDocs(content);
      main.getFunctionDocs().push(...docs);
    }
  }

  return main.getFunctionDocs();
}

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
      const firstWord = contentLine.split(" ")[0].replace(":", "");

      switch (firstWord) {
        case "@name":
          skriptDoc.name = contentLine.replace("@name", "").trim();
          break;
        case "@description":
          // If it already has a registered description, treat it as a multi-line description
          if (skriptDoc.description) {
            skriptDoc.description += "\n" + contentLine.replace("@description", "").trim();
          } else {
            skriptDoc.description = contentLine.replace("@description", "").trim();
          }
          break;
        case "@param": {
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
          break;
        }
        case "@returns": {
          const returnMatch = contentLine.match(/@returns\s+\{(\w+)\}\s+-\s+(.+)/);
          if (returnMatch) {
            const [, type, description] = returnMatch;
            skriptDoc.returns = { type, description };
          }
          break;
        }
        case "@dependencies": {
          const dependencies = contentLine.replace("@dependencies", "").trim().split(",").map(dep => dep.trim());
          
          skriptDoc.dependencies = dependencies.map(dep => ({ class: dep }));
          break;
        }
        case "@authors": {
          const author = contentLine.replace("@authors", "").trim();
          const authors = author.split("&").map(a => a.trim());
          skriptDoc.authors = authors;
          break;
        }
        case "@example": {
          const example = contentLine.replace("@example", "").trim();
          const [functionName, returnedExample] = example.split("->").map(e => e.trim());

          skriptDoc.example = {
            function: functionName,
            returnedExample,
          };

          break
        }
        default:
          break;
      }
    }

    if (skriptDoc.name && skriptDoc.description) {
      docs.push(skriptDoc as SkriptDoc);
    }
  }

  return docs;
}