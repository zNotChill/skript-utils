
export function log(content: string, from: string) {
  console.log(`[${from}] ${content}`);
}

export function getRelativeProjectPath(import_meta: ImportMeta) {
  let rootDir;
  if (import_meta.dirname) {
    const split = import_meta.dirname.split("\\");
    rootDir = split[split.length - 1];
  }

  let path;
  if (import_meta.url.startsWith("file:///")) {
    const split = import_meta.url.split("/");
    path = split[split.length - 1];
  }
  
  return `${rootDir}\\${path}`;
}