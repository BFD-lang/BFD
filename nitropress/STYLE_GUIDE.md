# NitroPress Style Guide

> Consistency and elegance in `.nitro` code — for humans, AIs, and future readers alike.

---

## ✨ Philosophy

NitroPress is not just about syntax. It's about **clarity, simplicity, and semantic structure**. This style guide ensures that every `.nitro` file remains clean, readable, and composable by both humans and LLMs.

---

## 📐 Formatting Rules

### Indentation
- Use **2 spaces** per indent level (no tabs)
- Indentation is meaningful and defines scope (YAML-style)

### Line Length
- Keep lines under **80 characters** when possible

### Block Separation
- Leave **1 empty line** between major blocks (e.g. `state:`, `route`)
- Avoid multiple empty lines in a row

### Comments
- Avoid unless strictly necessary
- Prefer meaningful names and structure over comments
- If needed, use `#` (single-line only)

---

## 🔠 Naming Conventions

### Variables (signals, computed)
- Use `snake_case`: `user_name`, `cpu_usage`
- Descriptive but concise

### Island and Stream names
- Use `PascalCase`: `ChatIsland`, `CPUMonitor`
- Match component-like naming style

### Route paths
- Always use string literals: `route "/" do`

---

## 💡 Expression Style

### Interpolation
```nitro
p "Welcome, #{user_name}"
```
- Always use `#{}` for signal values

### Event handlers
```nitro
button @click="count++" "+"
```
- Keep expressions short and direct
- No function definitions or JS chaining

### Computed
```nitro
state:
  doubled = computed("count * 2")
```
- Use double-quoted string for computed expressions

---

## 📁 File Structure

- One Nitro app = One `.nitro` file (in MVP)
- Place examples in `examples/`
- Do not split UI into multiple `.nitro` files

---

## ✅ Best Practices

- Place `state:` at the top of each file or island
- Keep routes clear and shallow (no nested routing yet)
- Favor `stream` + `for` over manual API fetch logic
- Use `island` for anything reactive — keep global state minimal

---

## 🤖 For LLM Compatibility

- Avoid non-standard symbols or patterns
- Ensure predictable indentation and structure
- Keep grammar consistent across all `.nitro` files

---

Follow this guide and your `.nitro` files will remain elegant, efficient, and future-proof.

**NitroPress is not just a language — it’s a style.**