// parser/bfdParser.js

export function parseBFD(source) {
    // 仮パーサ：本来はAST解析をここに実装
    return {
      route: {
        "/": {
          html: [
            { tag: "h1", text: "Hello :name" },
            { tag: "form", action: "/api/login", inputs: ["email"] }
          ]
        }
      },
      server: {
        post: {
          "/api/login": "return json({ ok: true, name: body.email })"
        }
      },
      db: {
        users: {
          id: "int primary",
          email: "string"
        }
      }
    };
  }
  