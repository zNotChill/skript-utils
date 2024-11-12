
import { Config } from "../main.ts";
import { VariableType } from "./classes/Functions.ts";
import { FunctionType } from "./classes/Functions.ts";
import { Import } from "./classes/Imports.ts";

export function parseFunctions(content: string, filePath: string): FunctionType[] {
  const registry: FunctionType[] = [];
  const lines = content.split("\n");

  // remove empty lines and comments
  const filteredLines = lines.filter(line => !(line.trim().startsWith("//") || line.trim().length === 0));

  let lineCount = 0;
  filteredLines.forEach((line: string) => {
    lineCount++;
    if (line.trim().startsWith("function")) {
      
      // Get basic function information
      const functionName = line.split(" ")[1].split("(")[0];
      
      // Check if the line above starts with "# Dependencies"
      let classDependencies: Import[] = [];
      try {
        const previousLine = filteredLines[lineCount - 2];
        if (previousLine.trim().startsWith("# Dependencies")) {
          const dependencies = previousLine.split(":")[1].split(",");
          classDependencies = dependencies.map((dep: string) => {
            return {
              class: dep.trim(),
            }
          });
        }
      } catch (error) {
        // do nothing
        error
      }

      const registryItem: FunctionType = {
        unchangedName: functionName,
        parameters: [],
        returnType: "",
        indentLevel: 0,
        highestLine: lineCount,
        lowestLine: -1,
        functionContent: "",
        filePath: filePath,
      }

      // Get function parameters
      const parameters: VariableType[] = [];

      try {
        line.split("(")[1].split(")")[0].split(",")
      } catch (error) {}
      
      line.split("(")[1].split(")")[0].split(",")
        .forEach((value: string) => {
          if (!value.trim()) {
            return;
          }
          const split = value.split(":");
          const paramName = split[0].trim();
          const paramTypeAndDefault = split[1].split("=").map(s => s.trim());
          const paramType = paramTypeAndDefault[0];
          const defaultValue = paramTypeAndDefault[1] || null;

          const paramData: VariableType = {
            isParameter: true,
            unchangedName: paramName,
            type: paramType,
          }

          if (defaultValue) {
            paramData.defaultValue = defaultValue;
          }

          parameters.push(paramData);
        });

      // Get all the lines at the minimum indent level for the function
      // below the function definition and their content
      let functionContent = "";
      let foundContent = false;

      let currentLine = lineCount;
      let highestLine = lineCount;
      const lowestLine = lineCount;

      let firstLineIndentLevel = 0;
      let isOnFirstLine = false;

      while (!foundContent && currentLine < filteredLines.length) {
        currentLine++;

        if (isOnFirstLine === false) {
          firstLineIndentLevel = filteredLines[currentLine - 1].search(/\S|$/);
          isOnFirstLine = true;
        }

        const currentLineContent = filteredLines[currentLine - 1];
        if (!currentLineContent) {
          break;
        }
        const currentLineIndentLevel = currentLineContent.search(/\S|$/);

        // indentType is either a tab or a space
        const indentType = currentLineContent.includes("\t") ? "\t" : " ";
        // const indentTypeAsText = indentType === "\t" ? "tab" : "space";

        if (currentLineIndentLevel < firstLineIndentLevel) {
          foundContent = true;
        } else {
          let lineContent = currentLineContent;

          if (Config.parser.removeComments) {
            lineContent = lineContent.split("\n").map((line) => {
              const isSkDocLine = line.startsWith("#@") || line.startsWith("# @");
              const startsWithHash = line.trim().startsWith("#");
              const containsDoubleHash = line.includes("##");
              const containsSingleHashMidLine = line.includes("#") && !line.trim().startsWith("#") && !containsDoubleHash;
            
              if (isSkDocLine || startsWithHash) {
                return "";
              }

              if (containsDoubleHash) {
                // TODO: make this work since comments arent removed from lines with double hashes
                return line;
              }
            
              if (containsSingleHashMidLine) {
                return line.split("#")[0];
              }
            
              return line;
            }).join("\n");
          }

          lineContent = lineContent.replace(indentType.repeat(2), "");
            
          functionContent += lineContent + "\n";
        }

        highestLine = currentLine;
      }

      registryItem.functionContent = functionContent.trim();
      registryItem.highestLine = highestLine;
      registryItem.lowestLine = lowestLine;

      // Get function return type (if exists)
      let returnType = "";
      if (line.includes("::")) {
        returnType = line.split("::")[1].trim().replace(":", "");
      }
      registryItem.returnType = returnType;

      // Add function to registry
      registryItem.parameters = parameters;
      if (!registry.find((func: FunctionType) => func.unchangedName === functionName)) {
        registry.push(registryItem);
      }
    }
  });

  return registry;
}