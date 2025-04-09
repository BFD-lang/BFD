import { defineModel, defineTransition, field } from "./zaplang"

export default [
  defineModel("application", {
    fields: {
      id: field.id(),
      title: field.text({ label: "タイトル" }),
      status: field.status(["draft", "reviewing", "approved"])
    },
    transitions: [
      defineTransition("submit", {
        from: "draft",
        to: "reviewing"
      }),
      defineTransition("approve", {
        from: "reviewing",
        to: "approved",
        guard: ({ user }) => user.role === "admin"
      })
    ]
  })
]
