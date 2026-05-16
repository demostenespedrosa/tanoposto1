
"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Zap, Clock, Trophy, Sparkles, Loader2, AlertCircle } from "lucide-react"
import { personalizedFuelingMissions, type PersonalizedFuelingMissionsOutput } from "@/ai/flows/personalized-fueling-missions"

export default function MissionsPage() {
  const [mission, setMission] = useState<PersonalizedFuelingMissionsOutput | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMission() {
      try {
        setIsLoading(true)
        const result = await personalizedFuelingMissions({
          userId: "user-8842-xp",
          averageMonthlyLiters: 120,
          lastFuelingDate: "2024-10-20",
          fuelingFrequencyDays: 7,
          preferredFuelingDays: ["Monday", "Friday"],
          preferredFuelingTimes: ["morning"],
          currentLoyaltyPoints: 12450,
          completedMissionsCount: 12
        })
        setMission(result)
      } catch (err) {
        setError("Failed to generate predictive mission. Retrying...")
      } finally {
        setIsLoading(false)
      }
    }
    fetchMission()
  }, [])

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-headline font-bold tracking-tighter">Behavioral Goals</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-accent" /> AI-Driven Engagement Engine
          </p>
        </div>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-sm font-bold tracking-widest text-primary animate-pulse uppercase">Optimizing Psychology Models...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-destructive/10 border border-destructive/20 rounded-xl text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto" />
          <p className="text-sm text-foreground font-medium">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="border-destructive text-destructive">Retry</Button>
        </div>
      ) : mission && (
        <div className="space-y-6">
          <Card className="bg-card border-primary/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <Zap className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase tracking-widest text-[10px]">Active Mission</Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                  <Clock className="w-3 h-3" /> Ends: {mission.expirationDate}
                </div>
              </div>
              <CardTitle className="text-2xl font-headline font-bold text-foreground leading-tight">{mission.missionName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed">{mission.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Progress Tracking</span>
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
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Goal</p>
                  <p className="text-lg font-headline font-bold">{mission.goalValue} {mission.goalType}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Potential Reward</p>
                  <p className="text-lg font-headline font-bold text-accent">+{mission.rewardPoints} XP</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {mission.psychologicalBiasApplied.map((bias) => (
                  <Badge key={bias} variant="secondary" className="bg-secondary/50 text-[9px] uppercase tracking-tighter">
                    {bias} Applied
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Historical Performance</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Completed", val: "12", icon: Trophy },
                { label: "Efficiency", val: "94%", icon: Zap },
                { label: "Level", val: "22", icon: Target }
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
      )}

      <Navigation />
    </main>
  )
}
