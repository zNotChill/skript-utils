
export type Config = {
  commentChar: string,
  indentChar: "SPACE" | "TAB",
  indentSize: number,
  codeDir: string,
  outputDir: string,
  outputFileName: string,
  excludeFiles: string[],
}