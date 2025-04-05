# BFD — Backend's Initiative Fullstack DSL

*A declarative fullstack syntax for the LLM era. One file. Every layer.*

---

## 🌐 What is BFD?

**BFD (Backend's Initiative Fullstack DSL)** is a new web syntax designed for the AI era. It unifies UI, API, and database logic into a single, declarative `.bfd` file — optimized for both human readability and GPT generation.

This is not a framework. It’s a **language-level syntax** for building fullstack apps with:

- ✨ Zero JSX, no JavaScript required
- 🧠 GPT-friendly syntax (minimal symbols, semantic structure)
- ⚡ Runs on Bun + SQLite
- 🌍 Edge-ready architecture

> "This app runs on BFD." — the next badge of honor for modern developers.

---

## 🔥 Why Now?

- Web complexity is exploding: UI, APIs, DBs, auth — all fragmented
- React/Next.js paradigms are bloated and frontend-heavy
- Firebase/Supabase offer convenience, but limited flexibility
- LLMs demand **semantically meaningful, AI-readable syntax**

👉 It's time for a new paradigm: **a unified, backend-first syntax for the AI-native stack**

---

## 🧠 BFD Philosophy

BFD isn’t a comeback of PHP — it’s a rethinking of web development **from the perspective of AI collaboration**:

- Declarative, symbolic-light syntax
- No JavaScript, JSX, or boilerplate
- Full integration: UI + API + DB in one file
- Built for GPT agents to read, write, and reason about

BFD is the language of **design, execution, and AI dialogue.**

---

## ✍️ Example: `hello.bfd`

```bfd
route "/" do
  data:
    greeting: "Hello :name"

  html:
    h1 greeting
    form @submit="/api/login":
      input name="email"
      button "Login"

server:
  post "/api/login" do
    user = db.users.insert({ email: body.email })
    return json({ ok: true, name: body.email })

db:
  table users:
    id int primary
    email string
```

✅ UI + API + DB = One file
✅ Instantly executable
✅ LLM-ready syntax

---

## 🚀 Quick Start (coming soon)

```bash
npx bfd-dev new my-app
cd my-app
bfd-dev dev
```

Live playground coming soon: [https://bfd.dev](https://bfd.dev)

---

## 📐 BFD Structure Overview

| Section   | Description                         |
|-----------|-------------------------------------|
| `route`   | Define routes and data binding      |
| `html`    | Semantic HTML structure             |
| `server`  | Backend logic (API routes)          |
| `db`      | Data schema and operations          |
| `data:`   | Injected data for rendering         |

Future additions:
- `state:` — Local state declarations
- `component:` — Reusable UI structures
- `auth:` — Authentication logic

---

## 📊 Comparison

| Feature      | Laravel | Next.js | Firebase | **BFD**          |
|--------------|---------|---------|----------|------------------|
| UI           | ✅ Blade | ✅ JSX  | ❌       | ✅ `html:` DSL   |
| API          | ✅       | ✅      | ✅       | ✅ `server:` DSL |
| DB           | ✅ ORM   | ✅ ORM | ✅       | ✅ `db:` DSL     |
| CLI/Build    | ⚠️       | ✅      | ⚠️        | ✅ Bun-based CLI |
| AI-Ready     | ❌       | ❌      | ⚠️        | ✅ Semantic Core |

---

## 🧭 Roadmap

| Version | Features                                     |
|---------|----------------------------------------------|
| v0.1    | MVP: `route`, `server`, `db`, `data` syntax  |
| v0.2    | Add: `state`, `component`, `auth`, `redirect`|
| v0.3    | Playground UI, GPT CLI, Edge deploy support  |
| v1.0    | OSS release, BFD Spec, VSCode extension      |

---

## 🧬 Vision

BFD is not just a framework — **it’s a new web language**.  
A syntax that is readable by humans, writable by LLMs, and executable on the edge.

The `.bfd` file is your **design doc**, **runtime**, and **AI interface** — all in one.

> The future of web syntax is declarative, semantic, and unified.

---

## 🤝 Join the Movement

- GitHub: *coming soon…*
- Docs & Playground: [https://bfd.dev](https://bfd.dev)
- Discord Community: launching soon

💬 **Tired of React? Curious about AI-native coding?**  
Let’s redefine the web — one syntax at a time.