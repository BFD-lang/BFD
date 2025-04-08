// test-sdk.ts
import { useDB, hello, useAuth } from '../sdk'

// --- test useDB ---
const db = useDB("user")

const run = async () => {
  console.log("🧪 DB list:")
  const users = await db.list()
  console.log(users)

  console.log("🧪 DB insert:")
  const newUser = await db.insert({ name: "Sally" })
  console.log(newUser)

  console.log("🧪 API call:")
  const res = await hello()
  console.log(res)

  console.log("🧪 Auth mock:")
  const auth = useAuth()
  console.log(auth.user)
}

run()
