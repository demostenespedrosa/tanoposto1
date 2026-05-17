
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  CheckCircle2, 
  Fuel, 
  ArrowLeft, 
  Info, 
  LogOut,
  User,
  History,
  LayoutDashboard
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
      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white overflow-y-auto">
        <div className="max-w-4xl w-full text-center space-y-12 py-12">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
               <div className="p-4 bg-primary rounded-3xl shadow-2xl shadow-primary/20">
                 <Fuel className="w-10 h-10 text-white" />
               </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">Quem está operando?</h1>
            <p className="text-slate-400 font-medium text-lg">Selecione seu perfil para iniciar as vendas do turno</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 px-4">
            {FRENTISTAS.map((frentista) => (
              <button
                key={frentista.id}
                onClick={() => setSelectedAttendant(frentista)}
                className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-110"
              >
                <div className={cn(
                  "w-28 h-28 md:w-40 md:h-40 rounded-[2rem] flex items-center justify-center text-3xl md:text-5xl font-bold shadow-2xl transition-all ring-offset-4 ring-offset-slate-900 group-hover:ring-4 group-hover:ring-white",
                  frentista.color
                )}>
                  {frentista.initials}
                </div>
                <span className="text-base md:text-xl font-bold text-slate-300 group-hover:text-white">{frentista.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-12">
            <Link href="/profile">
              <Button variant="ghost" className="text-slate-500 hover:text-white hover:bg-white/10 rounded-2xl h-12 px-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Perfil
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Tela Operacional
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna da Esquerda: Operação Principal */}
        <div className="lg:col-span-7 space-y-6">
          <header className="flex justify-between items-center bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-lg", selectedAttendant.color)}>
                {selectedAttendant.initials}
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1">Operador Logado</p>
                <h2 className="text-lg font-bold text-slate-800">{selectedAttendant.name}</h2>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSwitchAttendant}
                className="text-slate-500 font-bold text-xs hover:bg-slate-100 rounded-xl h-10 px-4"
              >
                TROCAR <LogOut className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </header>

          {!validationSuccess ? (
            <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
              <CardHeader className="text-center pb-2 pt-10">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Fuel className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-headline font-bold text-slate-800">Registrar Venda</CardTitle>
                <CardDescription className="text-base font-medium">Finalize o abastecimento com o desconto do cliente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-6 md:p-10">
                <div className="space-y-4">
                  <Label htmlFor="code" className="text-xs font-bold uppercase text-slate-400 tracking-[0.2em] ml-2">Código do Cliente (6 Dígitos)</Label>
                  <Input 
                    id="code"
                    placeholder="000-000" 
                    className="h-24 md:h-28 text-5xl md:text-6xl font-headline font-bold text-center tracking-[0.3em] bg-slate-50 border-none rounded-[2rem] focus-visible:ring-primary shadow-inner"
                    value={validatingCode}
                    onChange={(e) => setValidatingCode(e.target.value)}
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="amount" className="text-xs font-bold uppercase text-slate-400 tracking-[0.2em] ml-2">Valor Total na Bomba (R$)</Label>
                  <div className="relative">
                    <span className="absolute left-8 top-1/2 -translate-y-1/2 text-3xl font-bold text-slate-300">R$</span>
                    <Input 
                      id="amount"
                      type="number"
                      placeholder="0,00" 
                      className="h-24 md:h-28 pl-20 text-4xl md:text-5xl font-bold bg-slate-50 border-none rounded-[2rem] focus-visible:ring-primary shadow-inner"
                      value={fuelAmount}
                      onChange={(e) => setFuelAmount(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 p-5 bg-primary/5 rounded-[1.5rem] border border-primary/10 items-center">
                  <Info className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-xs md:text-sm font-medium text-primary leading-tight">
                    O pagamento será debitado da carteira digital do cliente e o desconto de <strong>5%</strong> será aplicado na hora.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="px-6 md:px-10 pb-12">
                <Button 
                  onClick={handleValidate}
                  disabled={!validatingCode || !fuelAmount || isValidating}
                  className="w-full h-24 bg-primary text-white font-bold text-2xl md:text-3xl rounded-[2rem] shadow-2xl shadow-primary/30 transition-all active:scale-95"
                >
                  {isValidating ? (
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      PROCESSANDO...
                    </div>
                  ) : "CONFIRMAR PAGAMENTO"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-none bg-white shadow-2xl rounded-[3rem] animate-in zoom-in-95 duration-300 overflow-hidden">
              <CardContent className="p-12 flex flex-col items-center text-center gap-10">
                <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_50px_rgba(14,165,233,0.3)]">
                  <CheckCircle2 className="w-14 h-14 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-4xl font-headline font-bold text-primary uppercase tracking-tight">Venda Aprovada!</h3>
                  <p className="text-lg text-slate-500 font-medium">Abastecimento registrado com sucesso por <strong>{selectedAttendant.name}</strong>.</p>
                </div>
                
                <div className="w-full p-8 bg-slate-50 rounded-[2rem] space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Valor na Bomba</span>
                    <span className="font-bold text-slate-800 text-2xl">R$ {parseFloat(fuelAmount).toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                    <span className="text-xs text-primary font-bold uppercase tracking-widest">Valor com Desconto</span>
                    <span className="font-bold text-primary text-4xl">R$ {(parseFloat(fuelAmount) * 0.95).toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                
                <Button onClick={resetForm} className="w-full h-20 bg-slate-900 text-white font-bold text-xl rounded-[1.5rem] shadow-xl transition-all hover:bg-slate-800">
                  PRÓXIMO ATENDIMENTO
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Coluna da Direita: Histórico e Status (Oculto em mobile dependendo da tela) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <History className="w-4 h-4" /> Meus Atendimentos Hoje
              </h2>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Total: R$ 350,00</span>
            </div>
            
            <div className="space-y-3">
              {[
                { user: "João Silva", code: "442-881", amount: "R$ 150,00", time: "2m atrás", status: "Aprovado" },
                { user: "Maria Oliveira", code: "109-224", amount: "R$ 200,00", time: "15m atrás", status: "Aprovado" },
                { user: "Pedro Santos", code: "882-101", amount: "R$ 80,00", time: "1h atrás", status: "Aprovado" },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-white rounded-[1.5rem] shadow-sm border border-slate-50 transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                      <User className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800">{log.user}</p>
                      <p className="text-xs text-muted-foreground font-mono">ID: {log.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{log.amount}</p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-slate-900 border-none shadow-2xl text-white rounded-[2rem] overflow-hidden">
             <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-xl">
                    <LayoutDashboard className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg uppercase tracking-widest">Status da Pista</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Vendas no Turno</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Litros Vendidos</p>
                    <p className="text-2xl font-bold">450L</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed text-center italic">
                  Bom trabalho, {selectedAttendant.name}! O movimento está 20% acima da média para este horário.
                </p>
             </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
