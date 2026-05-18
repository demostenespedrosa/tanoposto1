"use client"

import { Navigation } from "@/components/Navigation"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Star, ArrowLeft, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RewardsPage() {
  return (
    <ProtectedRoute allowedRoles={['cliente']}>
      <main className="min-h-screen pb-32 pt-12 bg-[#F2F2F7] text-black">
        <div className="max-w-lg mx-auto px-6 space-y-8">
          <header className="flex items-center gap-4">
            <Link href="/client">
              <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm border border-black/5">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Recompensas</h1>
          </header>

          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-black/[0.02] flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-[#FF9500]/10 rounded-3xl flex items-center justify-center">
              <Star className="w-10 h-10 text-[#FF9500]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">1.250 Pontos</h2>
              <p className="text-sm text-[#8E8E93]">Você está no nível <span className="text-primary font-bold">Prata</span></p>
            </div>
            <div className="w-full bg-[#F2F2F7] h-2 rounded-full overflow-hidden">
              <div className="bg-[#FF9500] h-full w-[65%] rounded-full" />
            </div>
            <p className="text-xs text-[#8E8E93] font-medium">Faltam 750 pontos para o nível Ouro</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Próximos Prêmios</h3>
            <div className="bg-white rounded-3xl p-5 border border-black/[0.02] flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#AF52DE]/10 flex items-center justify-center text-[#AF52DE]">
                <Gift className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">Café Expresso Grátis</p>
                <p className="text-xs text-[#8E8E93]">Resgate com 500 pontos</p>
              </div>
              <Button disabled size="sm" className="rounded-xl">Resgatar</Button>
            </div>
          </section>
        </div>
        <Navigation />
      </main>
    </ProtectedRoute>
  )
}
