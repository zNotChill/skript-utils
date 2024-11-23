#!/usr/bin/env deno run --allow-read --allow-write --allow-env

import * as cliffy from "https://deno.land/x/cliffy@v0.25.7/mod.ts";
import ora from "npm:ora@8.1.1";
import type { Config as ConfigType } from "./utils/BaseConfig.ts";
import { BaseConfig } from "./utils/BaseConfig.ts";
import { copyUtilsToAppData, writeStoredDocs } from "./utils/Scripts.ts";
import { SharedConstants } from "./utils/SharedConstants.ts";
import main from "./main.ts";

const workspace = Deno.cwd();
const configPath = workspace + "/skript-utils.json";

async function doesConfigExist() {
  try {
    await Deno.stat(configPath);
    return true;
  } catch {
    return false;
  }
}

async function getConfig() {
  return JSON.parse(await Deno.readTextFile(configPath)) as ConfigType;
}

const watch = new cliffy.Command()
  .description("Watch for changes in your workspace")
  .action(() => {
    watchWorkspace();
    watchUtilsDirectory();
  });
const updateData = new cliffy.Command()
  .description("Update your stored data (docs, util files)")
  .action(() => {
    updateStoredData();
  });
const updateDocsMarkdown = new cliffy.Command()
  .description("Update the markdown docs")
  .action(() => {
    ora("Loading documentation...").info();
    updateStoredData().then(() => {
      Deno.writeFileSync(
        "./DOCS.md",
        new TextEncoder().encode(main.getMarkdownDocs().join("\n"))
      );
  
      ora("DOCS.md updated.").succeed();
    })
  });

const { options } = await new cliffy.Command()
  .name("skript-utils")
  .version("0.1.0")
  .description("CLI for managing your Skript Utils workspace")
  .option("--init", "Initialize your workspace")
    .command("watch", watch)
    .command("update-data", updateData)
    .command("update-docs-md", updateDocsMarkdown)
    .parse(Deno.args);

if (options.init) {
  const configExists = await doesConfigExist();

  if (configExists) {
    ora("Workspace already initialized.").fail();
    Deno.exit(1);
  }

  // create config
  const config: ConfigType = BaseConfig;

  const spinner = ora("Initializing workspace...").start();

  await Deno.writeTextFile(configPath, JSON.stringify(config, null, 2));

  setTimeout(() => {
    spinner.succeed("Workspace initialized.");
  }, 1000);
}

async function watchWorkspace() {
  if (!await doesConfigExist()) {
    ora("Workspace not initialized. Run `skutils --init` first.").fail();
    Deno.exit(1);
  }

  let config = await getConfig();

  main.setConfig(config);

  const watcher = Deno.watchFs(workspace);
  const changeSpinner = ora("[WORKSPACE] Watching for changes in " + workspace).start();

  let debounceTimeout: number | undefined;

  for await (const event of watcher) {
    if (event.paths[0].endsWith("skript-utils.json")) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      debounceTimeout = setTimeout(async () => {
        const configReload = ora("[CONFIG] Detected change in skript-utils.json. Reloading config and repackaging.").start();
        await repackage();
        
        config = await getConfig();
        main.setConfig(config);

        configReload.succeed();
        changeSpinner.start();
      }, 100);

      continue;
    }

    if (!event.paths[0].endsWith(".sk")) {
      continue;
    }

    if (event.paths[0].endsWith(`${config.outputFileName}`)) {
      continue;
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(async () => {
      changeSpinner.stop();

      const spinner = ora("[WORKSPACE] Detected change in " + event.paths[0] + ". Repacking.").start();
      spinner.succeed();
      changeSpinner.start();
      await repackage();
    }, 100);
  }
}

async function repackage(from: string = "workspace") {
  let prefix = "[WORKSPACE] ";
  if (from === "utils") {
    prefix = "[UTILS] ";
  }
  await copyUtilsToAppData(import.meta.dirname + `/${SharedConstants.utilsDir}` || Deno.cwd());
  
  const config = main.getConfig();

  main.setDefs([]);
  main.setImports([]);
  const docs = await main.loadAllDocs();
  const defs = await main.loadAllDefinitions();

  if (docs && defs) {
    await writeStoredDocs(
      JSON.stringify(
        main.getFunctionDocs(),
        null,
        2
      )
    )

    ora(`${prefix}Loaded ${docs.length} docs and ${defs.length} definitions..`).succeed();
    main.parseAllFiles().then((files) => {
      const relativeFiles = files.map((file) => file.replace(workspace + "/", ""));
      ora(`${prefix}Parsed ${relativeFiles.length} files.`).info();
      
      const packagedContent = main.packageFunctions();
      
      Deno.mkdir(workspace + "/" + config.outputDir, { recursive: true });
      const savePath = workspace + "/" + config.outputDir + "/" + config.outputFileName;
      
      Deno.writeTextFile(savePath, packagedContent);
      ora(`${prefix}Packed functions to ${savePath}`).succeed();
    });
  }
}

async function updateStoredData() {
  const spinner = ora("Updating stored data...").start();

  main.setDefs([]);
  main.setImports([]);
  await main.loadAllDocs();
  await main.loadAllDefinitions();

  await copyUtilsToAppData(import.meta.dirname + `/${SharedConstants.utilsDir}` || Deno.cwd());
  await writeStoredDocs(
    JSON.stringify(
      main.getFunctionDocs(),
      null,
      2
    )
  );

  spinner.succeed("Stored data updated.");

  return true;
}

async function watchUtilsDirectory() {
  const watcher = Deno.watchFs(import.meta.dirname + `/${SharedConstants.utilsDir}` || Deno.cwd());
  ora("[UTILS] Watching for changes in utils directory...").succeed();

  // cooldown to prevent multiple events from firing
  let debounceTimeout: number | undefined;

  for await (const _event of watcher) {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(async () => {
      ora("[UTILS] Detected change in utils directory. Repacking.").succeed();
      await repackage("utils");
    }, 100);
  }
}