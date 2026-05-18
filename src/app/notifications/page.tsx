"use client"

import { Navigation } from "@/components/Navigation"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Bell, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotificationsPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
          </header>

          <section className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-black/5">
              <Bell className="w-10 h-10 text-[#8E8E93]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Tudo em dia</h2>
              <p className="text-sm text-[#8E8E93]">Você não tem notificações novas por enquanto.</p>
            </div>
          </section>
        </div>
        <Navigation />
      </main>
    </ProtectedRoute>
  )
}
