
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Clock,
  Plus,
  Target,
  Users2,
  PieChart,
  MessageSquare,
  AlertTriangle,
  Award,
  Zap,
  Tag
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Line, LineChart } from "recharts"
import Link from "next/link"

export default function AdminPostoPage() {
  const [activeTab, setActiveTab] = useState("visao-geral")

  const chartData = [
    { name: "Seg", faturamento: 4000, cashback: 400, lucro: 3600 },
    { name: "Ter", faturamento: 3000, cashback: 300, lucro: 2700 },
    { name: "Qua", faturamento: 2000, cashback: 200, lucro: 1800 },
    { name: "Qui", faturamento: 2780, cashback: 278, lucro: 2502 },
    { name: "Sex", faturamento: 5890, cashback: 589, lucro: 5301 },
    { name: "Sab", faturamento: 8390, cashback: 839, lucro: 7551 },
    { name: "Dom", faturamento: 7490, cashback: 749, lucro: 6741 },
  ]

  const chartConfig = {
    faturamento: { label: "Faturamento", color: "hsl(var(--primary))" },
    cashback: { label: "Cashback", color: "hsl(var(--destructive))" },
    lucro: { label: "Margem Líquida", color: "hsl(221, 83%, 53%)" },
  } satisfies ChartConfig

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Estratégico */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-slate-900 rounded-3xl text-white shadow-2xl">
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-headline font-bold text-slate-800 tracking-tight">Posto Modelo Ipiranga</h1>
                <Badge className="bg-primary/10 text-primary border-none font-bold text-[10px] uppercase">Unidade #402</Badge>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-bold uppercase tracking-[0.2em]">Painel de Gestão Estratégica</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link href="/profile" className="flex-1 md:flex-none">
              <Button variant="outline" className="w-full bg-white shadow-sm border-slate-200 rounded-2xl h-12 px-6 font-bold text-slate-600">
                <ArrowLeft className="w-4 h-4 mr-2" /> VOLTAR
              </Button>
            </Link>
            <Button variant="default" className="flex-1 md:flex-none bg-primary text-white shadow-xl rounded-2xl h-12 px-6 font-bold">
              <Plus className="w-4 h-4 mr-2" /> NOVA CAMPANHA
            </Button>
          </div>
        </header>

        <Tabs defaultValue="visao-geral" className="space-y-8" onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="bg-white p-1 rounded-2xl border border-slate-200 w-max h-auto shadow-sm">
              <TabsTrigger value="visao-geral" className="rounded-xl h-11 px-6 font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white">VISÃO GERAL</TabsTrigger>
              <TabsTrigger value="campanhas" className="rounded-xl h-11 px-6 font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white uppercase">Campanhas</TabsTrigger>
              <TabsTrigger value="clientes" className="rounded-xl h-11 px-6 font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white uppercase">Clientes</TabsTrigger>
              <TabsTrigger value="financeiro" className="rounded-xl h-11 px-6 font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white uppercase">Financeiro</TabsTrigger>
              <TabsTrigger value="equipe" className="rounded-xl h-11 px-6 font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white uppercase">Equipe</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="visao-geral" className="space-y-8 animate-in fade-in duration-500">
            {/* KPIs Hoje */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Faturamento App", val: "R$ 12.450", trend: "+12%", icon: DollarSign, color: "primary" },
                { label: "Cashback Hoje", val: "R$ 622,50", trend: "5.0%", icon: Zap, color: "orange-500" },
                { label: "Novos Clientes", val: "24", trend: "+8", icon: Users2, color: "blue-500" },
                { label: "ROI Médio", val: "18.4x", trend: "ALTO", icon: TrendingUp, color: "green-500" },
              ].map((kpi, i) => {
                const Icon = kpi.icon
                return (
                  <Card key={i} className="border-none shadow-lg bg-white overflow-hidden transition-all hover:scale-[1.03]">
                    <CardContent className="p-7 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className={cn("p-2 rounded-xl bg-opacity-10", i === 0 ? "bg-primary text-primary" : `bg-${kpi.color} text-${kpi.color}`)}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="outline" className="text-[10px] h-6 px-3 border-none font-bold uppercase tracking-widest bg-slate-50 text-slate-500">
                          {kpi.trend}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-4xl font-headline font-bold text-slate-800 tracking-tight">{kpi.val}</p>
                        <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">{kpi.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <Card className="lg:col-span-8 border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-10 pb-0">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-800 uppercase tracking-[0.2em]">Retorno do Investimento</CardTitle>
                      <CardDescription className="text-sm font-medium mt-1">Comparativo de faturamento vs custo de fidelização</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <ChartContainer config={chartConfig} className="h-[350px] w-full mt-6">
                     <BarChart data={chartData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 'bold', fill: '#94a3b8' }} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                       <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: '#f8fafc' }} />
                       <Bar dataKey="faturamento" fill="var(--color-faturamento)" radius={[10, 10, 0, 0]} barSize={30} />
                       <Bar dataKey="cashback" fill="var(--color-cashback)" radius={[10, 10, 0, 0]} barSize={30} />
                     </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="lg:col-span-4 space-y-8">
                <Card className="bg-slate-900 border-none shadow-2xl text-white rounded-[2.5rem] overflow-hidden">
                  <CardContent className="p-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-2xl">
                        <PieChart className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg uppercase tracking-[0.2em]">Resumo do ROI</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-4 border-b border-white/10">
                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Margem Incremental</span>
                        <span className="text-xl font-bold text-primary">+22.4%</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-white/10">
                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Retenção de Clientes</span>
                        <span className="text-xl font-bold text-blue-400">78.5%</span>
                      </div>
                      <div className="flex justify-between items-center py-4">
                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Frequência Mensal</span>
                        <span className="text-xl font-bold text-purple-400">3.2x</span>
                      </div>
                    </div>
                    <Button className="w-full bg-primary text-white font-bold h-14 rounded-2xl mt-4 shadow-xl">
                      EXPORTAR RELATÓRIO PDF
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="campanhas" className="space-y-8 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <Card className="border-2 border-dashed border-slate-200 bg-white hover:border-primary/50 transition-colors cursor-pointer group flex flex-col items-center justify-center p-10 rounded-[2.5rem] text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 uppercase tracking-widest">Criar Promoção</h3>
                  <p className="text-sm text-slate-400 mt-2">Personalize descontos por horário, combustível ou público.</p>
               </Card>

               {[
                 { title: "Cashback Madrugada", status: "Ativa", result: "ROI 12x", cost: "R$ 450", fuel: "Gasolina", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
                 { title: "Boas-vindas 5%", status: "Ativa", result: "42 Conv.", cost: "R$ 1.2k", fuel: "Todos", icon: Award, color: "text-blue-500", bg: "bg-blue-50" },
                 { title: "Bônus Diesel S10", status: "Pausada", result: "ROI 5x", cost: "R$ 0", fuel: "Diesel", icon: Target, color: "text-slate-400", bg: "bg-slate-50" },
               ].map((campaign, i) => (
                 <Card key={i} className="border-none shadow-lg bg-white rounded-[2.5rem] overflow-hidden group">
                   <CardHeader className="p-8 pb-4">
                      <div className="flex justify-between items-center mb-4">
                        <Badge className={cn("rounded-lg h-7 px-3 border-none font-bold uppercase text-[9px] tracking-widest", campaign.status === "Ativa" ? "bg-green-50 text-primary" : "bg-slate-50 text-slate-400")}>
                          {campaign.status}
                        </Badge>
                        <div className={cn("p-2 rounded-xl", campaign.bg, campaign.color)}>
                          <campaign.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800 uppercase tracking-widest">{campaign.title}</CardTitle>
                      <CardDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">{campaign.fuel}</CardDescription>
                   </CardHeader>
                   <CardContent className="p-8 pt-4 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Resultado</p>
                          <p className="text-lg font-bold text-slate-800">{campaign.result}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Custo</p>
                          <p className="text-lg font-bold text-slate-800">{campaign.cost}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 rounded-xl font-bold text-xs h-11">EDITAR</Button>
                        <Button className="flex-1 bg-slate-900 text-white rounded-xl font-bold text-xs h-11">ANÁLISE</Button>
                      </div>
                   </CardContent>
                 </Card>
               ))}
             </div>
          </TabsContent>

          <TabsContent value="clientes" className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               {[
                 { label: "VIP", count: "142", desc: "Ticket > R$ 300", color: "bg-yellow-50 text-yellow-600" },
                 { label: "Em Risco", count: "38", desc: "> 15 dias sem vir", color: "bg-red-50 text-red-600" },
                 { label: "Novos", count: "89", desc: "Últimos 30 dias", color: "bg-blue-50 text-blue-600" },
                 { label: "Apps", count: "215", desc: "Uber/99/Entregas", color: "bg-green-50 text-green-600" },
               ].map((seg, i) => (
                 <Card key={i} className="border-none shadow-md bg-white p-6 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow">
                   <div className="flex justify-between items-start">
                     <div>
                       <Badge className={cn("border-none font-bold uppercase text-[9px] tracking-widest mb-2", seg.color)}>{seg.label}</Badge>
                       <p className="text-2xl font-bold text-slate-800">{seg.count}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{seg.desc}</p>
                     </div>
                     <ChevronRight className="w-4 h-4 text-slate-300" />
                   </div>
                 </Card>
               ))}
            </div>

            <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-10 pb-6 border-b border-slate-50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="text-xl font-bold text-slate-800 uppercase tracking-[0.2em]">Ranking de Fidelidade</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input className="w-full bg-slate-50 border-none rounded-xl h-10 pl-10 text-xs font-bold" placeholder="FILTRAR CLIENTES..." />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                         <th className="px-10 py-5">Cliente</th>
                         <th className="px-10 py-5">Segmento</th>
                         <th className="px-10 py-5">Frequência</th>
                         <th className="px-10 py-5">Gasto Total</th>
                         <th className="px-10 py-5">Favorito</th>
                         <th className="px-10 py-5">Status</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                       {[
                         { name: "João Silva", segment: "VIP", freq: "4x/mês", total: "R$ 1.2k", fuel: "V-Power", status: "Ativo" },
                         { name: "Maria Oliveira", segment: "APP", freq: "12x/mês", total: "R$ 4.5k", fuel: "Etanol", status: "Ativo" },
                         { name: "Pedro Santos", segment: "Risco", freq: "0x/mês", total: "R$ 800", fuel: "Diesel", status: "Inativo" },
                       ].map((client, i) => (
                         <tr key={i} className="hover:bg-slate-50 transition-colors">
                           <td className="px-10 py-6 font-bold text-slate-700">{client.name}</td>
                           <td className="px-10 py-6">
                             <Badge className={cn("border-none text-[8px] font-bold uppercase tracking-widest", client.segment === "VIP" ? "bg-yellow-50 text-yellow-700" : client.segment === "APP" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                               {client.segment}
                             </Badge>
                           </td>
                           <td className="px-10 py-6 text-sm text-slate-500 font-bold">{client.freq}</td>
                           <td className="px-10 py-6 font-bold text-slate-700">{client.total}</td>
                           <td className="px-10 py-6 text-sm text-slate-500">{client.fuel}</td>
                           <td className="px-10 py-6">
                             <Badge className={cn("border-none text-[9px] font-bold uppercase", client.status === "Ativo" ? "bg-green-50 text-primary" : "bg-slate-50 text-slate-400")}>{client.status}</Badge>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipe" className="space-y-8 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                 <CardHeader className="p-10 border-b border-slate-50">
                   <CardTitle className="text-xl font-bold text-slate-800 uppercase tracking-widest">Ranking de Operadores</CardTitle>
                 </CardHeader>
                 <CardContent className="p-0">
                    <div className="divide-y divide-slate-50">
                       {[
                         { name: "Carlos", sales: 152, vol: "4.2k L", rating: 4.9, color: "bg-blue-500" },
                         { name: "Rodrigo", sales: 128, vol: "3.8k L", rating: 4.8, color: "bg-orange-500" },
                         { name: "Ana", sales: 115, vol: "3.1k L", rating: 5.0, color: "bg-purple-500" },
                       ].map((staff, i) => (
                         <div key={i} className="flex items-center justify-between p-8 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-5">
                              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg", staff.color)}>
                                {staff.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-800">{staff.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className="bg-slate-50 text-slate-400 border-none text-[8px] font-bold uppercase tracking-widest">{staff.sales} Transações</Badge>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-[10px] font-bold text-slate-400">{staff.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Volume</p>
                              <p className="text-2xl font-headline font-bold text-slate-800">{staff.vol}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </CardContent>
               </Card>

               <div className="space-y-6">
                 <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 px-4">Alertas Operacionais</h2>
                 <div className="space-y-4">
                   {[
                     { msg: "Tentativa de uso de código expirado (#442-881)", time: "10m atrás", type: "suspect" },
                     { msg: "Divergência de valor na Bomba #4: R$ 5,00", time: "2h atrás", type: "warning" },
                     { msg: "Nova meta de turno batida por Carlos", time: "4h atrás", type: "success" },
                   ].map((alert, i) => (
                     <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl shadow-md border border-slate-50">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", alert.type === "suspect" ? "bg-red-50 text-red-500" : alert.type === "warning" ? "bg-orange-50 text-orange-500" : "bg-green-50 text-green-500")}>
                          {alert.type === "suspect" ? <AlertTriangle className="w-6 h-6" /> : alert.type === "warning" ? <AlertTriangle className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-tight">{alert.msg}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{alert.time}</p>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          </TabsContent>

          <TabsContent value="financeiro" className="space-y-8 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                   <CardContent className="p-10 space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total Cashback (Mês)</p>
                      <h3 className="text-4xl font-headline font-bold text-slate-800">R$ 18.420</h3>
                      <p className="text-xs text-primary font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> 5.4% do faturamento app
                      </p>
                   </CardContent>
                </Card>
                <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                   <CardContent className="p-10 space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Faturamento Incremental</p>
                      <h3 className="text-4xl font-headline font-bold text-primary">R$ 142.500</h3>
                      <p className="text-xs text-slate-400 font-bold">Vendas que não ocorreriam sem o app</p>
                   </CardContent>
                </Card>
                <Card className="border-none shadow-xl bg-slate-900 rounded-[2.5rem] overflow-hidden text-white">
                   <CardContent className="p-10 space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">ROI Estimado do Programa</p>
                      <h3 className="text-4xl font-headline font-bold text-white">7.8x</h3>
                      <p className="text-xs text-primary font-bold">Cada R$ 1,00 volta R$ 7,80</p>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function Star(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
