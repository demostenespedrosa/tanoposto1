
"use client"

import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ticket, Clock, CheckCircle2, Copy, Gift } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function CouponsPage() {
  const activeCoupons = [
    { id: 1, title: "R$ 10,00 OFF", desc: "Válido para abastecimentos acima de R$ 150", code: "POSTO10", expiry: "Expira em 2 dias", type: "Combustível" },
    { id: 2, title: "Café Espresso Grátis", desc: "Resgate na loja de conveniência Shell Select", code: "CAFEZERO", expiry: "Expira em 5 dias", type: "Conveniência" },
    { id: 3, title: "Ducha Ecológica", desc: "Ganhe uma lavagem simples ao completar o tanque", code: "LAVAGEMOK", expiry: "Válido hoje", type: "Serviço" },
  ]

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copiado!",
      description: "Código do cupom copiado para a área de transferência.",
    })
  }

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50">
      <div className="max-w-lg mx-auto px-4 space-y-6">
        
        <header className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-headline font-bold text-slate-800">Meus Cupons</h1>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Economia extra garantida</p>
          </div>
        </header>

        <div className="space-y-4">
          {activeCoupons.map((coupon) => (
            <Card key={coupon.id} className="border-none shadow-md overflow-hidden bg-white relative">
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-primary" />
              <CardContent className="p-5 flex gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-primary/5 text-primary text-[8px] font-bold uppercase tracking-widest">{coupon.type}</Badge>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                      <Clock className="w-3 h-3 text-orange-400" /> {coupon.expiry}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{coupon.title}</h3>
                    <p className="text-xs text-muted-foreground">{coupon.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex-1 bg-slate-50 border border-dashed border-slate-200 p-2 rounded-lg text-center font-mono font-bold text-slate-600 tracking-wider">
                      {coupon.code}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => copyToClipboard(coupon.code)}
                      className="rounded-lg h-10 w-10 hover:bg-primary/5"
                    >
                      <Copy className="w-4 h-4 text-primary" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-primary to-green-600 border-none shadow-xl text-white">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl">Mais Vantagens?</h3>
              <p className="text-white/80 text-xs">Indique seus amigos e ganhe cupons exclusivos toda semana!</p>
            </div>
            <Button className="w-full bg-white text-primary font-bold hover:bg-white/90">INDICAR AMIGOS</Button>
          </CardContent>
        </Card>

      </div>
      <Navigation />
    </main>
  )
}
