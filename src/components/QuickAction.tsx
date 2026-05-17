
"use client"

import { useState } from "react"
import { QrCode, X, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function QuickAction() {
  const [isOpen, setIsOpen] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleActivate = () => {
    setIsActivating(true)
    setTimeout(() => {
      setIsActivating(false)
      setIsSuccess(true)
    }, 2000)
  }

  return (
    <>
      <div className="fixed bottom-24 right-6 z-50">
        <Button 
          onClick={() => {
            setIsOpen(true)
            setIsSuccess(false)
          }}
          className="h-16 w-16 rounded-full shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-white"
        >
          <QrCode className="w-8 h-8" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white border-none rounded-3xl shadow-2xl">
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="text-2xl font-headline font-bold text-primary">Abastecer Agora</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Apresente o código abaixo na bomba para ativar.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-8 gap-6">
            {!isSuccess ? (
              <>
                <div className="relative p-6 bg-accent rounded-3xl border-2 border-primary/10 group overflow-hidden shadow-inner">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TANOPOSTO-SESSION-SECURE" 
                    alt="Código de Ativação"
                    className="w-48 h-48 relative z-10 transition-opacity"
                  />
                  {isActivating && (
                    <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="text-xs font-bold tracking-widest text-primary animate-pulse uppercase">Validando...</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-foreground">Token de Acesso: <span className="font-mono text-primary font-bold">#POSTO-99</span></p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Expira em 01:59</p>
                </div>
                <Button 
                  onClick={handleActivate}
                  disabled={isActivating}
                  className="w-full h-14 bg-primary text-primary-foreground font-bold text-lg rounded-2xl shadow-lg shadow-primary/20"
                >
                  {isActivating ? "Verificando..." : "ATIVAR BOMBA"}
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-6 py-4 animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-headline font-bold text-primary uppercase">Tudo Pronto!</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed px-4">Bomba liberada com sucesso. Pode abastecer que o cashback cai na hora!</p>
                </div>
                <Button 
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="w-full h-12 rounded-xl border-primary/20 text-primary font-bold"
                >
                  FECHAR
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
