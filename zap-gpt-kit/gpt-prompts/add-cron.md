# 🧠 Prompt: Add a cron event to Zap

**Prompt:**
```
Add a daily cron event that counts the number of new posts and sends a Slack notification.
```

**Expected Output (zap.ts extract):**
```ts
events: {
  dailyDigest: {
    trigger: "cron.daily",
    handler: ({ db }) => {
      const recent = db.posts.find({ created_at: within(24, "hours") });
      return webhook("https://slack.com/...", {
        text: `📝 ${recent.length} new posts today`
      });
    }
  }
}
```

