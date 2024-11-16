import { FunctionType } from "./utils/classes/Functions.ts";
import { Import } from "./utils/classes/Imports.ts";
import type { Config as ConfigType } from "./utils/BaseConfig.ts";
import { BaseConfig } from "./utils/BaseConfig.ts";
import { SkriptDoc } from "./utils/classes/SkriptDocs.ts";
import { loadAllDocs, parseSkriptDocs } from "./parser/SkDoc.ts";
import { loadAllDefinitions } from "./parser/Definitions.ts";
import { parseAllFiles, parseContent, parseFile, recursiveParse } from "./parser/FileParser.ts";
import { packageFunctions } from "./parser/Packager.ts";

class Main {
  public config: ConfigType = BaseConfig;
  private imports: Import[] = [];
  private defs: FunctionType[] = [];
  private functionDocs: SkriptDoc[] = [];
  private requiredFunctions: FunctionType[] = [];
  public indent: string;
  public parsedFiles: string[] = [];

  constructor() {
    this.setConfig(this.config);
    this.indent = "";
  }

  public setConfig(config: ConfigType) {
    this.config = config;
    if (this.config.codeDir === "./") {
      this.config.codeDir = Deno.cwd();
    }
    if (this.config.indentChar === "SPACE") {
      this.indent = " ".repeat(this.config.indentSize);
    } else {
      this.indent = "\t".repeat(this.config.indentSize);
    }
  }

  public async loadAllDefinitions() {
    return await loadAllDefinitions();
  }

  public async parseAllFiles(): Promise<string[]> {
    return await parseAllFiles();
  }

  public async parseFile(filepath: string, relativePath: string) {
    return await parseFile(filepath, relativePath);
  }

  public async parseContent(content: string, relativePath: string) {
    return await parseContent(content, relativePath);
  }

  public packageFunctions() {
    return packageFunctions();
  }

  public setDefs(newDefs: FunctionType[]) {
    this.defs = newDefs;
  }

  public setImports(newImports: Import[]) {
    this.imports = newImports;
  }

  public setFunctionDocs(newDocs: SkriptDoc[]) {
    this.functionDocs = newDocs;
  }

  public setRequiredFunctions(newRequired: FunctionType[]) {
    this.requiredFunctions = newRequired;
  }

  public getDefs() {
    return this.defs;
  }

  public getImports() {
    return this.imports;
  }

  public getFunctionDocs() {
    return this.functionDocs;
  }

  public getRequiredFunctions() {
    return this.requiredFunctions;
  }

  public getConfig() {
    return this.config;
  }

  public async recursiveParse(filepath: string) {
    return await recursiveParse(filepath);
  }

  public async parseSkriptDocs(content: string) {
    return await parseSkriptDocs(content);
  }

  public async loadAllDocs() {
    return await loadAllDocs();
  }
}

const main = new Main();
export default main;