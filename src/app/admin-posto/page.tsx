
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Settings, 
  Fuel, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Users, 
  Wallet,
  Calendar,
  Building2,
  ArrowLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import Link from "next/link"

export default function AdminPostoPage() {
  const chartData = [
    { name: "Seg", vendas: 4000 },
    { name: "Ter", vendas: 3000 },
    { name: "Qua", vendas: 2000 },
    { name: "Qui", vendas: 2780 },
    { name: "Sex", vendas: 1890 },
    { name: "Sab", vendas: 2390 },
    { name: "Dom", vendas: 3490 },
  ]

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary rounded-2xl text-white shadow-xl shadow-primary/20">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-headline font-bold text-slate-800 tracking-tight">Painel de Gestão</h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Unidade #402 • Posto Modelo</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="bg-white shadow-sm border border-slate-100 rounded-full">
                <ArrowLeft className="w-4 h-4 text-slate-400" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="bg-white shadow-sm border border-slate-100 rounded-full">
              <Settings className="w-4 h-4 text-slate-400" />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between">
                <TrendingUp className="w-5 h-5 text-primary" />
                <Badge variant="outline" className="text-[10px] h-5 bg-green-50 text-primary border-none font-bold">+12% hoje</Badge>
              </div>
              <div>
                <p className="text-3xl font-headline font-bold text-slate-800">42</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Vendas App</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between">
                <Wallet className="w-5 h-5 text-primary" />
                <Badge variant="outline" className="text-[10px] h-5 bg-blue-50 text-blue-500 border-none font-bold">REPASSE OK</Badge>
              </div>
              <div>
                <p className="text-3xl font-headline font-bold text-slate-800">R$ 12.4k</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Faturamento Bruto</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between">
                <Users className="w-5 h-5 text-primary" />
                <Badge variant="outline" className="text-[10px] h-5 bg-purple-50 text-purple-500 border-none font-bold">ALTA</Badge>
              </div>
              <div>
                <p className="text-3xl font-headline font-bold text-slate-800">78%</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Recorrência</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between">
                <DollarSign className="w-5 h-5 text-primary" />
                <Badge variant="outline" className="text-[10px] h-5 bg-orange-50 text-orange-500 border-none font-bold">ESTÁVEL</Badge>
              </div>
              <div>
                <p className="text-3xl font-headline font-bold text-slate-800">R$ 185</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Ticket Médio</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none shadow-lg bg-white overflow-hidden">
            <CardHeader className="pb-0 px-8 pt-8">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-800 uppercase tracking-widest">Movimentação Semanal</CardTitle>
                  <CardDescription className="text-xs font-medium">Relatório de volume de vendas via Tá no posto</CardDescription>
                </div>
                <Calendar className="w-5 h-5 text-slate-300" />
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[280px] w-full mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} 
                     />
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: '#f8fafc' }}
                     />
                     <Bar dataKey="vendas" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 px-1">Indicadores de Fidelidade</h2>
            <div className="grid gap-4">
               {[
                 { label: "Clientes Recorrentes", val: "78%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
                 { label: "Economia Gerada", val: "R$ 4.2k", icon: DollarSign, color: "text-green-500", bg: "bg-green-50" },
                 { label: "Repasse Pendente", val: "R$ 1.250", icon: Wallet, color: "text-purple-500", bg: "bg-purple-50" },
               ].map((stat, i) => (
                 <div key={i} className="flex justify-between items-center p-5 bg-white rounded-3xl shadow-sm border border-slate-50 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{stat.label}</span>
                    </div>
                    <span className="font-headline font-bold text-xl text-slate-800">{stat.val}</span>
                 </div>
               ))}
            </div>

            <Card className="bg-slate-900 border-none shadow-2xl text-white rounded-3xl overflow-hidden">
              <CardContent className="p-8 space-y-4">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/20 rounded-xl">
                     <ArrowUpRight className="w-6 h-6 text-primary" />
                   </div>
                   <h3 className="font-bold text-base uppercase tracking-widest">Dica Estratégica</h3>
                 </div>
                 <p className="text-xs text-slate-400 leading-relaxed">
                   O fluxo de clientes deve aumentar **15%** no próximo final de semana. Sugerimos ativar a campanha de "Cashback em Dobro" para fidelizar novos usuários que virão da rodovia.
                 </p>
                 <Button className="w-full bg-primary text-white font-bold h-12 rounded-xl mt-4">CONFIGURAR CAMPANHA</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
