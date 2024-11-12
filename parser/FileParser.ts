import { FunctionType, Registry } from "../utils/classes/Functions.ts";
import { findUses } from "../utils/Uses.ts";
import { parseFunctions } from "./FunctionParse.ts";
import main from "../main.ts";
import { filterUseList } from "../utils/ListUtils.ts";
import { Import } from "../utils/classes/Imports.ts";

export async function parseContent(content: string): Promise<FunctionType[]> {
  const registry: Registry = {
    functions: [],
    functionCalls: [],
    dependencies: [],
  }
  
  const functions = parseFunctions(content, "");
  
  let uses = await findUses(content, Object.values(main.getDefs()).flat());
  
  if (content.startsWith("# skript-utils import all")) {
    uses = Object.values(main.getDefs()).flat().map((def) => {
      return {
        use: def,
        line: 1230,
        char: 0,
      }
    });
  }
  registry['functions'] = functions;
  registry['functionCalls'] = filterUseList(uses);

  const required: FunctionType[] = [];
  
  for (const func of registry.functionCalls) {
    const found = main.getDefs().find((def) => def.unchangedName === func.use.unchangedName);
    if (found) {
      // console.log(`Found function ${found.unchangedName}, scanning for dependencies...`);

      // if it has already been found, skip it
      if (main.getRequiredFunctions().find((r) => r.unchangedName === found.unchangedName)) {
        continue;
      }

      parseContent(found.functionContent).then((required) => {
        if (required.length === 0) {
          // console.log(`No dependencies found for ${found.unchangedName}`);
          return;
        }
        // console.log(`Found ${required.length} dependencies for ${found.unchangedName}`);
        
        main.getRequiredFunctions().push(...required);
      });
      
      required.push(found);
    }

    const classDependencies: Import[] = main.getFunctionDocs().find((doc) => doc.name === func.use.unchangedName)?.dependencies || [];
    if (classDependencies.length > 0) {
      classDependencies.forEach((dep: Import) => {
        if (!main.getImports().find((imp) => imp.class === dep.class)) {
          main.getImports().push(dep);
        }
      });
    }
  }

  
  return required;
}

export async function recursiveParse(filepath: string) {
  const data = await Deno.readDirSync(filepath);
  for await (const entry of data) {
    if (entry.isFile && entry.name.endsWith(".sk")) {
      await parseFile(`${filepath}/${entry.name}`).then((required) => {
        if (required.length > 0) {
          main.getRequiredFunctions().push(...required);
        }
      });
    } else if (entry.isDirectory) {
      await recursiveParse(`${filepath}/${entry.name}`);
    }
  }
}

export async function parseAllFiles() {
  main.getRequiredFunctions().length = 0;
  await recursiveParse(main.config.codeDir);
}

export async function parseFile(filepath: string): Promise<FunctionType[]> {
  const data = await Deno.readFile(filepath);
  const content = new TextDecoder().decode(data);

  return parseContent(content);
}