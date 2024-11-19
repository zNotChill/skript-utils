import path from "node:path";

export async function copyUtilsToAppData(from: string) {
  const appData = Deno.env.get("APPDATA");
  if (!appData) {
    throw new Error("APPDATA environment variable not found.");
  }

  const utilsPath = path.join(appData, "skutils", "utils");
  const utilsExists = await Deno.stat(utilsPath).catch(() => null);

  if (!utilsExists) {
    await Deno.mkdir(utilsPath, { recursive: true });
  }

  const utilsFiles = await Deno.readDir(from.toString());
  for await (const file of utilsFiles) {
    if (file.isFile) {
      await Deno.copyFile(path.join(from.toString(), file.name), path.join(utilsPath, file.name));
    }
  }
}

export function getUtilsPath() {
  const appData = Deno.env.get("APPDATA");
  if (!appData) {
    throw new Error("APPDATA environment variable not found.");
  }

  return path.join(appData, "skutils", "utils");
}

export async function writeStoredDocs(docs: string) {
  const appData = Deno.env.get("APPDATA");
  if (!appData) {
    throw new Error("APPDATA environment variable not found.");
  }

  const docsPath = path.join(appData, "skutils");
  const docsExists = await Deno.stat(docsPath).catch(() => null);

  if (!docsExists) {
    await Deno.mkdir(docsPath, { recursive: true });
  }

  await Deno.writeTextFile(path.join(docsPath, "docs.json"), docs);
}