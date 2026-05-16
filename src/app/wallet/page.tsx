"use client"

import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, ShieldCheck, ArrowUpRight, ArrowDownLeft, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function WalletPage() {
  const transactions = [
    { id: "TX-9901", date: "25/10/2024 14:20", type: "CREDIT", amount: 4.50, description: "Bônus de Abastecimento - Posto #402", account: "Meu Saldo" },
    { id: "TX-9902", date: "24/10/2024 10:15", type: "CREDIT", amount: 10.00, description: "Prêmio de Missão: Alta Performance", account: "Incentivos" },
    { id: "TX-9903", date: "23/10/2024 18:45", type: "DEBIT", amount: 25.00, description: "Resgate de Cupom na Loja", account: "Uso do Saldo" },
    { id: "TX-9904", date: "22/10/2024 09:12", type: "CREDIT", amount: 2.15, description: "Bônus de Abastecimento - Posto #109", account: "Meu Saldo" },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <History className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-headline font-bold tracking-tighter">Minha Carteira</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1 uppercase tracking-widest font-bold">
            <ShieldCheck className="w-3 h-3 text-primary" /> Histórico Seguro
          </p>
        </div>
      </header>

      <Card className="bg-white border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Saldo Total</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-headline font-bold tracking-tighter text-primary">R$ 124,50</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Pronto para usar</p>
              </div>
              <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20">VERIFICADO</Badge>
           </div>
           <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Entradas</p>
                <p className="text-sm font-bold text-primary">+R$ 1.240,20</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Saídas</p>
                <p className="text-sm font-bold text-muted-foreground">-R$ 1.115,70</p>
              </div>
           </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground px-1">Diário de Economia</h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 bg-white rounded-2xl border border-border/50 hover:border-primary/30 transition-all shadow-sm group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {tx.type === "CREDIT" ? (
                    <div className="p-1.5 bg-primary/10 rounded text-primary">
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
                <p className={cn("font-headline font-bold", tx.type === "CREDIT" ? "text-primary" : "text-muted-foreground")}>
                  {tx.type === "CREDIT" ? "+" : "-"}R$ {tx.amount.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border/10">
                <p className="text-[9px] font-mono text-muted-foreground">ID: {tx.id}</p>
                <p className="text-[9px] font-bold text-primary tracking-tighter uppercase">{tx.account}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex gap-3">
        <Info className="w-5 h-5 text-primary shrink-0" />
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          <strong>Segurança Tá no posto:</strong> Todas as suas transações são protegidas e reconciliadas em tempo real com os postos parceiros para sua total tranquilidade.
        </p>
      </div>

      <Navigation />
    </main>
  )
}