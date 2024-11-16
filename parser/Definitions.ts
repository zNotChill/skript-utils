import main from "../main.ts";
import { FunctionType } from "../utils/classes/Functions.ts";
import { getUtilsPath } from "../utils/Scripts.ts";
import { parseFunctions } from "./FunctionParse.ts";

export async function loadAllDefinitions(): Promise<FunctionType[]> {
  main.setDefs([]);
  for await (const entry of Deno.readDir(getUtilsPath())) {
    if (entry.isFile) {
      if(!entry.name.endsWith(".sk")) {
        continue;
      }
      
      const content = await Deno.readTextFile(`${getUtilsPath()}/${entry.name}`);
      const funcs = await parseFunctions(content, entry.name);
      main.getDefs().push(...funcs);
    }
  }

  const defs = main.getDefs();
  return defs;
}