// cli/zap-init.ts
import { cp } from "fs/promises";
import path from "path";

const args = Bun.argv.slice(2);
const templateIndex = args.indexOf("--template");
const templateName = templateIndex !== -1 ? args[templateIndex + 1] : null;

if (!templateName) {
  console.error("❌ テンプレート名を指定してください: --template chat");
  process.exit(1);
}

const cwd = process.cwd();
const templatesPath = path.resolve(__dirname, "../templates");
const templatePath = path.join(templatesPath, templateName);
const targetPath = path.join(cwd, `my-zap-${templateName}`);

console.log(`📦 テンプレート ${templateName} を展開中...`);

try {
  await cp(templatePath, targetPath, { recursive: true });
  console.log(`✅ プロジェクトを作成しました → ${targetPath}`);
  console.log(`👉 次のコマンドで起動できます：\n`);
  console.log(`   cd my-zap-${templateName}`);
  console.log(`   bun ../cli/zap-dev.ts ./zap.ts`);
} catch (err) {
  console.error("❌ テンプレートのコピーに失敗しました:", err);
  process.exit(1);
}
