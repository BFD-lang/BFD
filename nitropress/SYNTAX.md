# NitroPress Syntax Reference

> The official grammar of the NitroPress DSL — designed for clarity, performance, and AI-readability.

---

## 🔤 Core Syntax Rules

### 🧱 Indentation
- Uses indentation-based block structure (similar to YAML / Python)
- Indent with **2 spaces**
- Blocks include: `state:`, `route`, `html:`, `head:`, `body:`, `island:`, `stream:`

### 🔡 Identifiers
- Use snake_case for state variables
- Avoid reserved words (e.g., `route`, `html`, `island`, `stream`, `signal`)

### 💬 Strings
- Wrapped in double quotes: `"Hello"`
- No template literals or backticks

### 🧮 Interpolation
- Use `#{...}` to embed signal values in UI:
```nitro
p "Count: #{count}"
```

---

## ⚙️ Sections

### 1. `state:` — Reactive state declarations
```nitro
state:
  name = signal("Jet")
  count = signal(0)
  doubled = computed("count * 2")
```
- `signal(value)` creates reactive state
- `computed("expression")` defines derived values (string-based to prevent raw JS)

---

### 2. `route "/path" do` — Page routing
```nitro
route "/" do
  html:
    head:
      title "Welcome"
    body:
      h1 "Hello"
```
- Each route defines a new page
- Multiple routes are allowed

---

### 3. `html:` — DOM structure
- Must contain `head:` and `body:` blocks
```nitro
html:
  head:
    title "My Page"
  body:
    h1 "Welcome"
```
- Use standard HTML-like elements: `div`, `p`, `form`, `input`, etc.
- Custom elements like `chart`, `bar` may be added

---

### 4. `@event="expression"` — Event bindings
```nitro
button @click="count++" "+"
```
- Only allow simple expressions (no functions, no curly braces)
- Supported: `@click`, `@input`, `@submit`, etc.

---

### 5. `island Name:` — Reactive scoped components
```nitro
island Counter:
  state:
    count = signal(0)
  view:
    button @click="count++" "+"
    p "#{count}"
```
- Island DOM is re-rendered on signal change
- Only signals declared within the island are tracked
- Can be embedded in `html:`

---

### 6. `stream name from "/api/stream"`
```nitro
stream metrics from "/api/metrics"

for m in metrics:
  p "CPU: #{m.cpu}"
```
- Automatically binds SSE/WebSocket to the variable
- Used in `for x in stream_name:` loops

---

### 7. `prompt Name:` (future / LLM feature)
```nitro
prompt Assistant:
  "You are a helpful assistant."
```
- Defines LLM agent behavior (MVP+)
- Useful for AI-native UI construction

---

## ❌ JS Restrictions

- No function expressions, arrow functions, `eval`, or blocks:
  - ❌ `@click="() => doSomething()"`
  - ❌ `if (...) {}`
- Only simple inline ops allowed: `count++`, `name = "foo"`
- DSL-only. No `<script>` tags allowed

---

## ✅ Best Practices

- Use `signal` for every mutable value
- Only use `island` for UI parts that must re-render
- Keep logic out of templates — push into signals / computed
- Use `nitro check` to validate expressions and structure

---

This syntax is designed to be:
- **Readable** by humans
- **Writable** by LLMs
- **Executable** without bundlers
- **Declarative** from start to finish

Welcome to the grammar of NAR.

