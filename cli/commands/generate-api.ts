// cli/commands/generate-api.ts

import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "../../")

export async function generateApi() {
  console.log("[zap] 🔧 generate api: 開始")

  const zapPath = path.resolve(ROOT, "Zap.ts")
  const zapModule = await import(pathToFileURL(zapPath).href)
  const models = zapModule.default as any[]

  for (const model of models) {
    const dir = path.resolve(ROOT, "pages/api", model.name + "s")
    await fs.mkdir(dir, { recursive: true })

    for (const t of model.transitions) {
      const handlerLines: string[] = []

      handlerLines.push(`// auto-generated: ${model.name}.${t.name}`)
      handlerLines.push(`import { db } from "@/lib/db" // 仮想インポート`)
      handlerLines.push(`import { getUser } from "@/lib/auth"`)
      handlerLines.push("")
      handlerLines.push(`export default async function handler(req, res) {`)
      handlerLines.push(`  const user = getUser(req)`)
      if (t.guard) {
        handlerLines.push(`  // guard: ${t.guard.toString().replace(/\n/g, " ")}`)
        handlerLines.push(`  // 実行時チェック未対応（今はコメント化）`)
        handlerLines.push(`  // if (!(user.role === "admin")) return res.status(403).end()`)
      }
      handlerLines.push(`  const { id } = req.query`)
      handlerLines.push(`  await db.update("${model.name}")`)
      handlerLines.push(`    .where({ id })`)
      handlerLines.push(`    .set({ status: "${t.to}" })`)
      handlerLines.push(`  res.status(200).json({ ok: true })`)
      handlerLines.push(`}`)

      const outPath = path.join(dir, `${t.name}.ts`)
      await fs.writeFile(outPath, handlerLines.join("\n"), "utf-8")
      console.log(`[zap] ✅ api generated: /api/${model.name}s/${t.name}.ts`)
    }
  }
}
