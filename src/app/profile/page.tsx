
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
  const { currentUser: user, logout } = useAuth()
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

  const menuGroups = [
    {
      title: "Conta",
      items: [
        { icon: User, label: "Dados Pessoais", color: "bg-[#007AFF]", href: "#" },
        { icon: CreditCard, label: "Métodos de Pagamento", color: "bg-[#34C759]", href: "/wallet" },
        { icon: Bell, label: "Notificações", color: "text-[#FF3B30]", colorBg: "bg-[#FF3B30]", href: "/notifications" },
      ]
    },
    {
      title: "Histórico",
      items: [
        { icon: History, label: "Meus Abastecimentos", color: "bg-[#5856D6]", href: "/wallet/history" },
        { icon: Star, label: "Minhas Avaliações", color: "bg-[#FF9500]", href: "#" },
      ]
    },
    {
      title: "Administração",
      items: [
        { icon: Building2, label: "Portal da Empresa", color: "bg-[#8E8E93]", href: "/admin-empresa" },
        { icon: Store, label: "Gestão do Posto", color: "bg-[#8E8E93]", href: "/admin-posto" },
        { icon: UserCheck, label: "Operação Frentista", color: "bg-[#8E8E93]", href: "/frentista" },
      ]
    },
    {
      title: "Suporte",
      items: [
        { icon: HelpCircle, label: "Central de Ajuda", color: "bg-[#007AFF]", href: "#" },
        { icon: Shield, label: "Privacidade e Segurança", color: "bg-[#34C759]", href: "#" },
      ]
    }
  ]

  return (
    <main className="min-h-screen pb-32 pt-12 bg-[#F2F2F7] text-black animate-in fade-in duration-1000">
      <div className="max-w-lg mx-auto px-6 space-y-8">
        
        {/* iOS Native Style Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-black">Ajustes</h1>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-black/5 shadow-sm">
            {user?.photoURL ? (
              <Image src={user.photoURL} alt="User" width={40} height={40} className="object-cover" />
            ) : (
              <div className="w-full h-full bg-[#E5E5EA] flex items-center justify-center">
                <span className="text-xs font-bold text-[#8E8E93]">
                  {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : "JS"}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* User Profile Card - iOS Settings Style */}
        <section className="bg-white rounded-[1.5rem] p-4 flex items-center gap-4 shadow-sm border border-black/[0.02]">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-black/5">
            {user?.photoURL ? (
              <Image src={user.photoURL} alt="User" width={64} height={64} className="object-cover" />
            ) : (
              <div className="w-full h-full bg-[#E5E5EA] flex items-center justify-center">
                <span className="text-xl font-bold text-[#8E8E93]">
                  {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : "JS"}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold tracking-tight">{user?.displayName || "Usuário Tanoposto"}</h2>
            <p className="text-sm text-[#8E8E93] font-medium">{user?.email || "usuario@email.com"}</p>
          </div>
          <Badge className="bg-[#E5E5EA] text-[#8E8E93] hover:bg-[#E5E5EA] border-none px-3 py-1 font-bold text-[10px] rounded-full">PRATA</Badge>
        </section>

        {/* Menu Groups - iOS Table View Style */}
        <div className="space-y-8">
          {menuGroups.map((group, idx) => (
            <section key={idx} className="space-y-2">
              <h3 className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-tight px-4">{group.title}</h3>
              <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-black/[0.02]">
                {group.items.map((item, i) => (
                  <Link 
                    key={i} 
                    href={item.href}
                    className={cn(
                      "w-full px-4 py-3 flex items-center justify-between active:bg-[#F2F2F7] transition-colors group",
                      i !== group.items.length - 1 && "border-b border-black/[0.02]"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-white",
                        item.color
                      )}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[15px] font-medium text-black">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#C7C7CC] group-active:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Logout - iOS Destructive Style */}
        <section className="px-4">
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full h-14 rounded-[1.5rem] bg-white text-[#FF3B30] font-bold text-[16px] shadow-sm border border-black/[0.02] active:bg-[#FF3B30]/5 active:scale-[0.98] transition-all"
          >
            {isLoggingOut ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <LogOut className="w-5 h-5 mr-2" />
            )}
            Sair da Conta
          </Button>
          <p className="text-center text-[11px] text-[#8E8E93] font-medium mt-6 uppercase tracking-widest">
            tanoposto v1.0.0
          </p>
        </section>

      </div>
      <Navigation />
    </main>
  )
}

