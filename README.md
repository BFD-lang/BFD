# ZapLang

**ZapLang** is a backend-first, full-stack TypeScript DSL framework where everything except the view layer is defined in a single file: `zap.config.ts`.

It introduces the concept of **Zero Responsibility UI** — the frontend has no business logic, no state, no validation, no API knowledge. It simply reflects what the backend defines.

---

## 🚀 What is ZapLang?

ZapLang is a **declarative, type-safe application framework** where the backend defines:

- Database schema
- API routes
- Event handlers
- Auth & policies
- State transitions

...and the frontend becomes just a **projection layer**.

---

## 🧠 Core Philosophy

- **Backend owns logic, state, and flow**
- **Frontend does nothing but reflect** backend-defined state
- **State is stored in the database or declared in logic DSL**
- **Policies and permissions are enforced server-side only**
- **UI is stateless and functional**

---

## 💡 The "Zero Responsibility UI" Model

| Concern            | Where It Lives       | Notes                           |
| ------------------ | -------------------- | ------------------------------- |
| App State          | ZapLang DSL & DB     | useState? Never heard of it.    |
| Business Logic     | Handlers             | Pure backend TS functions       |
| Permissions        | `policies` in DSL    | Fully enforced server-side      |
| State Transitions  | `transitions` in DSL | UI just calls `useTransition()` |
| Forms & Validation | Handlers             | No need for frontend schemas    |
| Routing Logic      | State-driven in DSL  | UI shows current state only     |

---

## 📦 Folder Structure

```bash
my-zap-app/
├ zap.ts       # The heart of the app (DSL config)
├ handlers/           # Backend logic functions
├ pages/              # UI templates (thin components)
├ sdk/                # Auto-generated useAPI, useDB, etc.
├ zap.dev.ts          # Local server using Deno.serve()
```

---

## ✨ Example

```ts
// zap.config.ts
export default defineZap({
  db: {
    tasks: {
      id: "string",
      title: "string",
      status: "enum(draft, submitted, approved)",
      assignedTo: "string",
    },
  },
  api: {
    submitTask: {
      method: "POST",
      path: "/tasks/:id/submit",
      handler: "handlers/submitTask.ts",
    },
  },
  logic: {
    transitions: {
      submitTask: {
        from: "draft",
        to: "submitted",
        guard: "user == record.assignedTo",
      },
    },
  },
});
```

```tsx
// pages/TaskList.tsx
import { useDB, useAPI } from "@/sdk";

export default function TaskList() {
  const { data } = useDB("tasks");
  const { mutate } = useAPI("submitTask");

  return (
    <ul>
      {data.map((task) => (
        <li key={task.id}>
          {task.title}
          <button onClick={() => mutate({ id: task.id })}>Submit</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 🔧 CLI

```bash
npx create-zapts-app my-zap-app
cd my-zap-app
npm install
npm run zap generate all
npm run dev

```
---

## 🛠 Maintenance Notice

We are currently in the process of reorganizing the Git history to remove some mistakenly committed large files.

ZapLang is **actively maintained**, and the source code will be re-pushed shortly in a cleaner, lighter format.

Thank you for your continued interest and support — and if you’ve already starred this project, you’re amazing ❤️

---

## 🔮 Summary

ZapLang is a **backend-declared application framework** where structure, logic, state, and flow are all centralized.

- Define once in `zap.config.ts`
- Generate everything: SDKs, pages, routes
- Eliminate frontend state bugs
- Deploy instantly via Deno

> Define it. Run it. Trust it.

Welcome to the era of **Zero Responsibility UI** ✨
