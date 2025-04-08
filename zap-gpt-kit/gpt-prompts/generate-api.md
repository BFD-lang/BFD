# 🧠 Prompt: Generate a Zap API endpoint

**Prompt:**
```
Create an API endpoint to fetch all published blog posts.
```

**Expected Output (zap.ts extract):**
```ts
api: {
  getPublishedPosts: {
    method: "GET",
    path: "/posts",
    public: true,
    handler: ({ db }) => db.posts.find({ published: true })
  }
}
```

