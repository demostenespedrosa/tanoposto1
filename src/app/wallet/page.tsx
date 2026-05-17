
"use client"

import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  History, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Info, 
  PlusCircle, 
  Building2, 
  Wallet as WalletIcon,
  Receipt
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function WalletPage() {
  // Dados fictícios simulando saldo corporativo e pessoal
  const transactions = [
    { id: "TX-9901", date: "Hoje, 14:20", type: "CREDIT", amount: 450.00, description: "Recarga Mensal - Empresa TechCorp", account: "Vale Combustível" },
    { id: "TX-9902", date: "Ontem, 10:15", type: "DEBIT", amount: 152.40, description: "Abastecimento - Posto Shell Centro", account: "Saldo Vale" },
    { id: "TX-9903", date: "25 Out, 18:45", type: "DEBIT", amount: 25.00, description: "Conveniência - Select", account: "Saldo Pessoal" },
    { id: "TX-9904", date: "24 Out, 09:12", type: "CREDIT", amount: 100.00, description: "Recarga via PIX", account: "Saldo Pessoal" },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <WalletIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-headline font-bold text-slate-800 tracking-tight">Minha Carteira</h1>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-primary" /> Pagamento Seguro
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm border border-slate-100">
          <Receipt className="w-5 h-5 text-slate-500" />
        </Button>
      </header>

      {/* Card de Saldo Principal */}
      <Card className="border-none shadow-xl bg-gradient-to-br from-primary to-green-700 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Building2 className="w-32 h-32" />
        </div>
        <CardContent className="p-6 space-y-6 relative z-10">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Saldo Disponível Total</p>
            <h2 className="text-4xl font-headline font-bold">R$ 372,60</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div className="space-y-1">
              <p className="text-[9px] uppercase font-bold opacity-70 flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5" /> Vale Empresa
              </p>
              <p className="text-sm font-bold">R$ 297,60</p>
            </div>
            <div className="space-y-1 border-l border-white/20 pl-4">
              <p className="text-[9px] uppercase font-bold opacity-70 flex items-center gap-1">
                <PlusCircle className="w-2.5 h-2.5" /> Saldo Pessoal
              </p>
              <p className="text-sm font-bold">R$ 75,00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Atalhos de Ação da Carteira */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-12 bg-white text-slate-800 hover:bg-slate-50 border border-slate-100 font-bold rounded-2xl flex gap-2 shadow-sm">
          <PlusCircle className="w-4 h-4 text-primary" /> ADICIONAR SALDO
        </Button>
        <Button className="h-12 bg-white text-slate-800 hover:bg-slate-50 border border-slate-100 font-bold rounded-2xl flex gap-2 shadow-sm">
          <History className="w-4 h-4 text-primary" /> EXTRATO PDF
        </Button>
      </div>

      {/* Histórico de Transações */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Atividade Recente</h2>
          <Button variant="link" className="text-[10px] font-bold text-primary p-0 h-auto">VER TUDO</Button>
        </div>
        
        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-xl",
                      tx.type === "CREDIT" ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-600"
                    )}>
                      {tx.type === "CREDIT" ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 leading-tight">{tx.description}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "font-headline font-bold text-lg",
                      tx.type === "CREDIT" ? "text-primary" : "text-slate-800"
                    )}>
                      {tx.type === "CREDIT" ? "+" : "-"} R$ {tx.amount.toFixed(2).replace('.', ',')}
                    </p>
                    <Badge variant="outline" className="text-[8px] h-4 py-0 border-slate-100 text-slate-400 uppercase font-bold tracking-tighter">
                      {tx.account}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bloco Informativo para Colaboradores */}
      <Card className="bg-slate-900 border-none shadow-xl text-white overflow-hidden">
        <CardContent className="p-6 flex gap-4">
          <div className="bg-primary/20 p-3 rounded-2xl h-fit">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-sm">Sua empresa no Tá no Posto</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              O seu saldo de <strong>Vale Combustível</strong> é recarregado automaticamente pela sua empresa. Use-o para abastecer com desconto em qualquer posto parceiro e economize ainda mais!
            </p>
            <Button variant="link" className="text-primary text-[10px] p-0 font-bold h-auto">SAIBA COMO FUNCIONA</Button>
          </div>
        </CardContent>
      </Card>

      <Navigation />
    </main>
  )
}
