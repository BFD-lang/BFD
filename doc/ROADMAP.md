
## 🛠 Development Roadmap

### 🚧 Phase 1 — CLI + AST Engine (Foundation)
Goal: Build a CLI that parses `.bfd` files and runs them locally

- `bfd-dev` CLI (`npx bfd-dev` or `bunx bfd-dev`)
- Parser to convert `.bfd` to AST (PEG.js or Chevrotain)
- Route → HTML generator
- Server → Bun HTTP + API routing
- DB → SQLite (better-sqlite3)

**Tasks:**
- Implement parser (v0.1 scope only)
- Define AST (modular by section)
- Translate DSL to executable logic
- Complete sample template (`Hello`, `Login`)

### 🧪 Phase 2 — Web Playground (MVP Launch)
Goal: Browser-based execution of BFD syntax

Tech stack:
- Frontend: Next.js + Monaco Editor + Sandpack or iframe preview
- Backend: Cloudflare Workers or Bun server bridge

**Tasks:**
- Monaco editor integration
- "Run" button → AST transform → preview rendering
- Emulate DB with dummy data or localStorage
- Sample templates: login, todo, chat, form

> 🎯 This phase unlocks the "magic moment": 1 file = fully working app.

### 🤖 Phase 3 — GPT Integration
Goal: Use natural language to generate BFD code via GPT

**Tasks:**
- Create custom GPT: “BFD Developer”
- Add GPT UI: e.g., “Make a login form” → outputs `.bfd` code
- Auto-inject generated code into playground

### 🌐 Phase 4 — OSS Launch + Feedback + v1 Spec
Goal: Publish BFD as OSS and evolve it with community input

**Tasks:**
- Open-source on GitHub (`bfd-lang/bfd`)
- Post to Hacker News: “BFD — AI-native DSL for Web”
- Launch Discord or Slack community
- Docs & demo gallery on [bfd.dev](https://bfd.dev)

---

## 🕒 Launch Timeline (Aggressive Mode)

| Week     | Phase         | Milestone                              |
|----------|---------------|----------------------------------------|
| Week 1   | Phase 1 Start | Define parser/CLI structure, first demo |
| Week 2–3 | Phase 1 Dev   | `.bfd` runnable via CLI                |
| Week 4–5 | Phase 2 Dev   | MVP playground: editor + live preview  |
| Week 6   | Phase 3 Start | GPT integration, prompt-to-code UX     |
| Week 7   | Playground Go | Soft launch via Twitter / HN           |
| Week 8   | Phase 4 Start | OSS + community + v1 spec discussions  |

---

