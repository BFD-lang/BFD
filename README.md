# 🚀 JetScript 
Made by a 22 y/o
## 🚀 Built in 14 hours. For MVPs, Hackathons, and rebels. 
![JetScript Screenshot](https://github.com/jetscript-lang/JetScript/blob/master/assets/jetscript.png)


**The poetic, startup-native scripting language.**  
Build MVPs like never before. No toolchains, no ceremony — just flow.

---

## 🤯 Why JetScript?

You love building.  
But JavaScript (and TypeScript) got... heavy.

- Toolchains everywhere: `npm`, `vite`, `tsc`, `babel`, `eslint`, `jest`, ...
- Boilerplate over creativity
- JSX fatigue, routing madness, global state hell

**JetScript** is a new scripting language for creators who want **speed**, **clarity**, and **poetry**.

---

## ✨ What is JetScript?

> "If JavaScript were reimagined for flow, not complexity."

JetScript is:

- 🌀 **Poetic syntax**: write like you think
- ⚡️ **Instant MVP dev**: UI, state, and routing in one file
- 🚀 **Zero build / instant run**: powered by Bun
- 🌊 **Born from Mizulang** — code should flow like water

---

## 📦 Example: Hello Counter

```jetscript
route "/" do
  state count = 0

  view:
    h1 "Count: #{count}"
    button { onclick: inc(count) } "＋"
```

✔️ No imports  
✔️ No JSX  
✔️ No hooks  
✔️ Just your idea, in code

---

## 😵 JSX vs ✨ JetScript

| Feature           | JSX / React (TypeScript) | JetScript                  |
|-------------------|---------------------------|----------------------------|
| **UI syntax**     | `<div>{state}</div>`      | `view: div "#{state}"`     |
| **State**         | `useState`, `setState`    | `state count = 0`          |
| **Events**        | `onClick={() => ...}`     | `onclick: inc(count)`      |
| **Build setup**   | npm install → vite → build| `jets run app.jet`         |
| **File structure**| Multiple files, layers    | Single-file app            |
| **Hooks complexity** | `useEffect`, `useRef`, etc. | DSL-based simplicity |
| **Readability**   | Verbose, nested           | Clean and poetic           |
| **Learning curve**| Steep (TS, JSX, tooling)  | Low (natural DSL)          |
| **MVP speed**     | Slower, tool-heavy        | Lightning fast             |

> JSX is for browsers. **JetScript is for builders.**

---


## 🛠 Features

| Feature         | JetScript                 |
|-----------------|---------------------------|
| Build toolchain | ❌ None                    |
| JSX             | ❌ Nope                    |
| State           | ✅ `state count = 0`       |
| Routing         | ✅ `route "/" do`          |
| CLI             | ✅ `jets run`              |
| Philosophy      | ✅ Flow, clarity, expression |

---

## 🎯 Who It's For

| User             | Why JetScript                            |
|------------------|-------------------------------------------|
| 🧑‍🚀 Startup Founders | Build MVPs faster than ever          |
| 🧑‍🎨 Indie Hackers    | 1 file = full UI + logic             |
| 🧑‍🏫 Educators        | Teach with clear, poetic syntax      |
| 🤖 LLM Developers     | LLM-friendly code generation         |

---

## 🌱 Philosophy

> *"JetScript is built not just to run fast,*  
> *but to let your ideas flow as code."*

We believe **code is expression**.  
It should be simple, beautiful, and creative.

JetScript is based on the poetic foundations of **Mizulang**, reimagined for the startup age.

---

## 🗺 Roadmap

| Version | Features                          |
|---------|-----------------------------------|
| v0.1    | Core runtime + DSL (✅ done)      |
| v0.2    | `fn`, `if`, improved AST          |
| v0.3    | CLI (`jets`) + Playground         |
| v0.4    | Module system (JetModules)        |
| v1.0    | OSS stable release                |

---

## 🧑‍💻 Contributing

JetScript is young and wild.  
We welcome **explorers**, **poets**, and **rebels**.  
Star the repo, try it out, and open an issue!

---

## 📡 Follow the Journey

🧵 [@structax on X (Twitter)](https://twitter.com/structax)  
🌐 JetScript.dev/play (coming soon)

---

## ⚖️ License

MIT — use it, fork it, remix it, build with joy.
