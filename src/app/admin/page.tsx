
"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LayoutDashboard, Droplets, Activity, BarChart3, Settings, QrCode, CheckCircle2, Fuel, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

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
        title: "Abastecimento Aprovado!",
        description: "Pagamento processado com desconto aplicado.",
      })
    }, 1500)
  }

  const resetForm = () => {
    setValidatingCode("")
    setFuelAmount("")
    setValidationSuccess(false)
  }

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-lg text-accent">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-headline font-bold tracking-tighter">Painel do Posto</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1 uppercase tracking-widest font-bold">
              Estação #402 Parceria
            </p>
          </div>
        </div>
        <div className="p-2 bg-secondary rounded-full">
           <Settings className="w-5 h-5 text-muted-foreground" />
        </div>
      </header>

      <Tabs defaultValue="validation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="validation">Atendimento</TabsTrigger>
          <TabsTrigger value="overview">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="validation" className="space-y-6 animate-in fade-in duration-500">
          {!validationSuccess ? (
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-primary" /> Validar Cliente
                </CardTitle>
                <CardDescription>Digite o código de 6 dígitos mostrado pelo cliente e o valor total do abastecimento.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-[10px] font-bold uppercase text-muted-foreground">Código do Cliente</Label>
                  <Input 
                    id="code"
                    placeholder="000-000" 
                    className="h-14 text-2xl font-headline font-bold text-center tracking-widest"
                    value={validatingCode}
                    onChange={(e) => setValidatingCode(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-[10px] font-bold uppercase text-muted-foreground">Valor Total (na Bomba)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      id="amount"
                      type="number"
                      placeholder="0,00" 
                      className="h-14 pl-12 text-xl font-bold"
                      value={fuelAmount}
                      onChange={(e) => setFuelAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl space-y-1">
                  <p className="text-[10px] font-bold text-primary uppercase">O sistema aplicará:</p>
                  <p className="text-xs font-medium text-slate-600">Cálculo de desconto automático e cobrança via Carteira Tá no posto.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleValidate}
                  disabled={!validatingCode || !fuelAmount || isValidating}
                  className="w-full h-14 bg-primary text-white font-bold text-lg rounded-2xl"
                >
                  {isValidating ? "Processando..." : "FINALIZAR E COBRAR"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-green-200 bg-green-50/30 animate-in zoom-in-95 duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold text-primary">SUCESSO!</h3>
                  <p className="text-sm text-slate-600">O abastecimento foi registrado e o desconto foi aplicado ao cliente.</p>
                </div>
                <div className="w-full p-4 bg-white rounded-xl border border-green-100 shadow-sm space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Valor Bomba:</span>
                    <span className="font-bold">R$ {fuelAmount}</span>
                  </div>
                  <div className="flex justify-between text-xs text-primary">
                    <span className="font-bold">Valor Cobrado (App):</span>
                    <span className="font-bold">R$ {(parseFloat(fuelAmount) * 0.95).toFixed(2)}</span>
                  </div>
                </div>
                <Button onClick={resetForm} variant="outline" className="w-full h-12 rounded-xl border-primary text-primary font-bold">
                  NOVO ATENDIMENTO
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Últimos Atendimentos</h2>
            <div className="space-y-3">
              {[
                { user: "João Silva", code: "442-881", amount: "R$ 150,00", time: "2m atrás" },
                { user: "Maria Oliveira", code: "109-224", amount: "R$ 200,00", time: "15m atrás" },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white rounded-xl border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{log.user}</p>
                      <p className="text-[9px] text-muted-foreground">Código: {log.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary">{log.amount}</p>
                    <p className="text-[9px] font-mono text-muted-foreground">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card border-accent/20">
              <CardContent className="p-4 space-y-2">
                <p className="text-2xl font-headline font-bold">42</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Vendas Hoje</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-primary/20">
              <CardContent className="p-4 space-y-2">
                <p className="text-2xl font-headline font-bold">R$ 12.4k</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Faturamento App</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-secondary to-background border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Movimentação Diária</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-24 w-full flex items-end gap-1 px-1">
                {[40, 60, 45, 90, 65, 80, 50, 75, 85, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all cursor-pointer" style={{ height: `${h}%` }} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Navigation />
    </main>
  )
}
