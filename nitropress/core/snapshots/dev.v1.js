// nitropress/core/dev.js
import { parseNitro } from './parser.js';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: bun run nitropress/core/dev.js <path/to/file.nitro>");
  process.exit(1);
}

const fullPath = resolve(process.cwd(), filePath);

let ast = null;
let errors = [];
try {
  const content = await readFile(fullPath, 'utf8');
  const result = parseNitro(content);
  ast = result.ast;
  errors = result.errors || [];
} catch (err) {
  console.error("[parser error]", err);
}

function renderNode(node) {
  if (!node || !node.tag) return "";

  const props = Object.entries(node.props || {})
    .map(([k, v]) => `${k}="${v}"`).join(' ');

  const open = `<${node.tag}${props ? ' ' + props : ''}>`;
  const innerText = node.text || '';
  const children = (node.children || []).map(renderNode).join('');
  const close = `</${node.tag}>`;

  return `${open}${innerText}${children}${close}`;
}

function renderHtml(html) {
  if (!html) return "";

  const headStr = (html.head || []).map(renderNode).join('\n');
  const bodyStr = (html.body || []).map(renderNode).join('\n');

  return `
<html>
  <head>
${headStr}
  </head>
  <body>
${bodyStr}
  </body>
</html>`.trim();
}

function errorPage(message) {
  return `
<html>
  <head><title>Error</title></head>
  <body><h1 style="color:red">NitroPress Error</h1><p>${message}</p></body>
</html>`.trim();
}

Bun.serve({
  port: 3000,
  fetch(req) {
    if (req.method === "GET" && new URL(req.url).pathname === "/") {
      const route = ast?.routes?.find(r => r.path === "/");
      const html = route?.html || ast?.html;

      if (!html) {
        return new Response("NitroPress Error: No route or html section found.", {
          status: 500
        });
      }

      const htmlStr = renderHtml(html);
      return new Response(htmlStr, {
        headers: { "Content-Type": "text/html" }
      });
    }
    return new Response("Not found", { status: 404 });
  }
});

console.log("🚀 nitro dev running on http://localhost:3000/");
console.log("🧩 AST Dump:");
console.dir(ast, { depth: null });

if (errors.length > 0) {
  console.log("🧪 AST Warnings:");
  console.dir(errors, { depth: null });
}