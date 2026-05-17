
"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
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
  LayoutDashboard,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

const FRENTISTAS = [
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const FRENTISTAS = [
  { id: 1, name: "Carlos", initials: "CR", color: "bg-blue-500" },
  { id: 2, name: "Rodrigo", initials: "RD", color: "bg-orange-500" },
  { id: 3, name: "Ana", initials: "AN", color: "bg-purple-500" },
  { id: 4, name: "Marcos", initials: "MC", color: "bg-green-500" },
]

function FrentistaContent() {
  const { logout } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

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

  if (!selectedAttendant) {
    return (
      <main className="h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
               <div className="p-3 bg-primary rounded-2xl shadow-2xl shadow-primary/20">
                 <Fuel className="w-8 h-8 text-white" />
               </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Quem está operando?</h1>
            <p className="text-slate-400 font-medium text-base">Selecione seu perfil para iniciar</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {FRENTISTAS.map((frentista) => (
              <button
                key={frentista.id}
                onClick={() => setSelectedAttendant(frentista)}
                className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <div className={cn(
                  "w-24 h-24 md:w-32 md:h-32 rounded-[1.5rem] flex items-center justify-center text-2xl md:text-4xl font-bold shadow-2xl transition-all ring-offset-4 ring-offset-slate-900 group-hover:ring-4 group-hover:ring-white",
                  frentista.color
                )}>
                  {frentista.initials}
                </div>
                <span className="text-sm md:text-base font-bold text-slate-300 group-hover:text-white">{frentista.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-6">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white hover:bg-white/10 rounded-xl h-10 px-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen bg-slate-50 flex flex-col p-2 md:p-6 overflow-hidden">
      <div className="flex-1 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        
        {/* Operação Principal */}
        <div className="lg:col-span-7 flex flex-col gap-4 h-full">
          <header className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md", selectedAttendant.color)}>
                {selectedAttendant.initials}
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-0.5">Operador</p>
                <h2 className="text-sm font-bold text-slate-800">{selectedAttendant.name}</h2>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-red-500 font-bold text-[10px] hover:bg-red-50 rounded-lg h-8 px-3"
            >
              {isLoggingOut ? (
                <Loader2 className="w-3 h-3 animate-spin mr-2" />
              ) : (
                <LogOut className="w-3 h-3 mr-2" />
              )}
              SAIR DO SISTEMA
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSwitchAttendant}
              className="text-slate-500 font-bold text-[10px] hover:bg-slate-100 rounded-lg h-8 px-3 ml-2"
            >
              TROCAR OPERADOR
            </Button>
          </header>

          <div className="flex-1 flex flex-col justify-center min-h-0">
            {!validationSuccess ? (
              <Card className="border-none shadow-xl bg-white rounded-[2rem] flex flex-col h-full overflow-hidden">
                <CardHeader className="text-center py-4 shrink-0">
                  <CardTitle className="text-2xl font-headline font-bold text-slate-800">Registrar Venda</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-around px-6 py-2 overflow-y-auto">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Código do Cliente</Label>
                    <Input 
                      placeholder="000-000" 
                      className="h-16 md:h-20 text-4xl md:text-5xl font-headline font-bold text-center tracking-[0.2em] bg-slate-50 border-none rounded-2xl focus-visible:ring-primary shadow-inner"
                      value={validatingCode}
                      onChange={(e) => setValidatingCode(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Valor Total (R$)</Label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">R$</span>
                      <Input 
                        type="number"
                        placeholder="0,00" 
                        className="h-16 md:h-20 pl-16 text-3xl md:text-4xl font-bold bg-slate-50 border-none rounded-2xl focus-visible:ring-primary shadow-inner"
                        value={fuelAmount}
                        onChange={(e) => setFuelAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10 items-center">
                    <Info className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-[10px] font-medium text-primary">Desconto de 5% será aplicado no fechamento.</p>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-2 shrink-0">
                  <Button 
                    onClick={handleValidate}
                    disabled={!validatingCode || !fuelAmount || isValidating}
                    className="w-full h-16 bg-primary text-white font-bold text-xl rounded-2xl shadow-xl shadow-primary/20"
                  >
                    {isValidating ? "PROCESSANDO..." : "CONFIRMAR PAGAMENTO"}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border-none bg-white shadow-xl rounded-[2rem] animate-in zoom-in-95 duration-300 h-full flex flex-col overflow-hidden">
                <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-headline font-bold text-primary uppercase">Aprovada!</h3>
                    <p className="text-sm text-slate-500">Venda realizada com sucesso.</p>
                  </div>
                  
                  <div className="w-full p-4 bg-slate-50 rounded-xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold uppercase">Bomba</span>
                      <span className="font-bold text-slate-800">R$ {parseFloat(fuelAmount).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                      <span className="text-primary font-bold uppercase text-xs">Final</span>
                      <span className="font-bold text-primary text-2xl">R$ {(parseFloat(fuelAmount) * 0.95).toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                  
                  <Button onClick={resetForm} className="w-full h-14 bg-slate-900 text-white font-bold rounded-xl shadow-md">
                    PRÓXIMO ATENDIMENTO
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Histórico Lateral */}
        <div className="lg:col-span-5 flex flex-col gap-4 h-full min-h-0">
          <div className="flex justify-between items-center px-2 shrink-0">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <History className="w-3 h-3" /> Meus Atendimentos
            </h2>
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Hoje: R$ 350,00</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
            {[
              { user: "João Silva", code: "442-881", amount: "R$ 150,00", time: "2m", status: "Aprovado" },
              { user: "Maria Oliveira", code: "109-224", amount: "R$ 200,00", time: "15m", status: "Aprovado" },
              { user: "Pedro Santos", code: "882-101", amount: "R$ 80,00", time: "1h", status: "Aprovado" },
              { user: "Ana Paula", code: "551-992", amount: "R$ 120,00", time: "2h", status: "Aprovado" },
            ].map((log, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{log.user}</p>
                    <p className="text-[9px] text-muted-foreground font-mono">{log.code}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{log.amount}</p>
                  <p className="text-[8px] font-bold text-slate-300 uppercase">{log.time}</p>
                </div>
              </div>
            ))}
          </div>

          <Card className="bg-slate-900 border-none shadow-xl text-white rounded-2xl shrink-0">
             <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-xs uppercase tracking-widest">Resumo do Turno</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-center">
                    <p className="text-[8px] uppercase font-bold text-slate-400">Vendas</p>
                    <p className="text-lg font-bold">12</p>
                  </div>
                  <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-center">
                    <p className="text-[8px] uppercase font-bold text-slate-400">Litros</p>
                    <p className="text-lg font-bold">450L</p>
                  </div>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default function FrentistaPage() {
  return (
    <ProtectedRoute allowedRoles={['frentista']}>
      <FrentistaContent />
    </ProtectedRoute>
  )
}
