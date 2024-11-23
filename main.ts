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

  public getMarkdownDocs(): string[] {
    const markdown: string[] = [];

    markdown.push("# Skript Docs");
    markdown.push(...[
      "> [!INFO]",
      "> This file was automatically generated and should not be edited manually.",
      "> This file can be generated using `skutils update-docs-md`."
    ])

    this.functionDocs.forEach((doc) => {
      markdown.push(`## ${doc.name}`);
      markdown.push(doc.description);

      markdown.push("### Authors");
      doc.authors?.forEach((author) => {
        markdown.push(`- ${author}`);
      });

      markdown.push("### Parameters");
      doc.parameters.forEach((param) => {
        markdown.push(`- **${param.unchangedName}** (${param.type})${param.defaultValue ? `: ${param.defaultValue}` : ""} - ${param.description}`);
      });

      markdown.push("### Returns");
      markdown.push(`- ${doc.returns ? `**${doc.returns.type}** - ${doc.returns.description}` : "No return value."}`);

      if (doc.dependencies.length > 0) {
        markdown.push("### Dependencies (skript-reflect)");
        markdown.push("*Dependencies can be ignored if you are using the auto packager since this is done automatically.*");
        doc.dependencies.forEach((dep) => {
          markdown.push(`- ${dep.class}`);
        });
      } else {
        markdown.push("### Dependencies (skript-reflect)");
        markdown.push("No dependencies.");
      }

      markdown.push("### Example");
      markdown.push(`\`\`\`vb
${doc.example ? `${doc.example.function}
  # -> ${doc.example.returnedExample}`.replace(/^ {8}/gm, "") : "No example provided."}
\`\`\``);
    });

    return markdown;
  }
}

const main = new Main();
export default main;