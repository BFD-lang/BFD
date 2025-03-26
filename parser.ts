export function parseMiz(mizText: string): string {
  console.log("✅ parser.ts: 再設計版");

  const lines = mizText.split("\n");
  const jsLines: string[] = [];
  const indentStack: (number | "VIEW")[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;

    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    const trimmed = line.trim();

    // ✅ スコープを閉じる
    console.log("📏 indent", indent, "stack", indentStack);

    while (
      indentStack.length > 0 &&
      typeof indentStack[indentStack.length - 1] === "number" &&
      indent <= (indentStack[indentStack.length - 1] as number) // ← ← ← ココ！
    ) {
      const top = indentStack.pop();
      console.log("🔽 closing scope for:", top);
      if (top === "VIEW") {
        jsLines.push("))");
      } else {
        jsLines.push("}})"); // ← 閉じる！
      }
    }

    // ✅ title構文
    if (trimmed.startsWith("title ")) {
      const value = trimmed.slice(6).trim();
      jsLines.push(`title(${value})`);
    }

    // ✅ style構文
    else if (trimmed.startsWith("style ")) {
      const selector = trimmed.slice(6).replace(/:$/, "").trim();
      jsLines.push(`style({ "${selector}": {`);
      indentStack.push(indent);
    }

    // ✅ route構文
    else if (trimmed.startsWith("route ")) {
      const match = trimmed.match(/^route\s+(".*?")\s*=>?/);
      if (match) {
        jsLines.push(`route(${match[1]}, () => {`);
        indentStack.push(indent);
      }
    }

    // ✅ view構文
    else if (trimmed === "view:") {
      jsLines.push("return view(() => div(");
      indentStack.push("VIEW");
    }

    // ✅ style中の key: value
    else if (
      indentStack.length > 0 &&
      typeof indentStack[indentStack.length - 1] === "number" &&
      indent > (indentStack[indentStack.length - 1] as number) &&
      trimmed.includes(":")
    ) {
      const [key, ...rest] = trimmed.split(":");
      const value = rest.join(":").trim();
      jsLines.push(`  ${camelize(key.trim())}: "${value}",`);
    }

    // ✅ タグ（h1, buttonなど）
    else if (/^\w+/.test(trimmed)) {
      jsLines.push(transformTag(trimmed));
    }

    // ❌ fallback
    else {
      jsLines.push(`// Unparsed: ${line}`);
    }
  }

  // ✅ 最後に残ったスコープを閉じる
  while (indentStack.length > 0) {
    const top = indentStack.pop();
    if (top === "VIEW") {
      jsLines.push("))");
    } else {
      jsLines.push("})");
    }
  }

  return jsLines.join("\n");
}

// camelCase変換
function camelize(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// タグ処理
function transformTag(line: string): string {
  const match = line.match(/^(\w+)\s*(\{.*\})?\s*["']?(.*?)["']?$/);
  if (!match) return `// Unparsed tag: ${line}`;
  const tag = match[1];
  const attrs = match[2] || "{}";
  const text = (match[3] || "").replace(/"/g, '\\"');
  return `${tag}(${attrs}, "${text}"),`;
}
