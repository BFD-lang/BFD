// lib/db.ts（スタブ）

export const db = {
    update: (table: string) => ({
      where: (cond: any) => ({
        set: (values: any) => {
          console.log("[mock db] UPDATE", table, cond, values)
          return Promise.resolve()
        }
      })
    })
  }
  