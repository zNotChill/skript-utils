import { findUses, UseInfo } from './utils/Uses.ts';
import { parseFunctions } from './utils/FunctionParse.ts';
import { parseImports } from './utils/ImportParse.ts';
import { FunctionType, Registry } from "./utils/classes/Functions.ts";
import { Import } from "./utils/classes/Imports.ts";
import { filterUseList } from "./utils/ListUtils.ts";
import { filterFunctionList } from "./utils/ListUtils.ts";
import Config from "./Config.ts";

let defs: FunctionType[] = [];
const imports: Import[] = [];

async function loadAllDefinitions() {
  defs = [];
  for await (const entry of Deno.readDir("script-utils")) {
    if (entry.isFile) {
      const content = await Deno.readTextFile(`script-utils/${entry.name}`);
      const funcs = await parseFunctions(content, entry.name);
      defs.push(...funcs);
    }
  }
}

const requiredFunctions: FunctionType[] = [];

async function parseFile(filepath: string): Promise<FunctionType[]> {
  const data = await Deno.readFile(filepath);
  const content = new TextDecoder().decode(data);

  return parseContent(content);
}

async function parseContent(content: string): Promise<FunctionType[]> {
  const registry: Registry = {
    functions: [],
    functionCalls: [],
    dependencies: [],
  }
  
  const functions = parseFunctions(content, "");
  const uses = await findUses(content, Object.values(defs).flat());
  
  registry['functions'] = functions;
  registry['functionCalls'] = filterUseList(uses);

  const required: FunctionType[] = [];
  
  for (const func of registry.functionCalls) {
    const found = defs.find((def) => def.unchangedName === func.use.unchangedName);
    if (found) {
      console.log(`Found function ${found.unchangedName}, scanning for dependencies...`);

      // if it has already been found, skip it
      if (requiredFunctions.find((r) => r.unchangedName === found.unchangedName)) {
        continue;
      }

      parseContent(found.functionContent).then((required) => {
        if (required.length === 0) {
          console.log(`No dependencies found for ${found.unchangedName}`);
          return;
        }
        console.log(`Found ${required.length} dependencies for ${found.unchangedName}`);
        
        requiredFunctions.push(...required);
      });
      
      required.push(found);
    }

    if (func.use.classDependencies) {
      func.use.classDependencies.forEach((dep) => {
        if (!imports.find((imp) => imp.class === dep.class)) {
          imports.push(dep);
        }
      });
    }
  }

  
  return required;
}

async function parseAllFiles() {
  await parseFile("test.sk").then((required) => {
    requiredFunctions.push(...required);
  });
}


function packageFunctions(): string {
  const uniqueFunctions = filterFunctionList(requiredFunctions);
  const packagedContent = [];

  if (imports.length > 0) {
    packagedContent.push("import:");
    for (const imp of imports) {
      packagedContent.push(`${Config.indent}${imp.class}`);
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
      // line = line.replace(/\t/g, Config.indent);
      line = line.replace(/ {2,}/g, match => Config.indent.repeat(match.length / 2));
      line = line.replace(/\t/g, Config.indent);
      return `${Config.indent}${line}`;
    });

    packagedContent.push(...content);
  }

  const finalContent = packagedContent.join("\n");
  return finalContent;
}

(async () => {
  await loadAllDefinitions();
  await parseAllFiles().then(() => {
    const packagedContent = packageFunctions();
    
    Deno.writeFile("output.sk", new TextEncoder().encode(packagedContent));
  });
})();