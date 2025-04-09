// cli/commands/generate-ui.ts

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../");

export async function generateUi() {
  console.log("[zap] 🎨 generate ui: 開始");

  const zapPath = path.resolve(ROOT, "Zap.ts");
  const zapModule = await import(pathToFileURL(zapPath).href);
  const models = zapModule.default as any[];

  for (const model of models) {
    const outDir = path.join(ROOT, "pages", `${model.name}s`);
    await fs.mkdir(outDir, { recursive: true });

    const tsx = [
      `import { useRouter } from "next/router"`,
      `import { useDB } from "@/lib/db"`,
      `import { ZapButton } from "@/components/ZapButton"`,
      ``,
      `export default function ${capitalize(model.name)}Page() {`,
      `  const router = useRouter()`,
      `  const app = useDB("${model.name}", { realtime: true, id: router.query.id })`,
      `  if (!app) return <div>Loading...</div>`,
      `  return (`,
      `    <div>`,
      `      <h1>{app.title}</h1>`,
      `      <p>Status: {app.status}</p>`,
    ];

    for (const t of model.transitions) {
      const guardComment = t.guard
        ? `// guard: ${t.guard.toString().replace(/\n/g, " ")}`
        : "";

      tsx.push(`      ${guardComment}`);
      tsx.push(
        `      <ZapButton transition="${t.name}" model="${model.name}" id={app.id} />`
      );
    }

    tsx.push(`    </div>`);
    tsx.push(`  )`);
    tsx.push(`}`);

    const pageFile = path.join(outDir, "[id].tsx");
    await fs.writeFile(pageFile, tsx.join("\n"), "utf-8");
    console.log(`[zap] ✅ UIページ出力: /pages/${model.name}s/[id].tsx`);
  }

  // コンポーネント出力
  const zapBtnPath = path.resolve(ROOT, "components/ZapButton.tsx");
  const zapBtnCode = `
// auto-generated ZapButton

export function ZapButton({ model, transition, id }: {
  model: string
  transition: string
  id: number | string
}) {
  const handleClick = async () => {
    await fetch(\`/api/\${model}s/\${transition}?id=\${id}\`, { method: "POST" })
    location.reload()
  }

  return (
    <button onClick={handleClick}>
      {transition}
    </button>
  )
}
`.trim();

  await fs.mkdir(path.dirname(zapBtnPath), { recursive: true });
  await fs.writeFile(zapBtnPath, zapBtnCode, "utf-8");
  console.log(`[zap] ✅ ボタン出力: components/ZapButton.tsx`);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
