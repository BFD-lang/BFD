import fs from "fs";
import path from "path";
import { parseNitro } from "./parser.js";

// ✅ dev.js からコピー
function renderNode(node) {
  if (!node || !node.tag) return "";

  const props = Object.entries(node.props || {})
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");

  const open = `<${node.tag}${props ? " " + props : ""}>`;
  const innerText = node.text || "";
  const children = (node.children || []).map(renderNode).join("");
  const close = `</${node.tag}>`;

  return `${open}${innerText}${children}${close}`;
}

function renderHtml(html) {
  if (!html) return "";

  const headStr = (html.head || []).map(renderNode).join("\n");
  const bodyStr = (html.body || []).map(renderNode).join("\n");

  return `<!DOCTYPE html>
<html>
  <head>
${headStr}
  </head>
  <body>
${bodyStr}
  </body>
</html>`.trim();
}

// ✅ CLI実行部
async function runBuild(filepath) {
  const fullPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(fullPath, "utf-8");
  const { ast, errors } = parseNitro(content);

  if (errors.length > 0) {
    console.error("❌ Parse errors:");
    errors.forEach((e) => console.error(`[Line ${e.line}] ${e.message}`));
    process.exit(1);
  }

  const route = ast.routes.find((r) => r.path === "/");
  if (!route) {
    console.error("❌ No route '/' found.");
    process.exit(1);
  }

  const html = route.html;
  const htmlStr = renderHtml(html);

  const distDir = path.resolve(process.cwd(), "dist");
  const outputPath = path.join(distDir, "index.html");

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  fs.writeFileSync(outputPath, htmlStr, "utf-8");
  console.log(`✅ Build complete: dist/index.html`);
}

// ✨ CLIエントリポイント
if (import.meta.url === `file://${process.argv[1]}`) {
  const input = process.argv[2];
  if (!input) {
    console.error("Usage: bun run nitropress/core/build.js <file.nitro>");
    process.exit(1);
  }
  runBuild(input);
}
