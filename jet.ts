import { parseMiz } from "./parser.ts";

const routes: Record<string, Function> = {};
let styleBlock = "";
let scriptBlock = "";
function escapeHtml(str: any): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function attrsToHTML(props: any = {}): string {
  return Object.entries(props)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
}
const components = {};

function defineComponent(name, fn) {
  console.log("🛠️ defineComponent:", name);
  components[name] = fn;
}

function renderComponent(name, args = []) {
  console.log("👀 calling component:", name, "with args:", args);
  if (!components[name]) throw new Error(`Component "${name}" not found`);
  const result = components[name](...args);
  console.log("🎯 component output:", result);
  return result;
}

globalThis.title = (t: string) => console.log("App Title:", t);

globalThis.route = (path: string, handler: (req?: any) => any) => {
  routes[path] = handler;
};

globalThis.view = (fn: () => string) => fn();

globalThis.div = (props: any, ...children: any[]) => {
  const attrString =
    props && typeof props === "object" && Object.keys(props).length > 0
      ? " " + attrsToHTML(props)
      : "";
  return `<div${attrString}>${children.map(String).join("")}</div>`;
};

globalThis.h1 = (props: any, text: string) => {
  const attrs = attrsToHTML(props);
  return `<h1 ${attrs}>${text}</h1>`;
};
globalThis.p = (...args: any[]) => {
  if (typeof args[0] === "object") {
    const attrs = args.shift();
    const attrString = Object.entries(attrs)
      .map(([k, v]) => `${k}="${v}"`)
      .join(" ");
    return `<p ${attrString}>${args.join("")}</p>`;
  } else {
    return `<p>${args.join("")}</p>`;
  }
};

globalThis.text = (content: any) =>
  typeof content === "string" ? content : escapeHtml(String(content));

globalThis.button = (attrs: any, text: string) => {
  console.log("🧱 <button> attrs:", attrs);
  console.log("🧱 <button> text:", text);
  const attrString = Object.entries(attrs || {})
    .map(([k, v]) =>
      typeof v === "string" && v.includes('" +')
        ? `${k}="${v}"`
        : `${k}="${String(v)}"`
    )
    .join(" ");
  return `<button ${attrString}>${text}</button>`;
};

globalThis.form = (attrs: any, ...children: any[]) => {
  const attrString = Object.entries(attrs || {})
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  return `<form ${attrString}>${children.join("")}</form>`;
};

globalThis.input = (attrs: any) => {
  const attrString = Object.entries(attrs || {})
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  return `<input ${attrString} />`;
};

globalThis.textarea = (attrs: any, content = "") => {
  const attrString = Object.entries(attrs || {})
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  return `<textarea ${attrString}>${content}</textarea>`;
};

globalThis.select = (attrs: any, options: string[]) => {
  const attrString = Object.entries(attrs || {})
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  const opts = options
    .map((o) => `<option value="${o}">${o}</option>`)
    .join("");
  return `<select ${attrString}>${opts}</select>`;
};

// script(fn or code)
globalThis.script = (arg: string | (() => void)) => {
  if (typeof arg === "function") {
    scriptBlock += `<script>(${arg.toString()})()</script>`;
  } else {
    scriptBlock += `<script>${arg}</script>`;
  }
};

// state保持
globalThis.state = (initial: any) => {
  let value = initial;
  return {
    get: () => value,
    set: (v: any) => (value = v),
  };
};

// CSS定義
globalThis.style = (styles: Record<string, Record<string, string>>) => {
  let css = "";
  for (const selector in styles) {
    css += `${selector} {\n`;
    for (const key in styles[selector]) {
      const prop = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      css += `  ${prop}: ${styles[selector][key]};\n`;
    }
    css += `}\n`;
  }
  styleBlock = `<style>\n${css}</style>`;
};

// JSONレスポンス
globalThis.json = (data: any) => ({ type: "json", data });

// 🔥 burn対応（即時exit）
globalThis.burn = () => {
  console.log("🔥 Burn initiated. Goodbye.");
  process.exit(0);
};

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const handler = routes[url.pathname];
    if (handler) {
      if (req.method === "POST") {
        const body = await req.text();
        const parsed = Object.fromEntries(new URLSearchParams(body));
        const result = handler({ method: "POST", body: parsed });
        if (result?.type === "json") {
          return Response.json(result.data);
        } else {
          return new Response(
            `<!DOCTYPE html><html><head><meta charset="UTF-8">${styleBlock}</head><body>${result}${scriptBlock}</body></html>`,
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
          );
        }
      } else {
        const result = handler();
        console.log("🧾 result from handler:", result);
        if (result?.type === "json") {
          return Response.json(result.data);
        } else {
          return new Response(
            `<!DOCTYPE html><html><head><meta charset="UTF-8">${styleBlock}</head><body>${result}${scriptBlock}</body></html>`,
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
          );
        }
      }
    }
    return new Response("404 Not Found", { status: 404 });
  },
});
export {};
const mizCode = await Bun.file("app.jet").text();
const parsedCode = parseMiz(mizCode);

console.log("=== PARSED JS ===");
console.log(parsedCode);
console.log("=================");

try {
  eval(parsedCode);
} catch (e) {
  console.error("❌ Eval Error:", e);
}
console.log("🌐 Jet Agpp running at http://localhost:3000");
