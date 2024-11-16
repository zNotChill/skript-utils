import { Registry } from "../utils/classes/Functions.ts";
import { findUses } from "../utils/Uses.ts";
import { parseFunctions } from "./FunctionParse.ts";
import main from "../main.ts";
import { filterUseList } from "../utils/ListUtils.ts";
import { Import } from "../utils/classes/Imports.ts";
import { getRelativeProjectPath, log as logFunc } from "../utils/Logger.ts";

function log(message: string) {
  logFunc(message, getRelativeProjectPath(import.meta));
}

const alreadyParsed: string[] = [];

export async function parseContent(content: string, relativePath: string): Promise<Registry> {
  const fileParseHistory: string[] = [];
  
  const registry: Registry = {
    functions: [],
    functionCalls: [],
    dependencies: [],
    requiredFunctions: [],
  }
  
  const functions = parseFunctions(content, "");
  
  let uses = await findUses(content, main.getDefs());
  
  if (content.startsWith("# skript-utils import all")) {
    uses = Object.values(main.getDefs()).flat().map((def) => {
      return {
        use: def,
        line: 1,
        char: 0,
      }
    });
  }
  
  registry['functions'] = functions;
  registry['functionCalls'] = filterUseList(uses);

  fileParseHistory.push(relativePath);

  if (registry.functionCalls.length >= 0 || registry.functions.length >= 0) {
    log(`Found ${registry.functionCalls.length} function calls in ${registry.functions.length} functions in ${relativePath}`);
  }
  const parsePromises = registry.functionCalls.map(async (func) => {
    const found = main.getDefs().find((def) => def.unchangedName === func.use.unchangedName);
    if (found) {
      // if it has already been found, skip it
      if (main.getRequiredFunctions().find((r) => r.unchangedName === found.unchangedName)) {
        return;
      }

      //! If it has already been parsed, skip it to avoid an infinite circular dependency
      if (fileParseHistory.includes(found.filePath)) {
        alreadyParsed.push(found.filePath);
        log(`Skipping ${found.unchangedName} because it has already been parsed`);
        return;
      }

      const reg = await parseContent(found.functionContent, found.filePath);
      if (reg.requiredFunctions.length === 0) {
        log(`No dependencies found for ${found.unchangedName}`);
      } else {
        log(`Found ${reg.requiredFunctions.length} dependencies for ${found.unchangedName}`);
        main.getRequiredFunctions().push(...reg.requiredFunctions);
      }

      registry.requiredFunctions.push(found);
    }

    const classDependencies: Import[] = main.getFunctionDocs().find((doc) => doc.name === func.use.unchangedName)?.dependencies || [];
    if (classDependencies.length > 0) {
      classDependencies.forEach((dep: Import) => {
        if (!main.getImports().find((imp) => imp.class === dep.class)) {
          main.getImports().push(dep);
        }
      });
    }
  });

  await Promise.all(parsePromises);
  return registry;
}

export async function recursiveParse(filepath: string): Promise<string[]> {
  const data = await Deno.readDirSync(filepath);
  const files = [];
  for await (const entry of data) {
    if (entry.isFile && entry.name.endsWith(".sk")) {
      files.push(`${filepath}/${entry.name}`);

      const relativePath = `${filepath}/${entry.name}`.replace(main.config.codeDir, "");

      const parsed = await parseFile(`${filepath}/${entry.name}`, relativePath);

      if (parsed.requiredFunctions.length > 0) {
        main.getRequiredFunctions().push(...parsed.requiredFunctions);
      }

    } else if (entry.isDirectory && !main.config.ignoredDirectories.includes(entry.name)) {
      const recursedFiles = await recursiveParse(`${filepath}/${entry.name}`);
      files.push(...recursedFiles);
    }
  }

  return files;
}

export async function parseAllFiles() {
  main.getRequiredFunctions().length = 0;
  const parsedFiles = await recursiveParse(main.config.codeDir);
  return parsedFiles;
}

export async function parseFile(filepath: string, relativePath: string): Promise<Registry> {
  const data = await Deno.readFile(filepath);
  const content = new TextDecoder().decode(data);

  const parsed = await parseContent(content, relativePath);
  return parsed;
}