let inComponent = false;
let currentComponent = "";
let componentLines: string[] = [];

export function parseMiz(mizText: string): string {
  console.log("✅ parser.ts: 再設計・修正版");

  const lines = mizText.split("\n");
  const jsLines: string[] = [];
  const indentStack: (number | "VIEW")[] = [];
  let inRoute = false;

  for (const line of lines) {
    if (line.trim() === "") continue;

    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    const trimmed = line.trim();

    // ✅ component定義ブロック開始
    if (trimmed.startsWith("component ")) {
      const match = trimmed.match(/^component\s+"(\w+)(\((.*?)\))?":?$/);
      if (match) {
        const match = trimmed.match(/^component\s+"(\w+)(\((.*?)\))?":?$/);
        const name = match?.[1] || ""; // "Button"
        const args = match?.[3]?.split(",").map((s) => s.trim()) || []; // ["label"]
        jsLines.push(
          `defineComponent("${name}", (${args.join(",")}) => { return div(`
        );
      }
      if (match) {
        inComponent = true;
        currentComponent = match[1];
        componentLines = [];
        indentStack.push(indent);
        continue;
      }
    }

    // ✅ componentブロック内 → collect lines
    if (inComponent) {
      const baseIndent = indentStack[indentStack.length - 1] as number;
      if (indent <= baseIndent) {
        // ブロック終了
        const body = parseComponentBody(componentLines.join("\n"));
        jsLines.push(
          `defineComponent("${currentComponent}", () => { return div(`
        );
        jsLines.push(body);
        jsLines.push(`); });`);
        inComponent = false;
        currentComponent = "";
        indentStack.pop();
      } else {
        componentLines.push(line);
        continue;
      }
    }

    // ✅ スコープを閉じる
    while (
      indentStack.length > 0 &&
      typeof indentStack[indentStack.length - 1] === "number" &&
      indent <= (indentStack[indentStack.length - 1] as number)
    ) {
      const top = indentStack.pop();
      if (top === "VIEW") {
        jsLines.push("))");
      } else {
        jsLines.push("})");
      }
    }

    // ✅ title構文
    if (trimmed.startsWith("title ")) {
      const value = trimmed.slice(6).trim();
      jsLines.push(`title(${value})`);
    }
    // もし "PostForm" や "Button("送信")" のように propsありで使われてたら
    if (/^(\w+)\((.*?)\)$/.test(trimmed)) {
      const match = trimmed.match(/^(\w+)\((.*?)\)$/);
      if (match) {
        const [, name, args] = match;
        const argList = args.split(",").map((s: string) => s.trim()).join(", ");
        jsLines.push(`renderComponent("${name}", [${argList}]),`);
      }
    }
    

    // ✅ style構文
    else if (trimmed.startsWith("style ")) {
      const selector = trimmed.slice(6).replace(/:$/, "").trim();
      jsLines.push(`style({ "${selector}": {`);
      indentStack.push(indent);
    }

    // ✅ route構文
    else if (trimmed.startsWith("route ")) {
      const match = trimmed.match(/^route\s+"(.+?)"\s*=>?/);
      if (match) {
        jsLines.push(`route("${match[1]}", () => {`);
        indentStack.push(indent);
        inRoute = true;
      }
    }

    // ✅ view構文
    else if (trimmed === "view:") {
      console.log("🪟 entering view:");
      const viewLine = inRoute ? "return view(() => div(" : "view(() => div(";
      jsLines.push(viewLine);
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

    // ✅ タグ or コンポーネント呼び出し
    else if (/^\w+/.test(trimmed)) {
      const [word] = trimmed.split(/\s+/);
      if (word[0] === word[0].toUpperCase()) {
        jsLines.push(`renderComponent("${word}"),`);
      } else {
        jsLines.push(transformTag(trimmed));
      }
    }

    // ❌ fallback
    else {
      jsLines.push(`// Unparsed: ${line}`);
    }
  }

  // ✅ スコープ残り全部閉じる
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

// ✅ コンポーネント用の簡易再帰パーサ（return含まない）
function parseComponentBody(mizText: string): string {
  const lines = mizText.split("\n");
  const body: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    if (/^\w+/.test(trimmed)) {
      const [word] = trimmed.split(/\s+/);
      if (word[0] === word[0].toUpperCase()) {
        body.push(`renderComponent("${word}"),`);
      } else {
        body.push(transformTag(trimmed));
      }
    } else {
      body.push(`// Unparsed in component: ${line}`);
    }
  }
  return body.join("\n");
}

// camelCase変換
function camelize(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// タグ処理
function transformTag(line: string): string {
  console.log("🔧 transformTag input:", line);
  const match = line.match(/^(\w+)\s*(\{.*\})?\s*["']?(.*?)["']?$/);
  if (!match) return `// Unparsed tag: ${line}`;

  const tag = match[1];
  const rawAttrs = match[2] || "{}";
  const rawText = match[3] || "";

  // `:` のみは無視（view:の残骸など）
  const safeText = rawText === ":" ? "" : rawText;

  // 🔧ここでちゃんとチェーン適用
  const transformedText = safeText
    .replace(/"/g, '\\"')
    .replace(/#\{(.*?)\}/g, (_, expr) => `" + (${expr}) + "`);

  console.log("🪄 parsed tag:", { tag, rawAttrs, safeText });
  return `${tag}(${rawAttrs}, "${safeText}"),`;
}
