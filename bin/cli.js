#!/usr/bin/env bun
import { renderHTML } from "../runtime/renderer.js";
import { parseBFD } from "../parser/bfdParser.js";
import { readFileSync } from "fs";
import { startServer } from "../runtime/httpServer.js";

const file = Bun.argv[2];
if (!file) {
  console.error("🚨 Please provide a .bfd file path.");
  process.exit(1);
}

const source = readFileSync(file, "utf-8");
const ast = parseBFD(source);

console.log("✨ AST generated:\n", JSON.stringify(ast, null, 2));
renderHTML(ast);
startServer(ast.server);
