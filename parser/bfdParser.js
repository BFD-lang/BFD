/**
 * BFD Parser（最終修正）
 * children/props のリスト構造を厳密に配列に固定
 */

export function parseBFD(source) {
  const ast = { route: {}, server: {}, db: {} };
  const lines = source.split("\n");

  let current = null;
  let path = null;
  let stack = [];

  const listKeyWhitelist = ["children", "props"];

  for (let raw of lines) {
    const line = raw.replace(/\r/, "");
    const indent = line.match(/^ */)[0].length;
    const trimmed = line.trim();

    if (trimmed === "") continue;

    if (trimmed.startsWith("route ")) {
      const match = trimmed.match(/^route\s+\"?(\/[^\"]*)\"?\s+do$/);
      if (match) {
        path = match[1];
        ast.route[path] = {};
        current = ast.route[path];
        stack = [{ indent, target: current }];
        continue;
      }
    }

    if (trimmed === "server:") {
      current = ast.server;
      stack = [{ indent, target: current }];
      continue;
    }

    if (trimmed === "db:") {
      current = ast.db;
      stack = [{ indent, target: current }];
      continue;
    }

    const listKV = trimmed.match(/^-\s*(.+?):\s*(.*)$/);
    if (listKV) {
      const key = listKV[1].trim();
      const val = listKV[2]?.trim();
      const node = {};
      node[key] = parseValue(val);

      const parentFrame = stack[stack.length - 1];
      const parent = parentFrame.target;
      const listKey = parentFrame.listKey;

      if (Array.isArray(parent)) {
        parent.push(node);
      } else if (
        typeof listKey === "string" &&
        Array.isArray(parent[listKey])
      ) {
        parent[listKey].push(node);
      } else if (typeof listKey === "string") {
        parent[listKey] = [node];
      }

      stack.push({ indent, target: node });
      continue;
    }

    const listSimple = trimmed.match(/^-\s*(.+)$/);
    if (listSimple) {
      const entry = parseKV(listSimple[1]);
      const parentFrame = stack[stack.length - 1];
      const parent = parentFrame.target;
      const listKey = parentFrame.listKey;

      if (Array.isArray(parent)) {
        parent.push(entry);
        stack.push({ indent, target: entry });
      } else if (typeof listKey === "string") {
        if (!Array.isArray(parent[listKey])) {
          parent[listKey] = [];
        }
        parent[listKey].push(entry);
        stack.push({ indent, target: entry });
      }

      continue;
    }

    const kvMatch = trimmed.match(/^([^:]+):(?:\s+(.*))?$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      const val = kvMatch[2]?.trim();

      while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
        stack.pop();
      }

      const parent = stack[stack.length - 1].target;

      if (val === undefined) {
        // 初期値として配列にしておく（children, props）
        parent[key] = listKeyWhitelist.includes(key) ? [] : {};
        const entry = { indent, target: parent[key] };
        if (listKeyWhitelist.includes(key)) entry.listKey = undefined;
        else entry.listKey = undefined;
        stack.push(entry);
      } else {
        parent[key] = parseValue(val);
      }

      continue;
    }

    const opMatch = trimmed.match(/^(\w+)\s+\"([^\"]+)\"\s+do$/);
    if (opMatch) {
      const method = opMatch[1];
      const route = opMatch[2];
      const parent = stack[stack.length - 1].target;
      parent[method] ??= {};
      parent[method][route] = "";
      stack.push({ indent, target: parent[method], listKey: route });
      continue;
    }

    if (stack.length > 0) {
      const parent = stack[stack.length - 1].target;
      const lastKey = Object.keys(parent).pop();
      parent[lastKey] += (parent[lastKey] ? "\n" : "") + trimmed;
    }
  }

  return ast;
}

function parseValue(val) {
  if (val === "true") return true;
  if (val === "false") return false;
  if (val === "null") return null;
  if (!isNaN(val)) return Number(val);
  if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1);
  return val;
}

function parseKV(str) {
  const [k, ...rest] = str.split(":");
  const v = rest.join(":").trim();
  const out = {};
  out[k.trim()] = parseValue(v);
  return out;
}
