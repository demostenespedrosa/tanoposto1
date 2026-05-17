
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  CheckCircle2, 
  Fuel, 
  UserCheck, 
  ArrowLeft, 
  Info, 
  Users, 
  LogOut,
  ChevronRight,
  User
} from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const FRENTISTAS = [
  { id: 1, name: "Carlos", initials: "CR", color: "bg-blue-500" },
  { id: 2, name: "Rodrigo", initials: "RD", color: "bg-orange-500" },
  { id: 3, name: "Ana", initials: "AN", color: "bg-purple-500" },
  { id: 4, name: "Marcos", initials: "MC", color: "bg-green-500" },
]

export default function FrentistaPage() {
  const [selectedAttendant, setSelectedAttendant] = useState<any>(null)
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
        description: `Operação registrada por ${selectedAttendant.name}.`,
      })
    }, 1500)
  }

  const resetForm = () => {
    setValidatingCode("")
    setFuelAmount("")
    setValidationSuccess(false)
  }

  const handleSwitchAttendant = () => {
    setSelectedAttendant(null)
    resetForm()
  }

  // Tela de Seleção de Perfil (Estilo Netflix)
  if (!selectedAttendant) {
    return (
      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-2xl w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-headline font-bold tracking-tight">Quem está operando?</h1>
            <p className="text-slate-400 font-medium">Selecione seu perfil para iniciar as vendas</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FRENTISTAS.map((frentista) => (
              <button
                key={frentista.id}
                onClick={() => setSelectedAttendant(frentista)}
                className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
              >
                <div className={cn(
                  "w-32 h-32 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-2xl transition-all group-hover:ring-4 group-hover:ring-white",
                  frentista.color
                )}>
                  {frentista.initials}
                </div>
                <span className="text-lg font-bold text-slate-300 group-hover:text-white">{frentista.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-12">
            <Link href="/">
              <Button variant="ghost" className="text-slate-500 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Início
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Tela Operacional
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md space-y-6 pt-4">
        
        {/* Header Operacional com Troca de Usuário */}
        <header className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs", selectedAttendant.color)}>
              {selectedAttendant.initials}
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">Frentista Ativo</p>
              <h2 className="text-sm font-bold text-slate-800">{selectedAttendant.name}</h2>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSwitchAttendant}
            className="text-primary font-bold text-xs hover:bg-primary/5 rounded-xl"
          >
            TROCAR <LogOut className="w-3 h-3 ml-1" />
          </Button>
        </header>

        {!validationSuccess ? (
          <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
            <CardHeader className="text-center pb-2 pt-8">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Fuel className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-headline font-bold text-slate-800">Novo Abastecimento</CardTitle>
              <CardDescription className="font-medium">Finalize a venda com desconto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-3">
                <Label htmlFor="code" className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Código do Cliente</Label>
                <Input 
                  id="code"
                  placeholder="000-000" 
                  className="h-20 text-4xl font-headline font-bold text-center tracking-widest bg-slate-50 border-none rounded-3xl focus-visible:ring-primary"
                  value={validatingCode}
                  onChange={(e) => setValidatingCode(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="amount" className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Valor Total Bomba (R$)</Label>
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
                  O valor com desconto será cobrado automaticamente da carteira do cliente após a confirmação.
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
                ) : "CONFIRMAR"}
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
                <p className="text-sm text-slate-500 font-medium">Abastecimento registrado por <strong>{selectedAttendant.name}</strong>.</p>
              </div>
              
              <div className="w-full p-6 bg-slate-50 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Valor Bomba</span>
                  <span className="font-bold text-slate-800 text-lg">R$ {fuelAmount}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Valor com Desconto</span>
                  <span className="font-bold text-primary text-2xl">R$ {(parseFloat(fuelAmount) * 0.95).toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              
              <Button onClick={resetForm} className="w-full h-16 bg-slate-900 text-white font-bold rounded-2xl">
                PRÓXIMO ATENDIMENTO
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Histórico Simplificado do Turno */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Meus Atendimentos Hoje</h2>
            <span className="text-xs font-bold text-primary">Total: R$ 350,00</span>
          </div>
          <div className="space-y-3">
            {[
              { user: "João Silva", code: "442-881", amount: "R$ 150,00", time: "2m atrás" },
              { user: "Maria Oliveira", code: "109-224", amount: "R$ 200,00", time: "15m atrás" },
            ].map((log, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-400" />
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
