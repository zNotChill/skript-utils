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
  });

const { options } = await new cliffy.Command()
  .name("skript-utils")
  .version("0.1.0")
  .description("CLI for managing your Skript Utils workspace")
  .option("--init", "Initialize your workspace")
    .command("watch", watch)
    .parse(Deno.args);

if(!options.init && Deno.args.length === 0) {
  await watchWorkspace();
}

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
  const changeSpinner = ora("Watching for changes in " + workspace).start();

  let debounceTimeout: number | undefined;

  for await (const event of watcher) {
    if (event.paths[0].endsWith("skript-utils.json")) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      debounceTimeout = setTimeout(async () => {
        const configReload = ora("Detected change in skript-utils.json. Reloading config and repackaging.").start();
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
      console.clear();
      changeSpinner.stop();

      
      const spinner = ora("Detected change in " + event.paths[0] + ". Repacking.").start();
      spinner.succeed();
      changeSpinner.start();
      await repackage();
    }, 100);
  }
}

async function repackage() {
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

    console.log(`\nLoaded ${docs.length} docs and ${defs.length} definitions`);
    main.parseAllFiles().then((files) => {
      const relativeFiles = files.map((file) => file.replace(workspace + "/", ""));
      console.log("\nParsed files:", relativeFiles.join(", "));
      
      const packagedContent = main.packageFunctions();
      
      Deno.mkdir(workspace + "/" + config.outputDir, { recursive: true });
      const savePath = workspace + "/" + config.outputDir + "/" + config.outputFileName;
      
      Deno.writeTextFile(savePath, packagedContent);
      ora("Packed functions to " + savePath).succeed();
    });
  }
}