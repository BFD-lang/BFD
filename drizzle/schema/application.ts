import { pgTable, serial, text, pgEnum } from "drizzle-orm/pg-core"

export const statusEnum = pgEnum("status", ["draft","reviewing","approved"])

export const application = pgTable("application", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull(),
})
