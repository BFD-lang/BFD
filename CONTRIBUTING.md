# Contributing to NitroPress

Thank you for wanting to contribute to **NitroPress** —  
a grammar-first, fullstack, no-JS web language built for clarity and structure.

This project is not just about code.  
It’s about reclaiming the joy of writing UI, logic, and data in one simple, readable grammar.  
It’s a movement toward structure, not scaffolding.

---

## 😊 How You Can Help

We welcome contributions of all kinds:

### 🧱 Code & CLI
- Improve the core `nitro` CLI (written in Bun)
- Fix parser bugs or suggest grammar edge cases
- Add new DSL blocks (with a strong rationale)

### 🧠 Language & Grammar Design
- Propose syntax refinements that keep grammar readable
- Improve how `state:`, `stream:`, `server:` are parsed or composed
- Help us define what stays "in grammar" and what stays out

### 📦 Examples & Docs
- Add example `.nitro` files (chat, dashboard, AI apps, etc)
- Improve the README or create mini-tutorials
- Translate docs or create local community guides

### 🤖 LLM Integrations
- Build tools that convert `.nitro` files to/from JSON/AST
- Add support for prompt-aware agents
- Improve AI parsing / completion with NitroLang

---

## 🚀 Getting Started Locally

```bash
git clone https://github.com/yourname/nitropress.git
cd nitropress
bun install
bun run dev
```

You can test the CLI with:
```bash
bunx nitro init demo.nitro
bunx nitro build demo.nitro
```

---

## 📖 Code Style

- Use **plain Bun (ESM)**, no TypeScript
- Keep everything minimal and readable
- Match the structure of `/parser`, `/cli`, and `/runtime`
- All new features must include a `.nitro` test example

---

## 📃 Grammar Philosophy

> NitroPress is not a framework. It is a grammar.

Please:
- Avoid clever abstractions that obscure readability
- Favor clarity over power
- Prioritize code that a **LLM could read or generate**
- Remember: this is for **humans first**, **machines second**

---

## ✨ Ready to Join?

Feel free to open issues, start discussions, or just drop a `.nitro` idea.  
Let’s build a new era of structure-first, AI-native, expressive web grammar — together.

**Welcome to the Grammar Movement.**

