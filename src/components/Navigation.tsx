
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home as HomeIcon, MapPin, Gift, User, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: HomeIcon, label: "Início", href: "/client" },
  { icon: MapPin, label: "Postos", href: "/stations" },
  { icon: Gift, label: "Cupons", href: "/coupons" },
  { icon: Wallet, label: "Carteira", href: "/wallet" },
  { icon: User, label: "Perfil", href: "/profile" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-100 pb-safe-area-inset-bottom shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
      <div className="flex justify-around items-center h-20 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300 flex-1",
                isActive ? "text-primary scale-110" : "text-slate-400 hover:text-primary"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-colors",
                isActive ? "bg-primary/10" : "bg-transparent"
              )}>
                <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-2")} />
              </div>
              <span className={cn(
                "text-[9px] uppercase font-bold tracking-tighter",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
