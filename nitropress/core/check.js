import fs from "fs";
import path from "path";
import { parseNitro } from "./parser.js";

const DISALLOWED_SYNTAX = ["=>", "this", "new", "function", "eval"];

export function runCheck(filepath) {
  const fullPath = path.resolve(process.cwd(), filepath);
  const source = fs.readFileSync(fullPath, "utf-8");

  const { ast, errors: syntaxErrors } = parseNitro(source);
  const semanticErrors = [];

  if (!ast || typeof ast !== "object") {
    console.log("❌ Parser returned no AST.");
    return;
  }

  // 1. signal / computed チェック
  const stateVars = new Set();

  for (const entry of ast.state || []) {
    const { name, kind, value } = entry;

    if (kind === "signal") {
      stateVars.add(name);
    } else if (kind === "computed") {
      const usedVars = value.split(/[^a-zA-Z0-9_]/).filter(Boolean);
      for (const v of usedVars) {
        if (!stateVars.has(v)) {
          semanticErrors.push(
            `[state:computed] references undefined state: ${v}`
          );
        }
      }
    } else {
      semanticErrors.push(`[state] Invalid kind: ${kind}`);
    }
  }

  // 2. route path 重複チェック
  const seenPaths = new Map();
  for (const route of ast.routes || []) {
    const path = route.path;
    if (seenPaths.has(path)) {
      semanticErrors.push(`[route] Duplicate route path: ${path}`);
    } else {
      seenPaths.set(path, true);
    }
  }

  // 3. 禁止構文チェック（props/text）
  function walkNodes(nodes) {
    if (!Array.isArray(nodes)) return;
    for (const node of nodes) {
      if (node.props) {
        for (const [k, v] of Object.entries(node.props)) {
          if (typeof v === "string") {
            for (const bad of DISALLOWED_SYNTAX) {
              if (v.includes(bad)) {
                semanticErrors.push(
                  `[props] Disallowed JS syntax: ${k}="${v}"`
                );
              }
            }
          }
        }
      }
      if (node.text) {
        for (const bad of DISALLOWED_SYNTAX) {
          if (node.text.includes(bad)) {
            semanticErrors.push(
              `[text] Disallowed JS syntax in text: "${node.text}"`
            );
          }
        }
      }
      walkNodes(node.children);
    }
  }

  for (const route of ast.routes || []) {
    if (route.html?.head) walkNodes(route.html.head);
    if (route.html?.body) walkNodes(route.html.body);
  }

  // 出力
  const allErrors = [
    ...syntaxErrors.map((e) => `[Line ${e.line}] ${e.message}`),
    ...semanticErrors,
  ];

  if (allErrors.length === 0) {
    console.log("✅ Check passed: No errors found.");
  } else {
    console.log(`❌ Found ${allErrors.length} issues:`);
    allErrors.forEach((err) => console.log(err));
  }
}

// CLIから実行された場合のみ動作
if (import.meta.url === `file://${process.argv[1]}`) {
  runCheck(process.argv[2]);
}
