# ⚡️ Zap.ts

**Zap.ts** is a next-generation framework-BaaS hybrid that lets you define your entire app using just one file: a declarative TypeScript DSL.

- Instant API & DB with `defineApp()`
- Fully typed SDK generation
- Local-first with Bun + Turso
- CLI-first DX
- GPT-friendly design for the AI-native era

---

## 🚀 Quick Start

```bash
npx create-zap-app my-app
cd my-app
zap dev
```

Then visit [http://localhost:8787](http://localhost:8787) — you're live ⚡️

---

## 💡 Example: `zap.ts`

```ts
export default defineApp({
  db: {
    posts: {
      id: "string",
      title: "string",
      created_at: "datetime",
    },
  },
  api: {
    getPosts: {
      method: "GET",
      path: "/posts",
      public: true,
      handler: ({ db }) => db.posts.all(),
    },
  },
  events: {
    daily: {
      trigger: "cron.daily",
      handler: ({ db }) => {
        const count = db.posts.find({ created_at: within(24, "hours") }).length;
        return webhook("https://slack.com/...", {
          text: `New posts: ${count}`,
        });
      },
    },
  },
});
```

---

## ✨ Features

- 🔧 **CLI-driven**: `zap dev`, `zap generate`, `zap preview`
- ⚡️ **Instant backend**: DB + API from one file
- 🧠 **AI-native**: designed for GPT-based generation & extension
- 🧰 **Templates**: `zap init --template chat`
- 🧪 **Fully local**: no cloud required to start

---

## 📁 Project Structure

```
my-app/
├── zap.ts            # App definition
├── pages/            # UI (Next.js-style)
├── sdk/              # Auto-generated SDK
├── public/           # Static assets
└── README.md
```

---

## 📦 Templates

Use prebuilt templates:

```bash
zap init --template chat
zap init --template cms
zap init --template ai-log
```

---

## 🛠 Roadmap Highlights

- v0.2: Auth with Lucia, HMAC Webhooks, DB Engine switching
- v0.3: GUI Editor (Zap Studio), plugin system, `defineApp()` extensions
- v1.0: ZapLang, GPT plugin mode, Cloudless backend deployments

---

## 🧠 Philosophy

Zap isn’t just another BaaS. It’s:

- a **syntax-driven framework**
- a new way to build MVPs fast
- fully local, fully typed, fully GPT-compatible

> **“If you can describe your app, Zap can build it.”**

---

Made with ⚡️ by future-thinkers.

---
