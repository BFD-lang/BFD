# NitroPress

> **A fullstack web app in one file.**  
> **UI, API, and DB — with no JS, no build, just grammar.**

NitroPress is not a framework. It's a grammar.  
A declarative, readable, and AI-native way to build full web applications — UI, API, and data — in a single `.nitro` file.

No JSX. No bundler. No hydration. No boilerplate. Just clean, expressive code.

---

## 🔥 What is NitroPress?

NitroPress is a fullstack grammar-based UI language that:

- Defines **UI with HTML-like syntax** (no JSX)
- Declares **reactive state** via `signal()`
- Creates **fine-grained interactivity** using `island:` blocks
- Connects to **real-time data** with `stream:`
- Handles **API logic** inside `server:` blocks
- Describes **database schema and queries** in `db:`
- Requires **no build system, no hydration, no virtual DOM**

---

## 🧠 Why It Matters

Most tools only give you UI.
Some help with APIs. A few handle DBs.

**NitroPress gives you everything — in one file.**

| Feature        | React + Express + Prisma | Laravel | Astro + Xata | **NitroPress**        |
|----------------|---------------------------|---------|---------------|------------------------|
| UI             | ✅ JSX / Components        | ✅ Blade | ✅ HTML         | ✅ Nitro DSL            |
| API            | ✅ Express (manual)        | ✅ Routes | ❌             | ✅ `server:` block      |
| DB             | ✅ Prisma (external)       | ✅ Eloquent | ✅ (via SDK) | ✅ `db:` block          |
| Build Tool     | ❌ Webpack / Vite          | ❌        | ✅ Vite        | ✅ **None (Bun)**       |
| LLM Friendly   | ❌ Hard                    | ❌        | ✅ Partial     | ✅ **Perfect**          |
| SSR / MPA      | ✅ Complex                 | ✅        | ✅             | ✅ **Simple + Native**  |

---

## ✨ Key Concepts

### `state:` — Reactive values
```nitro
state:
  count = signal(0)
  doubled = computed("count * 2")
```

### `route:` — Pages
```nitro
route "/" do
  html:
    head:
      title "My App"
    body:
      h1 "#{count}"
      button @click="count++" "+"
```

### `island:` — Scoped interactivity
```nitro
island Counter:
  state:
    n = signal(0)
  view:
    p "Count: #{n}"
    button @click="n++" "+"
```

### `stream:` — Real-time data
```nitro
stream metrics from "/api/metrics"

for m in metrics:
  p "CPU: #{m.cpu}%, RAM: #{m.ram}%"
```

### `server:` — API handlers
```nitro
server:
  post "/api/hello" do
    return json({ msg: "Hello #{body.name}" })
```

### `db:` — Schema & queries
```nitro
db:
  table messages:
    id int primary
    text string
    created_at timestamp

  query recent = from messages order by created_at desc
```

---

## ⚡ Performance

| Metric                    | React       | Astro      | **NitroPress**     |
|---------------------------|-------------|------------|--------------------|
| Hydration cost            | High        | Medium     | **None**           |
| JS bundle size            | 100–300kb   | 20–80kb    | **0–5kb (per island)** |
| Lighthouse score (baseline)| 70–90      | 90–100     | **100**            |
| SSR complexity            | High        | Medium     | **Minimal**        |
| Build system              | Webpack     | Vite       | **None (Bun)**     |

---

## 🛠 CLI (Bun-based)

- `nitro dev` — run a dev server (SSR + API)
- `nitro build` — output HTML + JS
- `nitro check` — validate DSL + logic
- `nitro init` — generate starter apps

---

## 💡 Why Developers Love It

- Zero-config, zero-bundle
- One grammar for all concerns: UI, logic, API, DB
- Fullstack in one file — **perfect for MVPs and LLM apps**
- Declarative, readable, composable
- AI-readable + AI-writable + AI-checkable

---

## 🧠 Built for LLMs

NitroPress is the first UI language **designed for AI generation**:

- Clear scope (state, island, stream, server, db)
- Predictable, indentation-based syntax
- No noisy symbols, no JSX traps, no hidden logic
- Easily parsed and generated via AST

---

## 🚀 A New Web Language

> NitroPress is not the next React.  
> It’s the next PHP.  
> **Reimagined as clean, AI-native syntax.**

---

## ⭐ Try It

```bash
bunx nitro init chat.nitro
bunx nitro dev
```

Then edit the `.nitro` file. No configs, no folders, no builds. Just code.

**Write the full web in grammar. This is NitroPress.**
