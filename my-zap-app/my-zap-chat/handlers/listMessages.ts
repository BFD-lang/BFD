interface DbContext {
  messages: {
    findMany: () => Promise<any[]>;
  };
}

export default async ({ db }: { db: DbContext }) => {
  return await db.messages.findMany();
};
