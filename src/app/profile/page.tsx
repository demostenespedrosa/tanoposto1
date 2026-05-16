
"use client"

import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Settings, Bell, Shield, LogOut, ChevronRight, CreditCard, History, HelpCircle } from "lucide-react"

export default function ProfilePage() {
  const menuItems = [
    { icon: History, label: "Histórico de Abastecimento", color: "text-blue-500" },
    { icon: CreditCard, label: "Métodos de Pagamento", color: "text-green-500" },
    { icon: Bell, label: "Notificações", color: "text-orange-500" },
    { icon: Shield, label: "Segurança e Privacidade", color: "text-purple-500" },
    { icon: HelpCircle, label: "Ajuda e Suporte", color: "text-slate-500" },
    { icon: Settings, label: "Configurações", color: "text-slate-500" },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50">
      <div className="max-w-lg mx-auto px-4 space-y-6">
        
        {/* Header Perfil */}
        <header className="flex flex-col items-center py-6 space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-primary flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 p-1.5 bg-green-500 border-2 border-white rounded-full shadow-sm" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-headline font-bold text-slate-800">João Silva</h2>
            <p className="text-xs text-muted-foreground font-medium">joao.silva@email.com</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-none py-1 px-4 font-bold uppercase tracking-widest text-[10px]">Nível Platina</Badge>
        </header>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Viagens", val: "42" },
            { label: "Economia", val: "R$ 420" },
            { label: "Membro", val: "2 anos" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-50 text-center">
              <p className="text-lg font-headline font-bold text-slate-800">{stat.val}</p>
              <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu de Opções */}
        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <button 
              key={i} 
              className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-center justify-between transition-colors hover:bg-slate-50 active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-2 bg-slate-50 rounded-xl", item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-700">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <Button 
          variant="ghost" 
          className="w-full h-14 rounded-2xl text-destructive hover:text-destructive hover:bg-destructive/5 font-bold flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" /> SAIR DA CONTA
        </Button>

        <div className="text-center">
          <p className="text-[10px] text-muted-foreground font-mono">Tá no posto v2.4.0 • Made with ❤️ in Brazil</p>
        </div>

      </div>
      <Navigation />
    </main>
  )
}
