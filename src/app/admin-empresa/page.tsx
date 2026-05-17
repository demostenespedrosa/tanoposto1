"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  Users, 
  Wallet, 
  Plus, 
  History, 
  BarChart3, 
  ArrowUpRight, 
  Search, 
  Filter, 
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  MoreVertical,
  LayoutDashboard,
  FileText,
  Settings,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function AdminEmpresaContent() {
  const [activeView, setActiveView] = useState("visao-geral")

  const chartData = [
    { name: "Semana 1", valor: 4500 },
    { name: "Semana 2", valor: 5200 },
    { name: "Semana 3", valor: 3800 },
    { name: "Semana 4", valor: 6100 },
  ]

  const chartConfig = {
    valor: { label: "Gasto Mensal", color: "hsl(var(--primary))" }
  } satisfies ChartConfig

  const navItems = [
    { id: "visao-geral", label: "Visão Geral", icon: LayoutDashboard },
    { id: "colaboradores", label: "Colaboradores", icon: Users },
    { id: "financeiro", label: "Financeiro", icon: Wallet },
    { id: "relatorios", label: "Relatórios", icon: FileText },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50 w-full">
        {/* Sidebar Corporativa */}
        <Sidebar className="border-r border-slate-200 bg-white" collapsible="icon">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <h2 className="font-headline font-bold text-slate-800 truncate">TechCorp</h2>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Master Admin</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeView === item.id}
                    onClick={() => setActiveView(item.id)}
                    className={cn(
                      "h-12 rounded-xl transition-all font-bold px-4",
                      activeView === item.id 
                        ? "bg-slate-900 text-white hover:bg-slate-800 hover:text-white" 
                        : "text-slate-500 hover:bg-slate-100"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    <span className="group-data-[collapsible=icon]:hidden uppercase text-[11px] tracking-wider">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/profile" className="w-full">
                  <SidebarMenuButton className="h-12 rounded-xl font-bold text-slate-500 hover:bg-slate-100 px-4">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span className="group-data-[collapsible=icon]:hidden uppercase text-[11px] tracking-wider">Perfil Pessoal</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/" className="w-full">
                  <SidebarMenuButton className="h-12 rounded-xl font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 px-4">
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className="group-data-[collapsible=icon]:hidden uppercase text-[11px] tracking-wider">Sair</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="flex-1 overflow-auto bg-slate-50">
          <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-slate-500" />
              <div className="h-6 w-px bg-slate-200" />
              <h1 className="font-headline font-bold text-slate-800 text-lg uppercase tracking-widest">
                {navItems.find(n => n.id === activeView)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-4">
               <Badge className="bg-blue-100 text-blue-700 border-none font-bold text-[10px] uppercase group-data-[collapsible=icon]:hidden">Plano Enterprise</Badge>
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200">
                 TC
               </div>
            </div>
          </header>

          <main className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-10">
            
            {activeView === "visao-geral" && (
              <div className="space-y-10 animate-in fade-in duration-500">
                {/* KPIs Empresa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Saldo Master", val: "R$ 15.420", trend: "OK", icon: Wallet, color: "primary" },
                    { label: "Total Colaboradores", val: "142", trend: "+4", icon: Users, color: "blue-500" },
                    { label: "Gasto Mês", val: "R$ 8.940", trend: "-12%", icon: History, color: "orange-500" },
                    { label: "Economia Real", val: "R$ 642,50", trend: "+5%", icon: BarChart3, color: "green-500" },
                  ].map((kpi, i) => {
                    const Icon = kpi.icon
                    return (
                      <Card key={i} className="border-none shadow-lg bg-white overflow-hidden hover:scale-[1.02] transition-all">
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
                      <CardTitle className="text-xl font-bold text-slate-800 uppercase tracking-[0.2em]">Fluxo de Consumo Mensal</CardTitle>
                      <CardDescription>Acompanhamento de gastos por semana de todos os colaboradores</CardDescription>
                    </CardHeader>
                    <CardContent className="p-10">
                      <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                          <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />
                          <Bar dataKey="valor" fill="var(--color-valor)" radius={[8, 8, 0, 0]} barSize={40} />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-slate-900 border-none shadow-2xl text-white rounded-[2.5rem] overflow-hidden">
                      <CardContent className="p-10 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/20 rounded-2xl">
                            <CheckCircle2 className="w-7 h-7 text-primary" />
                          </div>
                          <h3 className="font-bold text-lg uppercase tracking-[0.2em]">Próxima Recarga</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-4 border-b border-white/10">
                            <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Data</span>
                            <span className="text-sm font-bold">01 Nov, 2024</span>
                          </div>
                          <div className="flex justify-between items-center py-4 border-b border-white/10">
                            <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Valor Estimado</span>
                            <span className="text-sm font-bold">R$ 12.500,00</span>
                          </div>
                        </div>
                        <Button className="w-full bg-primary text-white font-bold h-14 rounded-2xl mt-4">
                          DISTRIBUIR CRÉDITOS
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {activeView === "colaboradores" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input className="w-full bg-white border border-slate-200 rounded-xl h-11 pl-10 text-xs font-bold shadow-sm" placeholder="PESQUISAR COLABORADOR..." />
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none h-11 rounded-xl font-bold text-xs bg-white">
                      <Filter className="w-4 h-4 mr-2" /> FILTRAR
                    </Button>
                    <Button className="flex-1 md:flex-none bg-slate-900 text-white h-11 rounded-xl font-bold text-xs">
                      <Plus className="w-4 h-4 mr-2" /> NOVO CADASTRO
                    </Button>
                  </div>
                </div>

                <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                            <th className="px-8 py-5">Colaborador</th>
                            <th className="px-8 py-5">Departamento</th>
                            <th className="px-8 py-5">Saldo Atual</th>
                            <th className="px-8 py-5">Gasto Médio</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[
                            { name: "Carlos Andrade", dept: "Logística", balance: "R$ 450,00", avg: "R$ 1.2k/mês", status: "Ativo" },
                            { name: "Ana Beatriz", dept: "Vendas", balance: "R$ 120,50", avg: "R$ 600/mês", status: "Ativo" },
                            { name: "Rodrigo Lima", dept: "Suporte", balance: "R$ 0,00", avg: "R$ 400/mês", status: "Saldo Baixo" },
                            { name: "Mariana Costa", dept: "Diretoria", balance: "R$ 1.200,00", avg: "R$ 2k/mês", status: "Ativo" },
                          ].map((emp, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors group">
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                                    {emp.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-800 text-sm">{emp.name}</p>
                                    <p className="text-[10px] text-slate-400">carlos.a@techcorp.com</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6 text-sm text-slate-500 font-medium">{emp.dept}</td>
                              <td className="px-8 py-6 font-bold text-slate-800">{emp.balance}</td>
                              <td className="px-8 py-6 text-sm text-slate-500">{emp.avg}</td>
                              <td className="px-8 py-6">
                                <Badge className={cn(
                                  "border-none text-[8px] font-bold uppercase tracking-widest",
                                  emp.status === "Ativo" ? "bg-green-50 text-primary" : "bg-red-50 text-red-600"
                                )}>
                                  {emp.status}
                                </Badge>
                              </td>
                              <td className="px-8 py-6 text-center">
                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100">
                                  <MoreVertical className="w-4 h-4 text-slate-400" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeView === "financeiro" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                          <CreditCard className="w-6 h-6 text-primary" />
                        </div>
                        <Button variant="link" className="p-0 h-auto text-[10px] font-bold text-primary">TROCAR CARTÃO</Button>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cartão Cadastrado</p>
                        <h4 className="text-lg font-bold text-slate-800 mt-1">VISA •••• 8812</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Expira em 12/28</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8 space-y-4">
                      <div className="p-3 bg-orange-50 rounded-2xl w-fit">
                        <History className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Gasto (Histórico)</p>
                        <h4 className="text-2xl font-headline font-bold text-slate-800 mt-1">R$ 142.500,00</h4>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-xl bg-blue-600 rounded-[2.5rem] overflow-hidden text-white">
                    <CardContent className="p-8 space-y-4">
                      <div className="p-3 bg-white/20 rounded-2xl w-fit">
                        <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Créditos Ativos</p>
                        <h4 className="text-2xl font-headline font-bold text-white mt-1">R$ 15.420,00</h4>
                        <p className="text-[10px] text-white/50 mt-1">Disponível para distribuição</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 px-4">Últimas Atividades Financeiras</h2>
                <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-50">
                      {[
                        { type: "RECARGA MASTER", date: "Hoje, 09:12", val: "+ R$ 5.000", method: "Cartão VISA", status: "Confirmado" },
                        { type: "DISTRIBUIÇÃO", date: "Ontem, 18:00", val: "- R$ 2.400", method: "12 Colaboradores", status: "Concluído" },
                        { type: "RECARGA MASTER", date: "15 Out, 14:20", val: "+ R$ 10.000", method: "PIX", status: "Confirmado" },
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between p-8 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={cn("p-2 rounded-xl", tx.type === "RECARGA MASTER" ? "bg-green-50 text-primary" : "bg-slate-50 text-slate-600")}>
                              {tx.type === "RECARGA MASTER" ? <ArrowUpRight className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-widest">{tx.type}</h4>
                              <p className="text-[10px] text-slate-400">{tx.date} • {tx.method}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={cn("text-lg font-headline font-bold", tx.val.startsWith("+") ? "text-primary" : "text-slate-800")}>{tx.val}</p>
                            <Badge className="bg-slate-100 text-slate-400 border-none text-[8px] font-bold uppercase tracking-widest">{tx.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeView === "relatorios" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="border-none shadow-xl bg-white rounded-[2.5rem] p-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-50 rounded-2xl">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-headline font-bold text-xl uppercase tracking-widest">Relatório de Consumo por Departamento</h3>
                    </div>
                    <p className="text-sm text-slate-500">Visualize detalhadamente como cada setor da empresa está utilizando o benefício.</p>
                    <Button className="w-full bg-slate-900 text-white font-bold h-12 rounded-xl">GERAR RELATÓRIO PDF</Button>
                  </Card>

                  <Card className="border-none shadow-xl bg-white rounded-[2.5rem] p-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 rounded-2xl">
                        <Settings className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-headline font-bold text-xl uppercase tracking-widest">Configurações de Limite</h3>
                    </div>
                    <p className="text-sm text-slate-500">Defina limites mensais máximos por cargo ou departamento.</p>
                    <Button variant="outline" className="w-full border-slate-200 text-slate-600 font-bold h-12 rounded-xl">CONFIGURAR REGRAS</Button>
                  </Card>
                </div>
              </div>
            )}

          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default function AdminEmpresaPage() {
  return (
    <ProtectedRoute allowedRoles={['admin-empresa']}>
      <AdminEmpresaContent />
    </ProtectedRoute>
  )
}