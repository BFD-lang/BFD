// auto-generated: application.submit
import { db } from "@/lib/db" // 仮想インポート
import { getUser } from "@/lib/auth"

export default async function handler(req, res) {
  const user = getUser(req)
  const { id } = req.query
  await db.update("application")
    .where({ id })
    .set({ status: "reviewing" })
  res.status(200).json({ ok: true })
}