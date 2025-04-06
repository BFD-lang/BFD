import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname } from "path";

export function renderAstro(routeAST, outputPath = "./dist/index.astro") {
  const astroNode = routeAST.astro;
  const dataVars = routeAST.data || {};

  if (!astroNode) {
    console.warn("⚠️ No astro: section found in route AST.");
    return;
  }

  const propsLine =
    Object.keys(dataVars).length > 0
      ? `const { ${Object.keys(dataVars).join(", ")} } = Astro.props;`
      : "";

  const body = renderNode(astroNode, 0);

  const template = `
---
${propsLine}
---
${body}
`.trim();

  const dir = dirname(outputPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  writeFileSync(outputPath, template);
  console.log(`✨ .astro file written to ${outputPath}`);
}

function renderNode(node, depth = 0) {
  const indent = "  ".repeat(depth);
  const { tag, props = {}, children = [], content } = node;

  const attrs = Object.entries(props)
    .map(([key, val]) => convertProp(key, val))
    .join(" ");

  const open = `<${tag}${attrs ? " " + attrs : ""}>`;

  if (content) {
    return `${indent}${open}${wrapContent(content)}</${tag}>`;
  }

  if (!children.length) {
    return `${indent}${open}</${tag}>`;
  }

  const inner = children
    .map((child) => renderNode(child, depth + 1))
    .join("\n");
  return `${indent}${open}
${inner}
${indent}</${tag}>`;
}

function convertProp(key, val) {
  if (key === "@submit") return `method="POST" action="${val}"`;
  if (key === "class") return `class="${val}"`;
  return `${key}="${val}"`;
}

function wrapContent(text) {
  return `{${text}}`;
}
