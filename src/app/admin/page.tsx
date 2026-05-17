
"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  LayoutDashboard, 
  Droplets, 
  Activity, 
  BarChart3, 
  Settings, 
  QrCode, 
  CheckCircle2, 
  Fuel, 
  DollarSign, 
  UserCheck, 
  TrendingUp, 
  ArrowUpRight, 
  Users, 
  Wallet,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export default function AdminPage() {
  const [validatingCode, setValidatingCode] = useState("")
  const [fuelAmount, setFuelAmount] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [validationSuccess, setValidationSuccess] = useState(false)

  const handleValidate = () => {
    setIsValidating(true)
    setTimeout(() => {
      setIsValidating(false)
      setValidationSuccess(true)
      toast({
        title: "Venda Finalizada!",
        description: "O pagamento foi processado com o desconto do app.",
      })
    }, 1500)
  }

  const resetForm = () => {
    setValidatingCode("")
    setFuelAmount("")
    setValidationSuccess(false)
  }

  // Dados fictícios para o dashboard do dono
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
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6 bg-slate-50">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-headline font-bold text-slate-800">Posto Modelo</h1>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Unidade #402</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="bg-white shadow-sm border border-slate-100 rounded-full">
            <Settings className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </header>

      <Tabs defaultValue="frentista" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-slate-200/50 p-1 rounded-2xl h-14">
          <TabsTrigger value="frentista" className="rounded-xl font-bold text-xs data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <UserCheck className="w-4 h-4 mr-2" /> OPERAÇÃO
          </TabsTrigger>
          <TabsTrigger value="gerente" className="rounded-xl font-bold text-xs data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <BarChart3 className="w-4 h-4 mr-2" /> GESTÃO
          </TabsTrigger>
        </TabsList>

        {/* --- SISTEMA DO FRENTISTA (SIMPLES E DIRETO) --- */}
        <TabsContent value="frentista" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {!validationSuccess ? (
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-headline font-bold text-slate-800">Novo Abastecimento</CardTitle>
                <CardDescription className="font-medium">Finalize a venda do cliente Tá no posto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="space-y-3">
                  <Label htmlFor="code" className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Código do Cliente (6 dígitos)</Label>
                  <Input 
                    id="code"
                    placeholder="000-000" 
                    className="h-20 text-4xl font-headline font-bold text-center tracking-widest bg-slate-50 border-none rounded-3xl focus-visible:ring-primary"
                    value={validatingCode}
                    onChange={(e) => setValidatingCode(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Valor Total na Bomba (R$)</Label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">R$</span>
                    <Input 
                      id="amount"
                      type="number"
                      placeholder="0,00" 
                      className="h-20 pl-16 text-3xl font-bold bg-slate-50 border-none rounded-3xl focus-visible:ring-primary"
                      value={fuelAmount}
                      onChange={(e) => setFuelAmount(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-primary leading-tight">
                    O sistema cobrará o cliente via saldo ou cartão cadastrado, aplicando o desconto automaticamente.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="px-8 pb-10">
                <Button 
                  onClick={handleValidate}
                  disabled={!validatingCode || !fuelAmount || isValidating}
                  className="w-full h-20 bg-primary text-white font-bold text-xl rounded-3xl shadow-xl shadow-primary/30 transition-all active:scale-95"
                >
                  {isValidating ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      PROCESSANDO...
                    </div>
                  ) : "CONFIRMAR PAGAMENTO"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-none bg-white shadow-2xl rounded-[2.5rem] animate-in zoom-in-95 duration-300 overflow-hidden">
              <CardContent className="p-10 flex flex-col items-center text-center gap-8">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-headline font-bold text-primary uppercase tracking-tight">Venda Aprovada!</h3>
                  <p className="text-sm text-slate-500 font-medium">O abastecimento foi registrado e o pagamento processado com sucesso.</p>
                </div>
                
                <div className="w-full p-6 bg-slate-50 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">Valor Bomba</span>
                    <span className="font-bold text-slate-800 text-lg">R$ {fuelAmount}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-4 border-t border-slate-200">
                    <span className="text-primary font-bold uppercase tracking-widest">Valor Cobrado</span>
                    <span className="font-bold text-primary text-2xl">R$ {(parseFloat(fuelAmount) * 0.95).toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                
                <Button onClick={resetForm} className="w-full h-16 bg-slate-900 text-white font-bold rounded-2xl">
                  PRÓXIMO CLIENTE
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Últimos Atendimentos</h2>
            <div className="space-y-3">
              {[
                { user: "João Silva", code: "442-881", amount: "R$ 150,00", time: "2m atrás" },
                { user: "Maria Oliveira", code: "109-224", amount: "R$ 200,00", time: "15m atrás" },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                      <Fuel className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{log.user}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">ID: {log.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{log.amount}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* --- PAINEL DO DONO/GERENTE (ESTATÍSTICAS) --- */}
        <TabsContent value="gerente" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <Badge variant="outline" className="text-[8px] h-4 bg-green-50 text-primary border-none font-bold">+12%</Badge>
                </div>
                <div>
                  <p className="text-2xl font-headline font-bold text-slate-800">42</p>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Vendas Hoje</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between">
                  <Wallet className="w-4 h-4 text-primary" />
                  <Badge variant="outline" className="text-[8px] h-4 bg-blue-50 text-blue-500 border-none font-bold">REPASSE</Badge>
                </div>
                <div>
                  <p className="text-2xl font-headline font-bold text-slate-800">R$ 12.4k</p>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Faturamento App</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-md bg-white overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-widest">Vendas na Semana</CardTitle>
                  <CardDescription className="text-[10px] font-medium">Relatório de movimentação</CardDescription>
                </div>
                <Calendar className="w-4 h-4 text-slate-300" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[180px] w-full mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: '#f1f5f9' }}
                     />
                     <Bar dataKey="vendas" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Indicadores de Fidelidade</h2>
            <div className="grid gap-3">
               {[
                 { label: "Clientes Recorrentes", val: "78%", icon: Users, color: "text-blue-500" },
                 { label: "Cashback Acumulado", val: "R$ 1.250", icon: Gift, color: "text-purple-500" },
                 { label: "Ticket Médio", val: "R$ 185,40", icon: DollarSign, color: "text-green-500" },
               ].map((stat, i) => (
                 <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center", stat.color)}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{stat.label}</span>
                    </div>
                    <span className="font-headline font-bold text-slate-800">{stat.val}</span>
                 </div>
               ))}
            </div>
          </div>

          <Card className="bg-slate-900 border-none shadow-xl text-white">
            <CardContent className="p-6 space-y-4">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary/20 rounded-lg">
                   <ArrowUpRight className="w-5 h-5 text-primary" />
                 </div>
                 <h3 className="font-bold text-sm uppercase tracking-widest">Análise de IA Oktano</h3>
               </div>
               <p className="text-[11px] text-slate-400 leading-relaxed">
                 O fluxo de clientes deve aumentar **15%** no próximo final de semana. Sugerimos ativar a campanha de "Cashback em Dobro" para fidelizar novos usuários.
               </p>
               <Button variant="link" className="p-0 h-auto text-[10px] font-bold text-primary">CONFIGURAR CAMPANHA</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Navigation />
    </main>
  )
}

function Building2(props: any) {
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
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  )
}

function Info(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function Gift(props: any) {
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
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect width="20" height="5" x="2" y="7" />
      <line x1="12" x2="12" y1="22" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

