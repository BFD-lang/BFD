interface Database {
  messages: {
    insert: (message: { user: string; content: string; createdAt: string }) => Promise<any>;
  };
}

export default async ({ req, db }: { req: Request; db: Database }) => {
  const body = await req.json()
  console.log("📦 Received body:", body)

  if (!body || !body.user || !body.content) {
    throw new Error("🛑 Invalid request body")
  }

  const message = {
    user: body.user,
    content: body.content,
    createdAt: new Date().toISOString(),
  }

  return await db.messages.insert(message)
}
