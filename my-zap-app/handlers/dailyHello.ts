interface Db {
  user: any;
  posts: {
    insert: (data: { title: string }) => Promise<void>;
  };
}

export default async ({
  db,
  webhook,
}: {
  db: Db;
  webhook: (url: string, data: any) => Promise<void>;
}) => {
  console.log("🕒 dailyHello triggered!");
  await db.user.insert({ name: "from webhook!" });
  await db.posts.insert({ title: "Hello from cron!" });
  const users = await db.user.findMany();

  await webhook("https://webhook.site/7d0a5979-2104-41a2-9b60-6cd7373b279d", {
    users,
    message: "Zap says hi!",
    time: new Date().toISOString(),
  });
};
