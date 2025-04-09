// cli/commands/generate-schema.ts
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../");

export async function generateSchema() {
  console.log("[zap] 🔧 generate schema: 開始");

  const zapPath = path.resolve(ROOT, "Zap.ts");
  const zapModule = await import(pathToFileURL(zapPath).href);
  const models = zapModule.default as {
    name: string;
    fields: Record<string, { type: string; states?: string[] }>;
  }[];

  const schemaDir = path.resolve(ROOT, "drizzle/schema");
  await fs.mkdir(schemaDir, { recursive: true });

  for (const model of models) {
    const lines: string[] = [];

    const enumImports: string[] = [];
    const fieldDefs: string[] = [];

    for (const [key, field] of Object.entries(model.fields)) {
      if (field.type === "id") {
        fieldDefs.push(`  ${key}: serial("${key}").primaryKey(),`);
      } else if (field.type === "text") {
        fieldDefs.push(`  ${key}: text("${key}").notNull(),`);
      } else if (field.type === "status") {
        const enumName = `${key}Enum`;
        enumImports.push(
          `export const ${enumName} = pgEnum("${key}", ${JSON.stringify(field.states)})`
        );
        fieldDefs.push(`  ${key}: text("${key}").notNull(),`);
      }
    }

    const content = `import { pgTable, serial, text, pgEnum } from "drizzle-orm/pg-core"

${enumImports.join("\n")}

export const ${model.name} = pgTable("${model.name}", {
${fieldDefs.join("\n")}
})
`;

    const schemaFile = path.join(schemaDir, `${model.name}.ts`);
    await fs.writeFile(schemaFile, content, "utf-8");
    console.log(`[zap] ✅ schema generated: ${model.name}`);
  }

  const drizzleConfig = `import type { Config } from "drizzle-kit"

export default {
  schema: "./drizzle/schema",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  }
} satisfies Config
`;

  await fs.writeFile(
    path.join(ROOT, ".drizzle.config.ts"),
    drizzleConfig,
    "utf-8"
  );
  console.log("[zap] ✅ .drizzle.config.ts を出力しました");
}
