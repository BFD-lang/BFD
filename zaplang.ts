// zaplang.ts

export function defineModel(name: string, config: {
    fields: Record<string, any>
    transitions: any[]
  }) {
    return { name, ...config }
  }
  
  export function defineTransition(name: string, config: {
    from: string
    to: string
    guard?: (ctx: any) => boolean
  }) {
    return { name, ...config }
  }
  
  export const field = {
    id: () => ({ type: "id" }),
  
    text: (options?: { label?: string }) => ({
      type: "text",
      ...options,
    }),
  
    status: (states: string[]) => ({
      type: "status",
      states,
    })
  }
  