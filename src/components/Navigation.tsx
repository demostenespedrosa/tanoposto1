
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Wallet, Map, Target, Shield, User, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Wallet, label: "Ledger", href: "/wallet" },
  { icon: Target, label: "Missions", href: "/missions" },
  { icon: Map, label: "Navigator", href: "/navigator" },
  { icon: Shield, label: "Membership", href: "/membership" },
  { icon: LayoutDashboard, label: "Fleet Admin", href: "/admin" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        <Link href="/" className={cn("flex flex-col items-center gap-1 transition-colors", pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
          <div className="p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest">Dash</span>
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
