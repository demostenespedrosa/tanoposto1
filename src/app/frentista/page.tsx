
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Fuel, UserCheck, ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function FrentistaPage() {
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

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <header className="flex justify-between items-center px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-headline font-bold text-slate-800 uppercase tracking-tight">Operação</h1>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Posto Modelo • Frentista</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-400">
              <ArrowLeft className="w-4 h-4 mr-1" /> Sair
            </Button>
          </Link>
        </header>

        {!validationSuccess ? (
          <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-headline font-bold text-slate-800">Novo Abastecimento</CardTitle>
              <CardDescription className="font-medium">Finalize a venda com desconto</CardDescription>
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
                <p className="text-[11px] font-medium text-primary leading-tight italic">
                  O valor com desconto será calculado e cobrado automaticamente da carteira do cliente.
                </p>
              </div>
            </CardContent>
            <CardFooter className="px-8 pb-10">
              <Button 
                onClick={handleValidate}
                disabled={!validatingCode || !fuelAmount || isValidating}
                className="w-full h-24 bg-primary text-white font-bold text-2xl rounded-3xl shadow-xl shadow-primary/30 transition-all active:scale-95"
              >
                {isValidating ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
      </div>
    </main>
  )
}
