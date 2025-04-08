// handlers/hello.ts
interface Db {
  user: {
    findMany: () => Promise<any[]>;
  };
}

export default async ({ db }: { db: Db }) => {
    const users = await db.user.findMany()
    return { message: 'Hello from Zap!', users }
  }
  