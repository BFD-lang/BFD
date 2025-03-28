# NitroPress Syntax Constraints

> A formal list of limitations and restrictions in the NitroPress DSL — designed to protect simplicity, readability, and LLM-friendliness.

---

## ❌ JavaScript Restrictions

### ❌ Disallowed
- Arrow functions: `@click="() => foo()"`
- Function declarations: `function greet() {}`
- JS blocks or conditionals: `if (...) {}`, `for (...) {}`
- Inline anonymous functions or closures
- Curly braces `{}` used outside of `#{}`
- Any kind of script tag (`<script>`, `eval()`, etc.)

### ✅ Allowed
- Simple expressions in attributes: `@click="count++"`, `@input="name = 'Bob'"`
- Signal access with interpolation: `p "Hello #{name}"`

---

## ⚠️ Logic Expression Limits

- All expressions must be **flat and single-line**
- Computed values must be passed as strings to `computed("...")`
- No nested logic or JS chaining (e.g. `count > 5 ? 'High' : 'Low'` is not allowed)

---

## 🧱 Structure Rules

- Every `.nitro` file must contain at least one `route` block
- `html:` block must include both `head:` and `body:`
- No external imports (`import`, `require`, etc.)
- Each `island` must define its own `state:` block

---

## 📦 File Structure Constraints

- One Nitro app = one `.nitro` file
- No multiple `.nitro` files for a single app in MVP
- All UI, state, and behavior must live in the same file

---

## ✅ Enforcement

Use `nitro check` to validate:
- Syntax errors
- Logic violations
- Structural inconsistencies

---

These constraints are intentional.
They make NitroPress:
- Predictable
- AI-compatible
- Debuggable
- Free from legacy complexity

**Write less, mean more.**