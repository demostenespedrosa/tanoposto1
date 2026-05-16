
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Wallet, Map, Target, Shield, LayoutDashboard, Home as HomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Wallet, label: "Carteira", href: "/wallet" },
  { icon: Target, label: "Missões", href: "/missions" },
  { icon: Map, label: "Mapa", href: "/navigator" },
  { icon: Shield, label: "Planos", href: "/membership" },
  { icon: LayoutDashboard, label: "Admin", href: "/admin" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        <Link href="/" className={cn("flex flex-col items-center gap-1 transition-colors", pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
          <div className="p-1">
            <HomeIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest">Início</span>
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="p-1">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
