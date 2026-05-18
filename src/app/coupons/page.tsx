
"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ticket, Clock, CheckCircle2, Copy, Gift, Fuel, Trash2, QrCode, ArrowRight, Star } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { useAuth } from "@/hooks/useAuth"

export default function CouponsPage() {
  const { user } = useAuth()
  const [activeToken, setActiveToken] = useState<any>(null);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const stored = localStorage.getItem('active_fuel_token');
      if (stored) {
        const token = JSON.parse(stored);
        const expiry = new Date(token.expiresAt);
        if (expiry > new Date()) {
          setActiveToken(token);
        } else {
          localStorage.removeItem('active_fuel_token');
          setActiveToken(null);
        }
      }
    }
    checkToken();

    // Buscar cupons reais (ex: promoções gerais do banco de dados)
    const q = query(collection(db, "promotions"), where("active", "==", true), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCoupons(docs);
      setLoading(false);
    });

    const interval = setInterval(checkToken, 10000);
    return () => {
      clearInterval(interval);
      unsubscribe();
    }
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copiado!",
      description: "Código do cupom copiado para a área de transferência.",
    })
  }

  const cancelToken = () => {
    localStorage.removeItem('active_fuel_token');
    setActiveToken(null);
    toast({
      title: "Cancelado",
      description: "Cupom de abastecimento removido.",
    })
  }

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50 text-slate-900 animate-in fade-in duration-700">
      <div className="max-w-lg mx-auto px-5 space-y-10">
        
        <header className="flex justify-between items-end pt-4">
          <div className="space-y-1">
            <p className="text-[10px] text-primary uppercase font-black tracking-[0.3em] leading-none">LOOP Rewards</p>
            <h1 className="font-headline font-bold text-4xl text-slate-900 tracking-tighter italic uppercase">
              Meus <span className="text-primary">Benefícios</span>
            </h1>
          </div>
          <div className="w-14 h-14 bg-white shadow-xl shadow-slate-200/50 rounded-[1.5rem] flex items-center justify-center border border-slate-100">
            <Gift className="w-6 h-6 text-primary" />
          </div>
        </header>

        {activeToken && (
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <Clock className="w-3 h-3 animate-pulse" /> Ativo Agora
              </h2>
            </div>
            
            <Card className="border-none shadow-2xl shadow-orange-200/50 bg-white rounded-[2.5rem] overflow-hidden group relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <CardContent className="p-8 space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Posto Selecionado</p>
                    <h3 className="text-2xl font-headline font-bold text-slate-800 uppercase italic tracking-tighter leading-tight">{activeToken.stationName}</h3>
                  </div>
                  <Button variant="ghost" size="icon" onClick={cancelToken} className="h-10 w-10 text-slate-300 hover:text-red-500 rounded-full hover:bg-red-50">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>

                <div className="bg-slate-900 p-10 rounded-[2.5rem] flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden group/token">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mt-16"></div>
                  <span className="text-6xl font-headline font-bold text-white tracking-[0.4em] z-10 leading-none">{activeToken.id}</span>
                  <div className="flex items-center gap-2 px-6 py-2 bg-primary/20 rounded-full z-10 border border-primary/20">
                    <QrCode className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">Apresente ao frentista</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 text-[10px] font-black text-orange-600 bg-orange-50/50 p-5 rounded-[1.5rem] border border-orange-100/50">
                  <Clock className="w-4 h-4 animate-spin-slow" />
                  EXPIRA EM 15 MINUTOS • NO LOCAL
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Lista de promoções reais do banco */}
        <section className="space-y-6 pb-10">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-headline font-bold text-2xl text-slate-900 italic tracking-tighter uppercase">Ofertas Loop</h2>
            <Badge className="bg-slate-900 text-primary border-none font-black text-[9px] px-3 py-1 rounded-full">{coupons.length} ATIVOS</Badge>
          </div>

          <div className="space-y-5">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-40 bg-white rounded-[2.5rem] shadow-xl animate-pulse" />
              ))
            ) : coupons.length > 0 ? (
              coupons.map((coupon) => (
                <Card key={coupon.id} className="border-none shadow-2xl shadow-slate-200/50 bg-white rounded-[2.5rem] overflow-hidden group hover:-translate-y-1 transition-all duration-500 relative">
                  <CardContent className="p-0 flex h-40">
                    <div className="w-2 bg-primary h-full"></div>
                    <div className="flex-1 p-8 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                           <h4 className="font-headline font-bold text-xl text-slate-800 uppercase italic truncate tracking-tighter">{coupon.title}</h4>
                           <Star className="w-4 h-4 text-primary fill-primary" />
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium line-clamp-2 leading-relaxed">{coupon.description || coupon.desc}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                         <div className="space-y-0.5">
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] italic">Code</span>
                            <p className="text-sm font-bold text-slate-600 font-mono tracking-widest">{coupon.code}</p>
                         </div>
                         <Button 
                           onClick={() => copyToClipboard(coupon.code)}
                           className="h-12 px-6 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all group-hover:shadow-lg shadow-primary/20"
                         >
                           COPIAR <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                         </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-20 text-center space-y-6">
                <div className="w-24 h-24 bg-white shadow-2xl rounded-[2.5rem] flex items-center justify-center mx-auto border border-slate-50">
                  <Gift className="w-10 h-10 text-slate-200" />
                </div>
                <div className="space-y-1">
                   <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] italic">Sem novidades hoje</p>
                   <p className="text-xs text-slate-400">Fique de olho, novas ofertas surgem toda semana!</p>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
      <Navigation />
    </main>
  )
}

