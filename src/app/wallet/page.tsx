
"use client"

import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, ShieldCheck, ArrowUpRight, ArrowDownLeft, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function WalletPage() {
  const transactions = [
    { id: "TX-9901", date: "2024-10-25 14:20", type: "CREDIT", amount: 4.50, description: "Fueling Reward - Station #402", account: "Cashback Reservoir" },
    { id: "TX-9902", date: "2024-10-24 10:15", type: "CREDIT", amount: 10.00, description: "Mission Bonus: High Octane Week", account: "Incentive Pool" },
    { id: "TX-9903", date: "2024-10-23 18:45", type: "DEBIT", amount: 25.00, description: "In-Store Voucher Redemption", account: "User Liability" },
    { id: "TX-9904", date: "2024-10-22 09:12", type: "CREDIT", amount: 2.15, description: "Fueling Reward - Station #109", account: "Cashback Reservoir" },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <History className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-headline font-bold tracking-tighter">Ledger Engine</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-accent" /> Immutable Double-Entry Journal
          </p>
        </div>
      </header>

      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Account Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-headline font-bold tracking-tighter">$124.50</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Current Net Balance</p>
              </div>
              <Badge className="bg-accent/10 text-accent border-accent/20">AUDITED</Badge>
           </div>
           <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total Credits</p>
                <p className="text-sm font-bold text-accent">+$1,240.20</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total Debits</p>
                <p className="text-sm font-bold text-foreground opacity-70">-$1,115.70</p>
              </div>
           </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Transaction Journal</h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 bg-secondary/30 rounded-xl border border-border/30 hover:border-primary/50 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {tx.type === "CREDIT" ? (
                    <div className="p-1.5 bg-accent/20 rounded text-accent">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="p-1.5 bg-muted rounded text-muted-foreground">
                      <ArrowDownLeft className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold tracking-tight">{tx.description}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{tx.date}</p>
                  </div>
                </div>
                <p className={cn("font-headline font-bold", tx.type === "CREDIT" ? "text-accent" : "text-foreground")}>
                  {tx.type === "CREDIT" ? "+" : "-"}${tx.amount.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border/20">
                <p className="text-[9px] font-mono text-muted-foreground">REF: {tx.id}</p>
                <p className="text-[9px] font-bold text-primary tracking-tighter uppercase">{tx.account}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex gap-3">
        <Info className="w-5 h-5 text-primary shrink-0" />
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          <strong>Security Note:</strong> All transactions are signed with SHA-256 hashes and committed to an immutable sequence. 
          Your balance is reconciled across multiple ledger partitions in real-time.
        </p>
      </div>

      <Navigation />
    </main>
  )
}
