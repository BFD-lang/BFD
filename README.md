# 🚀 JetScript: Define UI, Don't Draw It

> **Note:**
>
> - Declare state in the `state:` block
> - Define UI structure under `view:`
> - Write logic in `script:` functions

---

## ✨ Features at a Glance

### ✅ Minimal Syntax for Defining UI

Say goodbye to bracket hell like `<>{}` in JSX. Use a semantic and readable structure:

```jetscript
p: "Hello, {name}"
```

### ✅ Real-time Reactive State

Signal-based rendering makes state updates seamless:

```jetscript
count += 1
```

No `useState`, no `setState`. Just direct updates.

### ✅ Intuitive Components and Slots

Define components and use named slots naturally:

```jetscript
component Card(title, content):
  div.card:
    h2: "{title}"
    div.content: slot content
```

### ✅ Minimal Styling Syntax

Simple, readable styling with future-proof extensibility:

```jetscript
button:
  class: btn primary
  text: "Click"
```

Tailwind supported. Class abstractions coming soon.

---

## 👤 Who Is JetScript For?

- Startup devs who need fast UI prototyping
- Syntax lovers / DSL geeks tired of React/Vue
- AI × UI generation devs who want LLM-friendly syntax

---

## ❓ Why JetScript?

JetScript shifts from **"drawing UI" to "defining UI"**:

- Shorter than JSX
- Lighter than TypeScript
- More intuitive than Svelte

It removes the fatigue of:

- Re-renders
- State management
- Styling

—all through syntax.

---

## 🛣️ Development Roadmap

- [x] MVP syntax: `state`, `view`, `script`, `bind`, `slot`, `for / if`
- [ ] Signal-based runtime implementation
- [ ] REPL / Playground
- [ ] Component import & module syntax
- [ ] JetScript → HTML/JS transpiler (minimal)

---

## ✍️ Redefine UI with JetScript

**JetScript – the optimized JavaScript for building UI.**  
From the syntax up. Write less. Build more.
