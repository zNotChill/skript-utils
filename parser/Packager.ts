
import main from "../main.ts";
import { filterFunctionList } from "../utils/ListUtils.ts";

export function packageFunctions(): string {
  const uniqueFunctions = filterFunctionList(main.getRequiredFunctions());
  const packagedContent = [];

  if (main.getImports().length > 0) {
    packagedContent.push("import:");
    for (const imp of main.getImports()) {
      packagedContent.push(`${main.indent}${imp.class}`);
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
      line = line.replace(/ {2,}/g, match => main.indent.repeat(match.length / 2));
      line = line.replace(/\t/g, main.indent);
      return `${main.indent}${line}`;
    });

    packagedContent.push(...content);
  }

  const finalContent = packagedContent.join("\n");
  return finalContent;
}
