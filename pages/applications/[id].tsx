import { useRouter } from "next/router"
import { useDB } from "@/lib/db"
import { ZapButton } from "@/components/ZapButton"

export default function ApplicationPage() {
  const router = useRouter()
  const app = useDB("application", { realtime: true, id: router.query.id })
  if (!app) return <div>Loading...</div>
  return (
    <div>
      <h1>{app.title}</h1>
      <p>Status: {app.status}</p>
      
      <ZapButton transition="submit" model="application" id={app.id} />
      // guard: ({user})=>user.role==="admin"
      <ZapButton transition="approve" model="application" id={app.id} />
    </div>
  )
}