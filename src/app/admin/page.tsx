"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  Store, 
  Building2, 
  Users, 
  TrendingUp, 
  Globe, 
  Settings, 
  Search, 
  MoreVertical,
  ArrowUpRight,
  Activity,
  Plus,
  ArrowLeft,
  LayoutDashboard,
  LogOut,
  Bell
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

function SaaSAdminContent() {
  const [activeView, setActiveView] = useState("dashboard")

  const chartData = [
    { name: "Jan", volume: 120000, usuarios: 4500 },
    { name: "Fev", volume: 150000, usuarios: 5200 },
    { name: "Mar", volume: 180000, usuarios: 6100 },
    { name: "Abr", volume: 220000, usuarios: 7800 },
    { name: "Mai", volume: 210000, usuarios: 8200 },
    { name: "Jun", volume: 280000, usuarios: 9500 },
  ]

  const chartConfig = {
    volume: { label: "Volume (Litros)", color: "hsl(var(--primary))" },
    usuarios: { label: "Usuários Ativos", color: "hsl(221, 83%, 53%)" }
  } satisfies ChartConfig

  const navItems = [
    { id: "dashboard", label: "Dashboard Global", icon: LayoutDashboard },
    { id: "postos", label: "Postos Parceiros", icon: Store },
    { id: "empresas", label: "Contas Corporativas", icon: Building2 },
    { id: "usuarios", label: "Base de Usuários", icon: Users },
    { id: "config", label: "Configurações", icon: Settings },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50 w-full">
        {/* Sidebar Master */}
        <Sidebar className="border-r border-slate-200 bg-white" collapsible="icon">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-xl text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <h2 className="font-headline font-bold text-slate-800 truncate">Tá no Posto</h2>
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
                <Link href="/" className="w-full">
                  <SidebarMenuButton className="h-12 rounded-xl font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 px-4">
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className="group-data-[collapsible=icon]:hidden uppercase text-[11px] tracking-wider">Sair do Master</span>
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
                Admin Central • {navItems.find(n => n.id === activeView)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-4">
               <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[10px] uppercase">v2.4.0 Stable</Badge>
               <Button variant="ghost" size="icon" className="text-slate-400 relative">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
               </Button>
            </div>
          </header>

          <main className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-10">
            
            {activeView === "dashboard" && (
              <div className="space-y-10 animate-in fade-in duration-500">
                {/* Master KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Postos Ativos", val: "1.242", trend: "+12", icon: Store, color: "primary" },
                    { label: "Empresas Parceiras", val: "482", trend: "+4", icon: Building2, color: "blue-500" },
                    { label: "Base de Usuários", val: "128.500", trend: "+2.4k", icon: Users, color: "orange-500" },
                    { label: "GMV Transacionado", val: "R$ 4.8M", trend: "+18%", icon: TrendingUp, color: "green-500" },
                  ].map((kpi, i) => {
                    const Icon = kpi.icon
                    return (
                      <Card key={i} className="border-none shadow-lg bg-white overflow-hidden transition-all hover:scale-[1.02]">
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
                      <CardTitle className="text-xl font-bold text-slate-800 uppercase tracking-[0.2em]">Crescimento da Rede (Semestre)</CardTitle>
                      <CardDescription>Comparativo entre volume de litros processados e usuários ativos</CardDescription>
                    </CardHeader>
                    <CardContent className="p-10">
                      <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                          <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />
                          <Bar dataKey="volume" fill="var(--color-volume)" radius={[8, 8, 0, 0]} barSize={40} />
                          <Bar dataKey="usuarios" fill="var(--color-usuarios)" radius={[8, 8, 0, 0]} barSize={40} />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-slate-900 border-none shadow-2xl text-white rounded-[2.5rem] overflow-hidden h-full">
                      <CardContent className="p-10 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/20 rounded-2xl">
                            <Activity className="w-7 h-7 text-primary" />
                          </div>
                          <h3 className="font-bold text-lg uppercase tracking-[0.2em]">Health Check</h3>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                               <span>Server Response</span>
                               <span className="text-primary">99.9%</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-primary w-[99.9%]" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                               <span>Transações / Min</span>
                               <span className="text-blue-400">1.4k</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-400 w-[75%]" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                               <span>Queue Status</span>
                               <span className="text-orange-400">Normal</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-orange-400 w-[20%]" />
                             </div>
                          </div>
                        </div>
                        <Button className="w-full bg-primary text-white font-bold h-14 rounded-2xl mt-4">
                          VIEW SYSTEM LOGS
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 px-4">Novas Solicitações de Parceiros</h2>
                <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                  <CardContent className="p-0">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                              <th className="px-8 py-5">Entidade</th>
                              <th className="px-8 py-5">Tipo</th>
                              <th className="px-8 py-5">Localização</th>
                              <th className="px-8 py-5">Data Solicitação</th>
                              <th className="px-8 py-5 text-center">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {[
                              { name: "Posto Shell - Curitiba", type: "Posto", loc: "PR, Brasil", date: "Hoje, 10:42" },
                              { name: "LogisExpress LTDA", type: "Empresa", loc: "SP, Brasil", date: "Ontem, 18:00" },
                              { name: "Rede Ipiranga Sul", type: "Posto", loc: "RS, Brasil", date: "15 Out, 2024" },
                            ].map((req, i) => (
                              <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-slate-400">
                                      {req.type === "Posto" ? <Store className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                                    </div>
                                    <span className="font-bold text-slate-800 text-sm">{req.name}</span>
                                  </div>
                                </td>
                                <td className="px-8 py-6">
                                  <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[8px] uppercase">{req.type}</Badge>
                                </td>
                                <td className="px-8 py-6 text-sm text-slate-500 font-medium">{req.loc}</td>
                                <td className="px-8 py-6 text-sm text-slate-500">{req.date}</td>
                                <td className="px-8 py-6 text-center">
                                  <Button className="h-9 rounded-xl bg-slate-900 text-white font-bold text-[10px] px-4">ANALISAR</Button>
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

            {activeView !== "dashboard" && (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                 <div className="p-6 bg-slate-100 rounded-full animate-pulse text-slate-300">
                   <Settings className="w-12 h-12" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Módulo em Desenvolvimento</h2>
                 <p className="text-sm text-slate-400 max-w-xs">Esta funcionalidade do Master Admin está sendo preparada para o próximo release.</p>
              </div>
            )}

          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default function SaaSAdminPage() {
  return (
    <ProtectedRoute allowedRoles={['master-admin']}>
      <SaaSAdminContent />
    </ProtectedRoute>
  )
}