
import { QuickAction } from "@/components/QuickAction"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Fuel, TrendingUp, MapPin, Zap, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold tracking-tighter text-primary">OKTANO</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-accent text-accent font-mono text-[10px] px-2 py-0">ELITE TIER</Badge>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">User ID: 8842-XP</span>
          </div>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 bg-secondary flex items-center justify-center overflow-hidden">
             <User className="w-6 h-6 text-primary" />
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-background" />
        </div>
      </header>

      {/* Main Balance Card */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 border-none shadow-2xl shadow-primary/20 text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <TrendingUp className="w-32 h-32" />
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Available Cashback</span>
            <Zap className="w-5 h-5 text-accent animate-pulse" />
          </div>
          <CardTitle className="text-5xl font-headline font-bold">$124.50</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm opacity-90 font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+12.4% from last month</span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
            <div>
              <p className="text-[10px] uppercase opacity-70 tracking-widest">Points Balance</p>
              <p className="text-lg font-headline font-bold">12,450 XP</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase opacity-70 tracking-widest">Next Reward</p>
              <p className="text-lg font-headline font-bold">550 XP Left</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card border-border/50">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
              <Fuel className="w-3 h-3 text-accent" /> Fuel Savings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
             <p className="text-2xl font-headline font-bold">$42.80</p>
             <p className="text-[10px] text-muted-foreground">30 days period</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border/50">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-accent" /> Missions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
             <p className="text-2xl font-headline font-bold">3/5</p>
             <p className="text-[10px] text-muted-foreground">Active goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Recent Ledger Events</h2>
          <span className="text-xs text-primary font-bold hover:underline cursor-pointer">View All</span>
        </div>
        <div className="space-y-3">
          {[
            { label: "Shell Fueling", amount: "+$4.50", date: "Today, 14:20", type: "credit" },
            { label: "Mission: Weekend Warrior", amount: "+$10.00", date: "Yesterday", type: "credit" },
            { label: "Cashback Withdrawal", amount: "-$25.00", date: "Oct 24", type: "debit" }
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-secondary/30 rounded-xl border border-border/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn("w-1 h-10 rounded-full", item.type === "credit" ? "bg-accent" : "bg-destructive")} />
                <div>
                  <p className="text-sm font-bold tracking-tight">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{item.date}</p>
                </div>
              </div>
              <p className={cn("font-headline font-bold", item.type === "credit" ? "text-accent" : "text-foreground opacity-60")}>
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      <QuickAction />
      <Navigation />
    </main>
  )
}
