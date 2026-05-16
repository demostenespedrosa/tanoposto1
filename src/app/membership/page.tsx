"use client"

import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, Crown, Zap, Activity, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MembershipPage() {
  const tiers = [
    { name: "CORE", price: "$0/mo", features: ["1% Cashback", "Missões Básicas", "Navegação de Rota"], active: false },
    { name: "ELITE", price: "$9.90/mo", features: ["3% Cashback", "Missões Exclusivas", "Smart-Path Plus", "Monitoramento de Consumo"], active: true },
    { name: "PREMIUM", price: "$24.90/mo", features: ["5% Cashback", "Telemetria de Veículo", "Abastecimento Concierge", "Descontos em Parceiros"], active: false },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-headline font-bold tracking-tighter">Oktano Nexus</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1 uppercase tracking-widest font-bold">
            Níveis de Assinatura
          </p>
        </div>
      </header>

      <div className="space-y-4">
        {tiers.map((tier, i) => (
          <Card key={i} className={cn(
            "relative overflow-hidden transition-all",
            tier.active ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border/50 bg-card opacity-80"
          )}>
            {tier.active && (
              <div className="absolute top-0 right-0 p-3">
                 <Badge className="bg-primary text-primary-foreground font-bold text-[8px] tracking-widest">PLANO ATUAL</Badge>
              </div>
            )}
            <CardHeader>
               <CardTitle className="flex items-center gap-2 font-headline font-bold text-xl">
                 {tier.name === "ELITE" ? <Zap className="w-5 h-5 text-accent" /> : tier.name === "PREMIUM" ? <Crown className="w-5 h-5 text-yellow-500" /> : <Activity className="w-5 h-5 text-muted-foreground" />}
                 {tier.name}
               </CardTitle>
               <CardDescription className="font-bold text-foreground">{tier.price}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <ul className="space-y-2">
                 {tier.features.map((feature, j) => (
                   <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className={cn("w-3 h-3", tier.active ? "text-primary" : "text-muted-foreground")} />
                      {feature}
                   </li>
                 ))}
               </ul>
               <Button 
                variant={tier.active ? "outline" : "default"} 
                className={cn("w-full font-bold tracking-wide", tier.active ? "border-primary text-primary" : "bg-primary text-primary-foreground")}
               >
                 {tier.active ? "GERENCIAR ASSINATURA" : `MIGRAR PARA ${tier.name}`}
               </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/20 border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
             <Info className="w-4 h-4 text-primary" /> Próximas Atualizações
          </CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-xs text-muted-foreground leading-relaxed">
             Estamos desenvolvendo o <strong>Telemetry Nexus</strong> para sincronização veículo-nuvem. 
             Membros Premium poderão monitorar o consumo de combustível em tempo real e receber alertas de manutenção.
           </p>
        </CardContent>
      </Card>

      <Navigation />
    </main>
  )
}