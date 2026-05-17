
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
  ArrowLeft,
  ChevronRight,
  Filter,
  Download,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
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
    <main className="min-h-screen bg-slate-50 pb-20 pt-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Estratégico */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-primary rounded-3xl text-white shadow-2xl shadow-primary/30">
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-headline font-bold text-slate-800 tracking-tight">Painel de Gestão</h1>
                <Badge className="bg-primary/10 text-primary border-none font-bold text-[10px] uppercase">Live</Badge>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-bold uppercase tracking-[0.2em]">Unidade #402 • Posto Modelo Ipiranga</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link href="/profile" className="flex-1 md:flex-none">
              <Button variant="outline" className="w-full bg-white shadow-sm border-slate-200 rounded-2xl h-12 px-6 font-bold text-slate-600">
                <ArrowLeft className="w-4 h-4 mr-2" /> VOLTAR
              </Button>
            </Link>
            <Button variant="default" className="flex-1 md:flex-none bg-slate-900 text-white shadow-xl rounded-2xl h-12 px-6 font-bold">
              <Download className="w-4 h-4 mr-2" /> EXPORTAR
            </Button>
          </div>
        </header>

        {/* Grid de KPIs Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Vendas App", val: "42", trend: "+12% hoje", icon: TrendingUp, color: "primary" },
            { label: "Faturamento Bruto", val: "R$ 12.4k", trend: "REPASSE OK", icon: Wallet, color: "blue-500" },
            { label: "Recorrência", val: "78%", trend: "ALTA", icon: Users, color: "purple-500" },
            { label: "Ticket Médio", val: "R$ 185", trend: "ESTÁVEL", icon: DollarSign, color: "orange-500" },
          ].map((kpi, i) => (
            <Card key={i} className="border-none shadow-lg bg-white overflow-hidden transition-all hover:scale-[1.03]">
              <CardContent className="p-7 space-y-4">
                <div className="flex justify-between items-center">
                  <div className={cn("p-2 rounded-xl bg-opacity-10", `bg-${kpi.color}`, `text-${kpi.color}`)}>
                    <kpi.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className={cn("text-[10px] h-6 px-3 border-none font-bold uppercase tracking-widest", i === 0 ? "bg-green-50 text-primary" : "bg-slate-50 text-slate-500")}>
                    {kpi.trend}
                  </Badge>
                </div>
                <div>
                  <p className="text-4xl font-headline font-bold text-slate-800 tracking-tight">{kpi.val}</p>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">{kpi.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Área Analítica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-8 border-none shadow-xl bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="p-10 pb-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-800 uppercase tracking-[0.2em]">Movimentação Semanal</CardTitle>
                  <CardDescription className="text-sm font-medium mt-1">Comparativo de volume de vendas via aplicativo</CardDescription>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
                  <Button variant="ghost" size="sm" className="rounded-lg h-8 text-[10px] font-bold">MÊS</Button>
                  <Button variant="default" size="sm" className="rounded-lg h-8 text-[10px] font-bold bg-white text-primary shadow-sm">SEMANA</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <div className="h-[350px] w-full mt-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 14, fontWeight: 'bold', fill: '#94a3b8' }} 
                        dy={10}
                     />
                     <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} 
                     />
                     <Tooltip 
                        content={<ChartTooltipContent />}
                        cursor={{ fill: '#f8fafc' }}
                     />
                     <Bar 
                        dataKey="vendas" 
                        fill="hsl(var(--primary))" 
                        radius={[10, 10, 0, 0]} 
                        barSize={40}
                     />
                   </BarChart>
                 </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 px-2">Vantagens & Fidelidade</h2>
              <div className="grid gap-4">
                 {[
                   { label: "Clientes Recorrentes", val: "78%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
                   { label: "Economia Gerada", val: "R$ 4.2k", icon: DollarSign, color: "text-green-500", bg: "bg-green-50" },
                   { label: "Repasse Pendente", val: "R$ 1.250", icon: Wallet, color: "text-purple-500", bg: "bg-purple-50" },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center p-6 bg-white rounded-[2rem] shadow-md border border-slate-50 transition-all hover:shadow-lg group">
                      <div className="flex items-center gap-5">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                          <stat.icon className="w-7 h-7" />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{stat.label}</span>
                      </div>
                      <span className="font-headline font-bold text-2xl text-slate-800">{stat.val}</span>
                   </div>
                 ))}
              </div>
            </div>

            <Card className="bg-slate-900 border-none shadow-2xl text-white rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-10 space-y-6">
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-primary/20 rounded-2xl">
                     <Clock className="w-7 h-7 text-primary" />
                   </div>
                   <h3 className="font-bold text-lg uppercase tracking-[0.2em]">Meta Diária</h3>
                 </div>
                 <p className="text-sm text-slate-400 leading-relaxed">
                   Você atingiu **85%** da meta de vendas via aplicativo hoje. Faltam apenas 5 abastecimentos para o bônus de performance.
                 </p>
                 <Button className="w-full bg-primary text-white font-bold h-14 rounded-2xl mt-4 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                   VER DETALHES DA META
                 </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lista de Vendas Recentes */}
        <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-10 pb-6 border-b border-slate-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-slate-800 uppercase tracking-[0.2em]">Últimas Vendas Realizadas</CardTitle>
              <Button variant="link" className="text-primary font-bold text-sm">Ver histórico completo <ChevronRight className="w-4 h-4 ml-1" /></Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                     <th className="px-10 py-5">Cliente</th>
                     <th className="px-10 py-5">Frentista</th>
                     <th className="px-10 py-5">Combustível</th>
                     <th className="px-10 py-5">Valor Bruto</th>
                     <th className="px-10 py-5">Desconto</th>
                     <th className="px-10 py-5">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {[
                     { client: "João Silva", staff: "Rodrigo", fuel: "V-Power", value: "R$ 150,00", discount: "R$ 7,50", status: "Aprovado" },
                     { client: "Maria Oliveira", staff: "Ana", fuel: "Etanol", value: "R$ 80,00", discount: "R$ 4,00", status: "Aprovado" },
                     { client: "Pedro Santos", staff: "Rodrigo", fuel: "Diesel S10", value: "R$ 450,00", discount: "R$ 22,50", status: "Aprovado" },
                   ].map((sale, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                       <td className="px-10 py-6 font-bold text-slate-700">{sale.client}</td>
                       <td className="px-10 py-6 text-sm text-slate-500">{sale.staff}</td>
                       <td className="px-10 py-6 text-sm text-slate-500">{sale.fuel}</td>
                       <td className="px-10 py-6 font-bold text-slate-700">{sale.value}</td>
                       <td className="px-10 py-6 font-bold text-primary">-{sale.discount}</td>
                       <td className="px-10 py-6">
                         <Badge className="bg-green-50 text-primary border-none text-[10px] font-bold uppercase">{sale.status}</Badge>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
