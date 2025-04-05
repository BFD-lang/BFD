import { writeFileSync, mkdirSync, existsSync } from "fs";

export function renderHTML(ast) {
  const route = ast.route["/"];
  const htmlNodes = route.html;
  const data = route.data || {};

  const html = htmlNodes.map(node => renderNode(node, data)).join("\n");

  const template = `
  <html>
    <head><title>BFD App</title></head>
    <body>
      ${html}
    </body>
  </html>
  `.trim();

  // publicディレクトリがなければ作成
  if (!existsSync("public")) mkdirSync("public");

  writeFileSync("public/index.html", template);
  console.log("✨ HTML written to public/index.html");
}

function renderNode(node, data) {
  switch (node.tag) {
    case "h1":
    case "h2":
    case "p":
    case "div":
      return `<${node.tag}>${interpolate(node.text || "", data)}</${node.tag}>`;

    case "form":
      return `
        <form method="POST" action="${node.action}">
          ${node.inputs?.map(name => `<input name="${name}" />`).join("\n") || ""}
          <button>Submit</button>
        </form>
      `.trim();

    case "button":
      return `<button>${interpolate(node.text, data)}</button>`;

    case "input":
      return `<input name="${node.name}" />`;

    default:
      return `<!-- unsupported tag: ${node.tag} -->`;
  }
}

// :name → data.name のように埋め込む
function interpolate(text, data) {
  return text.replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, (_, key) => data[key] || "");
}
