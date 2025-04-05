export function startServer(serverAST) {
    const handlers = {
      POST: serverAST.post || {},
      GET: serverAST.get || {},
      PUT: serverAST.put || {},
      DELETE: serverAST.delete || {}
    };
  
    Bun.serve({
      port: 3000,
      async fetch(req) {
        const method = req.method.toUpperCase();
        const url = new URL(req.url);
        const routeMap = handlers[method];
  
        if (!routeMap) {
          return new Response("Method Not Allowed", { status: 405 });
        }
  
        const code = routeMap[url.pathname];
        if (!code) {
          return new Response("Not Found", { status: 404 });
        }
  
        let body = {};
        if (method === "POST" || method === "PUT") {
          try {
            body = await req.json();
          } catch {
            return new Response("Invalid JSON", { status: 400 });
          }
        }
  
        // 🧠 暫定 evaluator: return json(...) または return redirect(...)
        if (code.startsWith("return json(")) {
          const jsonStr = code.match(/return json\(([\s\S]+)\)/)?.[1];
          const json = safeEval(jsonStr, { body });
          return new Response(JSON.stringify(json), {
            headers: { "Content-Type": "application/json" }
          });
        }
  
        if (code.startsWith('return redirect("')) {
          const loc = code.match(/return redirect\("(.+?)"\)/)?.[1];
          return new Response(null, {
            status: 302,
            headers: { Location: loc }
          });
        }
  
        return new Response("Unrecognized return statement", { status: 500 });
      }
    });
  
    console.log("✨ BFD Server running on http://localhost:3000");
  }
  
  // 🧠 body.email などを扱える簡易 evaluator（安全な範囲で）
  function safeEval(expr, context = {}) {
    return Function(...Object.keys(context), `return (${expr})`)(
      ...Object.values(context)
    );
  }
  