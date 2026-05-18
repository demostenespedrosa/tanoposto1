
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
    <main className="min-h-screen pb-32 pt-6 bg-slate-50 text-slate-900 animate-in fade-in duration-700">
      <div className="max-w-lg mx-auto px-5 space-y-10">
        
        {/* Header Perfil - Estilo Premium Apple */}
        <header className="flex flex-col items-center py-10 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -z-10"></div>
          
          <div className="relative group">
            <div className="w-32 h-32 rounded-[3.5rem] border-[6px] border-white shadow-2xl overflow-hidden bg-slate-900 flex items-center justify-center transition-all duration-700 group-hover:scale-[1.05] group-hover:rotate-3 ring-1 ring-slate-100 relative">
              {user?.photoURL ? (
                <Image src={user.photoURL} alt={user.displayName || "User"} fill className="object-cover" />
              ) : (
                <span className="text-5xl font-headline font-bold text-white uppercase italic tracking-tighter">
                  {user?.displayName ? user.displayName.substring(0, 2) : "JS"}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 p-3 bg-green-500 border-4 border-white rounded-[1.25rem] shadow-xl ring-1 ring-slate-100 group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-4xl font-headline font-bold text-slate-900 tracking-tighter italic uppercase leading-none">{user?.displayName || "João Silva"}</h2>
            <div className="flex items-center justify-center gap-2">
               <Badge className="bg-slate-900 text-primary border-none py-1 px-4 font-black uppercase tracking-[0.2em] text-[8px] rounded-full shadow-lg">GOLD MEMBER</Badge>
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user?.email?.split('@')[0] || "loop_user"}</span>
            </div>
          </div>
        </header>

        {/* Estatísticas Rápidas - Glassmorphism Feel */}
        <section className="grid grid-cols-3 gap-4">
          {[
            { label: "Visitas", val: "42", icon: Fuel, color: "text-blue-500" },
            { label: "Economia", val: "R$ 420", icon: TrendingUp, color: "text-green-500" },
            { label: "Level", val: "Elite", icon: Star, color: "text-primary" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 text-center space-y-2 group transition-all duration-500 active:scale-95">
              <div className={cn("w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform", stat.color)}>
                 <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-xl font-headline font-bold text-slate-800 tracking-tighter italic">{stat.val}</p>
              <p className="text-[8px] uppercase font-black text-slate-300 tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Menu de Opções - Mobile List Style */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] px-2 italic">Configurações e Painéis</h3>
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 p-3 border border-slate-50 divide-y divide-slate-50">
            {menuItems.map((item, i) => (
              <Link 
                key={i} 
                href={item.href}
                className="w-full p-6 flex items-center justify-between transition-all hover:bg-slate-50/50 first:rounded-t-[2.5rem] last:rounded-b-[2.5rem] group active:px-8"
              >
                <div className="flex items-center gap-6">
                  <div className={cn("p-4 bg-slate-50 rounded-[1.25rem] transition-all group-hover:scale-110 group-hover:rotate-3 shadow-inner", item.color)}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black text-slate-700 uppercase tracking-[0.15em]">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-primary group-hover:translate-x-2 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* Logout Moderno */}
        <div className="px-2">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full h-16 rounded-[2.5rem] text-[10px] text-slate-400 border-none bg-white shadow-xl hover:bg-red-50 hover:text-red-500 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all duration-500 active:scale-95"
          >
            {isLoggingOut ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <LogOut className="w-5 h-5" />
            )}
            Sessão • Sair da conta
          </Button>
        </div>

        <footer className="text-center py-6 space-y-2">
          <div className="flex justify-center items-center gap-2 opacity-20">
             <div className="h-[1px] w-8 bg-slate-400"></div>
             <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.5em]">LOOP APP v2.5.0</p>
             <div className="h-[1px] w-8 bg-slate-400"></div>
          </div>
        </footer >

      </div>
      <Navigation />
    </main>
  )
}

