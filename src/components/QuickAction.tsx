
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
    // Simulate real-time GPS telemetry validation
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
          className="h-16 w-16 rounded-full shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-background"
        >
          <QrCode className="w-8 h-8" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline tracking-tight">Oktano Passport</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Resilient offline generation for instant pump activation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-8 gap-6">
            {!isSuccess ? (
              <>
                <div className="relative p-4 bg-white rounded-2xl shadow-inner group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=OKTANO-SESSION-SECURE" 
                    alt="Session QR Code"
                    className="w-48 h-48 relative z-10 opacity-90 transition-opacity"
                  />
                  {isActivating && (
                    <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="text-xs font-bold tracking-widest text-primary animate-pulse">VALIDATING GPS...</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-foreground">Secure Token: <span className="font-mono text-accent">#OK-8842-XP</span></p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Expires in 01:59</p>
                </div>
                <Button 
                  onClick={handleActivate}
                  disabled={isActivating}
                  className="w-full h-12 bg-primary text-primary-foreground font-bold tracking-wide"
                >
                  {isActivating ? "Authenticating..." : "ACTIVATE PUMP"}
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-6 py-4 animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-accent" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-headline font-bold text-accent">PUMP READY</h3>
                  <p className="text-sm text-muted-foreground">Fueling session authorized at Shell Station #402. Cashback tracking active.</p>
                </div>
                <Button 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-secondary hover:bg-secondary/80 text-foreground"
                >
                  DISMISS
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
