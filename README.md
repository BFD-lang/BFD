# NitroPress

> ✨ **This is not a SPA. Not an MPA. Not SSR. This is NAR.**  
> **Nitro Architecture for Rendering — a new category of UI.**

NitroPress is a declarative, HTML-first UI grammar designed for the AI era. No JSX. No components. No rehydration. Just one grammar, one file, and real-time performance.

---

## 🚀 What is NitroPress?

NitroPress is a UI language that:

- Uses a **custom DSL** to define UI, state, and routes
- Leverages **signals** for reactive state updates
- Includes **NitroIslands** for scoped reactivity (no VDOM)
- Supports **NitroStream** for 1-line real-time data binding
- Requires **no bundler, no hydration, no JSX**

### 🔥 NAR = Nitro Architecture for Rendering

|          | SPA       | MPA       | SSR       | **NAR**          |
|----------|-----------|-----------|-----------|------------------|
| Render   | JS-heavy  | Full reload | Server-side | **Structure-first** |
| State    | useState  | Global     | Context    | **signal()**      |
| Dynamic  | VDOM      | None       | Hydration  | **Island reactivity** |
| Real-time| Complex   | Hard       | Middleware | **stream**        |
| Format   | JSX       | HTML       | TSX        | **Nitro DSL**     |

---

## ✨ Philosophy

> UI is not a tree. UI is a sentence.

You don't write components — you declare structure.  
You don’t write JavaScript — you describe behavior.  
NitroPress is a **Grammar UI Language**, designed for both humans and AI.

Every line has meaning. Every keyword has purpose.

---

## ⚡ Performance Comparison

| Feature                    | React (Next.js) | Astro       | **NitroPress**        |
|----------------------------|------------------|-------------|------------------------|
| Hydration Cost             | High             | Partial     | **None**               |
| JS Bundle Size             | 100–300kb        | 20–80kb     | **0–5kb (per island)** |
| Lighthouse Score (baseline)| 70–90            | 90–100      | **100**                |
| SSR Complexity             | High             | Medium      | **Minimal**            |
| Re-render Scope            | Global / Diffing | Static      | **Scoped Island**      |
| Build System               | Webpack/Vite     | Vite        | **None (Bun CLI)**     |

**NitroPress is not just fast. It is fundamentally minimal.**

---

## 🔧 Core Syntax (Example)

```nitro
state:
  count = signal(0)

route "/" do
  html:
    head:
      title "NitroPress"
    body:
      h1 "Count: #{count}"
      button @click="count++" "+"
```

---

## 🧠 Designed for LLMs

- Simple, indentation-based grammar
- Explicit scope (state, route, island, stream)
- No noisy symbols or unpredictable structures
- AST-friendly for generation & validation

LLMs can read, write, and refactor `.nitro` files easily.

---

## ⚙️ CLI (Coming soon)

- `nitro dev` — run a dev server (SSR, Bun-powered)
- `nitro build` — output HTML + JS (MPA + Islands)
- `nitro check` — validate DSL (syntax + logic violations)
- `nitro init` — generate example apps

---

## 🧪 Killer Features

### ✅ `island`: fine-grained reactive scopes
```nitro
island Counter:
  state:
    count = signal(0)
  view:
    p "Count: #{count}"
    button @click="count++" "+"
```

### ✅ `stream`: real-time data as a language construct
```nitro
stream metrics from "/api/stream/metrics"

for metric in metrics:
  p "CPU: #{metric.cpu}%, RAM: #{metric.memory}MB"
```

### ✅ `prompt`: LLM function definitions (MVP+)
```nitro
prompt Assistant:
  "You are a helpful assistant."
```

---

## 📚 File Structure Philosophy

- One app = One `.nitro` file
- Everything declared, nothing imported
- Meaningful, readable, and AI-composable

---

## 💬 Get Involved

> This is not the next React.  
> This is the first **NAR language**.  
> Build the grammar of the future.

Follow the journey. Star the repo. Write your own `.nitro` app.

**The era of NAR is here.**