// zap.ts
export default {
  api: {
    hello: {
      method: "GET",
      path: "/hello",
      handler: "./handlers/hello.ts",
    },
  },
  db: {
    user: {
      id: "string",
      name: "string",
    },
  },
  events: {
    dailyHello: {
      trigger: "cron.daily",
      handler: "./handlers/dailyHello.ts",
    },
  },
};
