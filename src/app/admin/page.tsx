
"use client"

import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, Droplets, Activity, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminPage() {
  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-lg text-accent">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-headline font-bold tracking-tighter">Fleet Ops</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1 uppercase tracking-widest font-bold">
              Station #402 Admin
            </p>
          </div>
        </div>
        <div className="p-2 bg-secondary rounded-full">
           <Settings className="w-5 h-5 text-muted-foreground" />
        </div>
      </header>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="overview">Live</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="rules">Missions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card border-accent/20">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <Activity className="w-4 h-4 text-accent" />
                  <span className="text-[10px] text-accent font-bold animate-pulse">LIVE</span>
                </div>
                <p className="text-2xl font-headline font-bold">42</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Active Pumps</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-primary/20">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <Droplets className="w-4 h-4 text-primary" />
                  <span className="text-[10px] text-primary font-bold">88%</span>
                </div>
                <p className="text-2xl font-headline font-bold">12.4k</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Liters Sold Today</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-secondary to-background border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cashback Circulation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-3xl font-headline font-bold tracking-tighter">$4,120.50</p>
                <Badge variant="outline" className="text-accent border-accent text-[9px]">HEALTHY POOL</Badge>
              </div>
              <div className="h-24 w-full flex items-end gap-1 px-1">
                {[40, 60, 45, 90, 65, 80, 50, 75, 85, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-accent/20 hover:bg-accent/40 rounded-t-sm transition-all cursor-pointer" style={{ height: `${h}%` }} />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Security Telemetry</h2>
            <div className="space-y-3">
              {[
                { user: "User #8842", status: "VALID", event: "Pump Activation", time: "2m ago" },
                { user: "User #1109", status: "SUSPICIOUS", event: "Voucher Resign", time: "15m ago" },
                { user: "User #2240", status: "VALID", event: "Profile Sync", time: "42m ago" },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-secondary/30 rounded-xl border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full shadow-[0_0_8px]", log.status === "VALID" ? "bg-accent shadow-accent/50" : "bg-destructive shadow-destructive/50 animate-pulse")} />
                    <div>
                      <p className="text-xs font-bold">{log.user}</p>
                      <p className="text-[9px] text-muted-foreground">{log.event}</p>
                    </div>
                  </div>
                  <p className="text-[9px] font-mono text-muted-foreground">{log.time}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-card border-border">
             <CardHeader>
                <CardTitle className="text-sm font-bold">Retention Cohorts</CardTitle>
             </CardHeader>
             <CardContent className="flex items-center justify-center py-10 opacity-50">
                <BarChart3 className="w-16 h-16 text-muted-foreground" />
                <p className="text-xs ml-4">Historical aggregation in progress...</p>
             </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card className="bg-card border-border">
             <CardHeader>
                <CardTitle className="text-sm font-bold">Gamification Engine</CardTitle>
                <CardDescription>Configure mission state machines and reward multipliers.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 flex justify-between items-center">
                   <div>
                      <p className="text-sm font-bold">Weekend Warrior</p>
                      <p className="text-[10px] text-muted-foreground">Reward x2.5 for Sat-Sun fueling</p>
                   </div>
                   <Badge className="bg-accent text-accent-foreground">ACTIVE</Badge>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 flex justify-between items-center opacity-60">
                   <div>
                      <p className="text-sm font-bold">Night Owl Boost</p>
                      <p className="text-[10px] text-muted-foreground">Reward x1.8 for 11pm-5am</p>
                   </div>
                   <Badge variant="outline">PAUSED</Badge>
                </div>
             </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Navigation />
    </main>
  )
}
