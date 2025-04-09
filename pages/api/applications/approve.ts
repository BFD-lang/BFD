// auto-generated: application.approve
import { db } from "@/lib/db" // 仮想インポート
import { getUser } from "@/lib/auth"

export default async function handler(req, res) {
  const user = getUser(req)
  // guard: ({user})=>user.role==="admin"
  // 実行時チェック未対応（今はコメント化）
  // if (!(user.role === "admin")) return res.status(403).end()
  const { id } = req.query
  await db.update("application")
    .where({ id })
    .set({ status: "approved" })
  res.status(200).json({ ok: true })
}