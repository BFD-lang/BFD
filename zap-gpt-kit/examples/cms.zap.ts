// cms.zap.ts — CMS-style app with admin-only API

export default defineApp({
    auth: {
      provider: "email",
      roles: ["admin", "editor"]
    },
    db: {
      posts: {
        id: "string",
        title: "string",
        content: "text",
        author: "string",
        created_at: "datetime",
        published: "boolean"
      }
    },
    api: {
      getPublishedPosts: {
        method: "GET",
        path: "/posts",
        public: true,
        handler: ({ db }) => db.posts.find({ published: true })
      },
      createPost: {
        method: "POST",
        path: "/admin/posts",
        handler: ({ db, auth, body }) => {
          if (auth.user.role !== "admin") {
            throw new Error("Unauthorized");
          }
          db.posts.insert({
            id: crypto.randomUUID(),
            title: body.title,
            content: body.content,
            author: auth.user.id,
            created_at: new Date().toISOString(),
            published: false
          });
          return { status: "created" };
        }
      }
    }
  });