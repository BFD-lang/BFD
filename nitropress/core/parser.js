import fs from "fs";
export function parseNitro(content) {
  function parse(content) {
    const lines = content.split("\n");
    const ast = {
      type: "NitroFile",
      state: [],
      routes: [],
      html: null,
      islands: [],
      streams: [],
      server: [],
      db: [],
    };

    const errors = [];
    let currentSection = null;
    let sectionIndent = 0;
    let currentRoute = null;

    const stack = [];
    function parseAssignment(line) {
      const [key, ...rest] = line.split("=");
      return {
        key: key.trim(),
        value: rest.join("=").trim(),
      };
    }

    function parseTagLine(line) {
      const parts = line.trim().split(/\s+/);
      const tag = parts.shift();

      const props = {};
      let text = null;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (/^[@:\w\-]+=/.test(part)) {
          // 属性部分
          const [k, ...vParts] = part.split("=");
          let v = vParts.join("=");
          if (v.startsWith('"') && !v.endsWith('"')) {
            while (i + 1 < parts.length && !parts[i + 1].endsWith('"')) {
              v += " " + parts[++i];
            }
            v += " " + parts[++i]; // 終了"を含める
          }
          props[k] = v.replace(/^["']|["']$/g, "");
        } else if (part.startsWith('"') || part.startsWith("'")) {
          // テキスト部分（ラベル）
          text = part.replace(/^["']|["']$/g, "");
        }
      }

      return {
        tag,
        props,
        text,
        children: [],
      };
    }

    function pushNode(node, indent) {
      while (stack.length && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      const parent = stack[stack.length - 1];
      if (parent) {
        parent.node.children.push(node);
      } else {
        if (node.tag === "head" || node.tag === "body") {
          const target = currentRoute ? currentRoute.html : ast.html;
          target[node.tag] = node.children;
        } else {
          const target = currentRoute ? currentRoute.html.body : ast.html.body;
          target.push(node);
        }
      }

      stack.push({ node, indent });
    }

    lines.forEach((rawLine, idx) => {
      const line = rawLine.trim();
      const indent = rawLine.search(/\S|$/);

      if (line === "" || line.startsWith("#")) return;

      const routeMatch = line.match(/^route\s+["'](.+?)["']\s+do$/);
      if (routeMatch) {
        currentSection = "route";
        sectionIndent = indent;
        const path = routeMatch[1];
        currentRoute = { path, html: { head: [], body: [] } };
        ast.routes.push(currentRoute);
        return;
      }

      const sectionMatch = line.match(
        /^(state|route|html|island|stream|server|db):$/
      );
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        sectionIndent = indent;
        stack.length = 0;
        return;
      }

      if (indent > sectionIndent && currentSection) {
        switch (currentSection) {
          case "state": {
            const { key, value } = parseAssignment(line);
            const match = value.match(/(\w+)\((.*)\)/);
            if (!match) {
              errors.push({
                line: idx + 1,
                message: `Invalid state value: ${value}`,
              });
              return;
            }
            ast.state.push({
              name: key,
              kind: match[1],
              value: eval(match[2]),
            });
            break;
          }

          case "html": {
            const node = parseTagLine(line);
            if (node) {
              pushNode(node, indent);
            } else {
              errors.push({
                line: idx + 1,
                message: `Invalid HTML tag syntax`,
              });
            }
            break;
          }

          case "route": {
            if (line === "html:") {
              currentSection = "html";
              sectionIndent = indent;
              stack.length = 0;
            }
            break;
          }
        }
      } else {
        errors.push({
          line: idx + 1,
          message: `Unexpected indent or unknown section: ${line}`,
        });
      }
    });

    return { ast, errors };
  }
  return parse(content); // ✅ これが必要！
}

// CLI 実行用エントリ（Bun）
if (import.meta.main) {
  const filePath = Bun.argv[2];
  const content = await fs.promises.readFile(filePath, "utf-8");
  const { ast, errors } = parseNitro(content);
  console.log(JSON.stringify(ast, null, 2));
  if (errors.length) {
    console.error("⚠️ Errors:", errors);
  }
}
