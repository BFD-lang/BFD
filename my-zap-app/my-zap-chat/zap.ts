export default {
    db: {
      messages: {
        id: "string",
        user: "string",
        content: "string",
        createdAt: "string",
      }
    },
    api: {
      listMessages: {
        method: "GET",
        path: "/messages",
        handler: "./handlers/listMessages.ts",
      },
      postMessage: {
        method: "POST",
        path: "/messages",
        handler: "./handlers/postMessage.ts",
      },
    },
  }
  