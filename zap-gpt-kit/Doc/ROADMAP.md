# 🚧 Zap.ts Roadmap

This document outlines the near- and mid-term evolution of Zap.

## ✅ MVP (v0.1) — *“Syntax that runs”*
> Status: Complete ✅

- `defineApp()` DSL with `db`, `api`, `auth`, `events`
- Bun + Hono server (via `zap dev`)
- In-memory DB support (Turso-like)
- CLI tools: `zap dev`, `zap generate`, `zap preview`, `zap init`
- Auto-generated SDK (`useDB`, `useAuth`, etc.)
- Templates: `chat`, `cms`, `ai-log`
- README, docs, and developer philosophy

---

## 🧩 v0.2 — *“Beyond BaaS”*
> ETA: short-term (next few weeks)

- 🔐 Built-in auth with Lucia + JWT fallback
- 🔁 HMAC-signed webhook delivery
- 🧱 Configurable DB engine abstraction (Turso, D1, libSQL)
- 🌍 `zap.config.ts` for environment-specific logic
- 📦 Deploy adapters (e.g. Vercel, Cloudflare)
- ✨ Error overlays, dev logs, DX polish

---

## 🧠 v0.3 — *“Zap Studio & Plugin World”*
> ETA: mid-term

- 🎨 Zap Studio: web-based GUI editor for `zap.ts`
- 🔌 Plugin API for custom generators, auth logic, etc.
- 📈 Admin dashboard / Zap Inspector UI
- 🎯 Runtime validation (Zod / typed DSL enforcement)
- 🧪 `zap test` command (mock API/events testing)

---

## 🔮 v1.0 — *“ZapLang and Cloudless Future”*
> ETA: TBD

- 🧬 `zap.lang`: new DSL layer (YAML/TS hybrid for full-codegen)
- 🤖 GPT-native workflows: structured prompt > DSL > app
- ☁️ Cloudless mode: local-first + edge-deploy abstraction
- 🔄 Live editing, hot reload in Zap Studio
- 🛠 Community registry for templates and plugins

---

## ☑️ Principles That Guide the Roadmap

1. **Speed**: instant feedback, zero-config, no boilerplate
2. **Simplicity**: readable, guessable, GPT-writable syntax
3. **Transparency**: code = structure = execution
4. **Extensibility**: built-in support for plugins & primitives
5. **Local-first**: can build without cloud
6. **AI-native**: optimized for LLM copilots

---

**Zap is just getting started.**
Let’s define the future together ⚡️