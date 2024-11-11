import { findUses } from './utils/Uses.ts';
import { parseFunctions } from './utils/FunctionParse.ts';
import { FunctionType, Registry } from "./utils/classes/Functions.ts";
import { Import } from "./utils/classes/Imports.ts";
import { filterUseList } from "./utils/ListUtils.ts";
import { filterFunctionList } from "./utils/ListUtils.ts";
import type { Config as ConfigType } from "./utils/classes/Config.ts";
import { BaseConfig } from "./utils/BaseConfig.ts";
import { getUtilsPath } from "./utils/Scripts.ts";
import { SkriptDoc } from "./utils/classes/SkriptDocs.ts";
import { parseSkriptDocs } from "./utils/SkDoc.ts";

export let defs: FunctionType[] = [];
export let imports: Import[] = [];
export let functionDocs: SkriptDoc[] = [];
imports = []; // shut up deno please

export let Config: ConfigType = BaseConfig;

if (Config.codeDir === "./") {
  Config.codeDir = Deno.cwd();
}

let indent: string;
const utilsDir = getUtilsPath();

export function setConfig(config: ConfigType) {
  Config = config;
  if (Config.indentChar === "SPACE") {
    indent = " ".repeat(Config.indentSize);
  } else {
    indent = "\t";
  }
}

export function setDefs(newDefs: FunctionType[]) {
  defs = newDefs;
}

export function setImports(newImports: Import[]) {
  imports = newImports;
}

export function setFunctionDocs(newDocs: SkriptDoc[]) {
  functionDocs = newDocs;
}

export async function loadAllDefinitions() {
  defs = [];
  for await (const entry of Deno.readDir(utilsDir)) {
    if (entry.isFile) {
      if(!entry.name.endsWith(".sk")) {
        continue;
      }
      
      const content = await Deno.readTextFile(`${utilsDir}/${entry.name}`);
      const funcs = await parseFunctions(content, entry.name);
      defs.push(...funcs);
    }
  }
}

const requiredFunctions: FunctionType[] = [];

export async function parseFile(filepath: string): Promise<FunctionType[]> {
  const data = await Deno.readFile(filepath);
  let content = new TextDecoder().decode(data);

  return parseContent(content);
}

export async function parseContent(content: string): Promise<FunctionType[]> {
  const registry: Registry = {
    functions: [],
    functionCalls: [],
    dependencies: [],
  }
  
  const functions = parseFunctions(content, "");
  const uses = await findUses(content, Object.values(defs).flat());
  const docs = parseSkriptDocs(content);

  if (docs.length > 0) {
    console.log(docs);
  }

  functionDocs.push(...docs);
  registry['functions'] = functions;
  registry['functionCalls'] = filterUseList(uses);

  const required: FunctionType[] = [];
  
  for (const func of registry.functionCalls) {
    const found = defs.find((def) => def.unchangedName === func.use.unchangedName);
    if (found) {
      // console.log(`Found function ${found.unchangedName}, scanning for dependencies...`);

      // if it has already been found, skip it
      if (requiredFunctions.find((r) => r.unchangedName === found.unchangedName)) {
        continue;
      }

      parseContent(found.functionContent).then((required) => {
        if (required.length === 0) {
          // console.log(`No dependencies found for ${found.unchangedName}`);
          return;
        }
        // console.log(`Found ${required.length} dependencies for ${found.unchangedName}`);
        
        requiredFunctions.push(...required);
      });
      
      required.push(found);
    }

    const classDependencies: Import[] = functionDocs.find((doc) => doc.name === func.use.unchangedName)?.dependencies || [];
    if (classDependencies.length > 0) {
      classDependencies.forEach((dep: Import) => {
        if (!imports.find((imp) => imp.class === dep.class)) {
          imports.push(dep);
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
          requiredFunctions.push(...required);
        }
      });
    } else if (entry.isDirectory) {
      await recursiveParse(`${filepath}/${entry.name}`);
    }
  }
}

export async function parseAllFiles() {
  requiredFunctions.length = 0;
  await recursiveParse(Config.codeDir);
}

export function packageFunctions(): string {
  const uniqueFunctions = filterFunctionList(requiredFunctions);
  const packagedContent = [];

  if (imports.length > 0) {
    packagedContent.push("import:");
    for (const imp of imports) {
      packagedContent.push(`${indent}${imp.class}`);
    } 
  }

  for (const func of uniqueFunctions) {
    const parameterString = func.parameters.map((param) => {
      return `${param.unchangedName}: ${param.type}${param.defaultValue ? ` = ${param.defaultValue}` : ""}`;
    })

    packagedContent.push(`function ${func.unchangedName}(${parameterString.join(", ")})${func.returnType === "" ? "" : ` :: ${func.returnType}`}:`);
    
    let content = func.functionContent.split("\n");
    content = content.map((line) => {
      // replace all spaces with the indent string and for tabs too
      // line = line.replace(/\t/g, indent);
      line = line.replace(/ {2,}/g, match => indent.repeat(match.length / 2));
      line = line.replace(/\t/g, indent);
      return `${indent}${line}`;
    });

    packagedContent.push(...content);
  }

  const finalContent = packagedContent.join("\n");
  return finalContent;
}