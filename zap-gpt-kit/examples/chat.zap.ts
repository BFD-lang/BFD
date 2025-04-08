// chat.zap.ts — Minimal chat app definition for Zap

export default defineApp({
    db: {
      messages: {
        id: "string",
        content: "text",
        sender: "string",
        created_at: "datetime"
      }
    },
    api: {
      getMessages: {
        method: "GET",
        path: "/messages",
        public: true,
        handler: ({ db }) => db.messages.all()
      },
      postMessage: {
        method: "POST",
        path: "/messages",
        public: true,
        handler: ({ db, body }) => {
          db.messages.insert({
            id: crypto.randomUUID(),
            content: body.content,
            sender: body.sender,
            created_at: new Date().toISOString()
          });
          return { status: "ok" };
        }
      }
    }
  });
  