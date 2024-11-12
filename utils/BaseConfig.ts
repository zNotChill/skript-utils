
export const BaseConfig: Config = {
  commentChar: "#",
  indentChar: "SPACE",
  indentSize: 2,
  codeDir: "./",
  outputDir: "Utils",
  outputFileName: "Utils.sk",
  excludeFiles: [],
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
  excludeFiles: string[],
  parser: {
    removeComments: boolean,
  }
}