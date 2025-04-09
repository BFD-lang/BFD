import type { Config } from "drizzle-kit"

export default {
  schema: "./drizzle/schema",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  }
} satisfies Config
