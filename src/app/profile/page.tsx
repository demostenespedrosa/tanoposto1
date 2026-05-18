
"use client"

import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Settings, Bell, Shield, LogOut, ChevronRight, CreditCard, History, HelpCircle, Store, UserCheck, Building2, Loader2, Fuel, TrendingUp, Wallet, Star, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const menuItems = [
    { icon: History, label: "Histórico de Abastecimento", color: "text-blue-500", href: "#" },
    { icon: CreditCard, label: "Métodos de Pagamento", color: "text-green-500", href: "#" },
    { icon: Bell, label: "Notificações", color: "text-orange-500", href: "#" },
    { icon: Building2, label: "Portal da Empresa (Gestor)", color: "text-blue-600", href: "/admin-empresa" },
    { icon: Store, label: "Gestão do Posto (Dono)", color: "text-purple-500", href: "/admin-posto" },
    { icon: UserCheck, label: "Operação Frentista", color: "text-slate-700", href: "/frentista" },
    { icon: Settings, label: "Configurações", color: "text-slate-500", href: "#" },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50 text-slate-900 animate-in fade-in duration-500">
      <div className="max-w-lg mx-auto px-4 space-y-8">
        
        {/* Header Perfil - Estilo Premium */}
        <header className="flex flex-col items-center py-8 space-y-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -z-10"></div>
          <div className="relative group">
            <div className="w-28 h-28 rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-[1.05] duration-500 ring-1 ring-slate-100">
              {user?.photoURL ? (
                <Image src={user.photoURL} alt={user.displayName || "User"} fill className="object-cover" />
              ) : (
                <span className="text-4xl font-headline font-bold text-white uppercase italic tracking-tighter">
                  {user?.displayName ? user.displayName.substring(0, 2) : "JS"}
                </span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 p-2.5 bg-green-500 border-4 border-white rounded-2xl shadow-lg ring-1 ring-slate-100">
              <UserCheck className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-3xl font-headline font-bold text-slate-800 tracking-tight italic uppercase">{user?.displayName || "João Silva"}</h2>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">{user?.email || "usuario@loop.com.br"}</p>
          </div>
          <Badge className="bg-slate-900 text-primary border-none py-1.5 px-6 font-bold uppercase tracking-widest text-[9px] rounded-full shadow-lg">MEMBRO PREFERENCIAL</Badge>
        </header>

        {/* Estatísticas Rápidas Estilizadas */}
        <section className="grid grid-cols-3 gap-4">
          {[
            { label: "Viagens", val: "42", icon: Fuel },
            { label: "Economia", val: "R$ 420", icon: TrendingUp },
            { label: "Membro", val: "2 anos", icon: Star }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 text-center space-y-1 group hover:scale-[1.05] transition-all">
              <stat.icon className="w-4 h-4 text-primary mx-auto opacity-20 group-hover:opacity-100 transition-opacity" />
              <p className="text-xl font-headline font-bold text-slate-800 tracking-tighter italic">{stat.val}</p>
              <p className="text-[8px] uppercase font-bold text-slate-400 tracking-widest">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Menu de Opções - Estilo Card Group */}
        <section className="bg-white rounded-[2.5rem] shadow-2xl p-3 border border-slate-100 divide-y divide-slate-50">
          {menuItems.map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className="w-full p-5 flex items-center justify-between transition-all hover:bg-slate-50 first:rounded-t-[2rem] last:rounded-b-[2rem] group"
            >
              <div className="flex items-center gap-5">
                <div className={cn("p-3 bg-slate-50 rounded-2xl transition-transform group-hover:scale-110", item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </section>

        {/* Logout */}
        <Button 
          variant="outline" 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full h-16 rounded-[2rem] text-[10px] text-slate-400 border-none bg-white shadow-xl hover:bg-red-50 hover:text-red-500 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all"
        >
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogOut className="w-5 h-5" />
          )}
          CONEXÃO SEGURA • SAIR
        </Button>

        <footer className="text-center pb-8">
          <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.4em]">LOOP PLATFORM v2.5.0</p>
        </footer >

      </div>
      <Navigation />
    </main>
  )
}

