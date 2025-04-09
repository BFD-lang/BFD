#!/usr/bin/env node

import { Command } from "commander"
import { generateSchema } from "./commands/generate-schema"
import { generateApi } from "./commands/generate-api"
import { generateUi } from "./commands/generate-ui"
import { generateAll } from "./commands/generate-all"

const program = new Command()

program
  .name("zap")
  .description("ZapLang CLI")
  .version("0.1.0")

program
  .command("generate")
  .description("コード生成を実行")
  .argument("<target>", "schema | api | ui | all")
  .action(async (target) => {
    switch (target) {
      case "schema":
        await generateSchema()
        break
      case "api":
        await generateApi()
        break
      case "ui":
        await generateUi()
        break
      case "all":
        await generateAll()
        break
      default:
        console.error(`未知のターゲット: ${target}`)
    }
  })

program.parse()
