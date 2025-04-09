// cli/commands/generate-all.ts

import { generateSchema } from "./generate-schema";
import { generateApi } from "./generate-api";
import { generateUi } from "./generate-ui";

export async function generateAll() {
  try {
    console.log("\n[zap] 🔧 generate schema...");
    await generateSchema();
    console.log("[zap] ✅ schema done\n");

    console.log("[zap] 🔧 generate api...");
    await generateApi();
    console.log("[zap] ✅ api done\n");

    console.log("[zap] 🔧 generate ui...");
    await generateUi();
    console.log("[zap] ✅ ui done\n");

    console.log("[zap] 🎉 All generation completed! Ready to deploy.\n");
  } catch (err) {
    console.error("[zap] ❌ エラーが発生しました:", err);
    process.exit(1);
  }
}
