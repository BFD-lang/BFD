// ai-log.zap.ts — Log and notify LLM interactions

export default defineApp({
    db: {
      logs: {
        id: "string",
        prompt: "text",
        response: "text",
        user_id: "string",
        created_at: "datetime"
      }
    },
    api: {
      logInteraction: {
        method: "POST",
        path: "/logs",
        public: true,
        handler: ({ db, body }) => {
          const entry = {
            id: crypto.randomUUID(),
            prompt: body.prompt,
            response: body.response,
            user_id: body.user_id,
            created_at: new Date().toISOString()
          };
          db.logs.insert(entry);
          return entry;
        }
      }
    },
    events: {
      notifyNewLog: {
        trigger: "db.logs.insert",
        handler: ({ body }) => {
          return webhook("https://hooks.slack.com/services/your-url", {
            text: `🧠 New AI log by ${body.user_id}: ${body.prompt.slice(0, 60)}...`
          });
        }
      }
    }
  });
  