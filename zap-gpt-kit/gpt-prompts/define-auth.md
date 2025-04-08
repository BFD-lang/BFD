# 🧠 Prompt: Define auth configuration in Zap

**Prompt:**
```
Set up authentication using email and define two roles: admin and editor.
```

**Expected Output (zap.ts extract):**
```ts
auth: {
  provider: "email",
  roles: ["admin", "editor"]
}
```

