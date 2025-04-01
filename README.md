> **Note:**  
> Declare state in the `state:` block  
> Define UI structure under `view:`  
> Write logic in `script:` functions

---

## ✨ JetScript Features

## ✅ Minimal Syntax for Defining UI

Say goodbye to bracket hell like `<>{}` in JSX.
Instead, use a semantic and readable structure like:

```jetscript
p: "Hello, {name}"
```

---

## ✅ Real-time Reactive State

A signal-based rendering model makes updates intuitive.
Just write:

```jetscript
count += 1
```

This updates the UI automatically.
No need for `useState` or `setState`.

---

## ✅ Intuitive Components and Slots

Define components with clear slot semantics:

```jetscript
component Card(title, content):
  div.card:
    h2: "{title}"
    div.content: slot content
```

---

## ✅ Minimal Styling Syntax

Clean and minimal syntax for styling:

```jetscript
button:
  class: btn primary
  text: "Click"
```

Supports Tailwind and planned class abstractions.

---

## 👤 Who Is JetScript For?

- Startup developers who need fast UI prototyping
- Syntax lovers / DSL geeks tired of React and Vue
- AI × UI generation developers who want LLM-friendly syntax

---

## ❓ Why JetScript?

JetScript shifts from **"drawing UI" to "defining UI."**

- Shorter than JSX
- Lighter than TypeScript
- More intuitive than Svelte

It removes the fatigue of:

- Re-renders
- State management
- Styling

—all through syntax.

---

## 🛣️ Next Step (Development Roadmap)

- MVP syntax: `state / view / script`, `bind`, `slot`, `for / if`
- Signal-based runtime implementation
- REPL / Playground
- Component import / module syntax
- JetScript → HTML/JS transpiler (minimal)

---

## ✍️ Let JetScript Redefine UI

**JetScript – the optimized JavaScript for building UI.**  
From the syntax up.

