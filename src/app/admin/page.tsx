
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona por padrão para a gestão, mas o usuário deve usar as novas rotas
    router.push("/admin-posto")
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Redirecionando...</p>
      </div>
    </div>
  )
}
