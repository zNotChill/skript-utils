
export const BaseConfig: Config = {
  commentChar: "#",
  indentChar: "SPACE",
  indentSize: 2,
  codeDir: "./",
  outputDir: "Utils",
  outputFileName: "Utils.sk",
  ignoredFiles: [], 
  ignoredDirectories: [
    "node_modules",
    ".git",
    ".vscode",
  ],
  parser: {
    removeComments: true,
  }
}

export type Config = {
  commentChar: string,
  indentChar: "SPACE" | "TAB",
  indentSize: number,
  codeDir: string,
  outputDir: string,
  outputFileName: string,
  ignoredFiles: string[],
  ignoredDirectories: string[],
  parser: {
    removeComments: boolean,
  }
}