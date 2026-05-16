"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Zap, Clock, Trophy, ShieldCheck } from "lucide-react"

export default function MissionsPage() {
  // Substituído o carregamento de IA por uma missão estática pré-definida
  const [mission] = useState({
    missionName: "Guerreiro do Fim de Semana",
    description: "Abasteça pelo menos 40 litros entre sexta-feira e domingo para garantir um bônus de cashback de 5%.",
    goalType: "liters" as const,
    goalValue: 40,
    rewardPoints: 500,
    expirationDate: "2024-12-31",
    psychologicalBiasApplied: ["Fidelidade"],
    currentProgressText: "Você já abasteceu 26 litros este final de semana!"
  })

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-headline font-bold tracking-tighter">Missões de Lealdade</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-accent" /> Metas de Consumo Oktano
          </p>
        </div>
      </header>

      <div className="space-y-6">
        <Card className="bg-card border-primary/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Zap className="w-24 h-24" />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase tracking-widest text-[10px]">Missão Ativa</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Clock className="w-3 h-3" /> Expira em: {mission.expirationDate}
              </div>
            </div>
            <CardTitle className="text-2xl font-headline font-bold text-foreground leading-tight">{mission.missionName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground leading-relaxed">{mission.description}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Progresso Atual</span>
                <span className="text-sm font-headline font-bold text-accent">65%</span>
              </div>
              <Progress value={65} className="h-2 bg-secondary" />
              {mission.currentProgressText && (
                <p className="text-[10px] text-accent font-bold italic tracking-wide">
                  {mission.currentProgressText}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Meta</p>
                <p className="text-lg font-headline font-bold">{mission.goalValue} Litros</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Recompensa</p>
                <p className="text-lg font-headline font-bold text-accent">+{mission.rewardPoints} XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Histórico de Performance</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Completas", val: "12", icon: Trophy },
              { label: "Eficiência", val: "94%", icon: Zap },
              { label: "Nível", val: "22", icon: Target }
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="p-3 bg-secondary/30 rounded-xl border border-border/30 text-center space-y-1">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-lg font-headline font-bold">{stat.val}</p>
                  <p className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Navigation />
    </main>
  )
}