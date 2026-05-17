
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
import Navigation from "@/components/Navigation"

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
    <main className="min-h-screen pb-32 pt-6 bg-slate-50 text-slate-900 animate-in fade-in duration-500">
      <div className="max-w-lg mx-auto px-4 space-y-8">
        
        <header className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-inner">
            <Gift className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-headline font-bold text-slate-800 tracking-tight italic uppercase">Meus Benefícios</h1>
            <p className="text-[10px] text-primary uppercase font-bold tracking-[0.2em]">Economia para você, {user?.displayName?.split(' ')[0] || "Cliente"}</p>
          </div>
        </header>

        {activeToken && (
          <div className="space-y-4">
            <h2 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest px-1 flex items-center gap-2">
              <Clock className="w-3 h-3 animate-pulse" /> Abastecimento em Curso
            </h2>
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden group ring-2 ring-orange-100 animate-in zoom-in-95 duration-500">
              <div className="bg-orange-500 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <Fuel className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Aguardando Frentista</span>
                </div>
                <Button variant="ghost" size="icon" onClick={cancelToken} className="h-8 w-8 text-white hover:bg-black/10 rounded-full">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <CardContent className="p-8 space-y-8">
                <div className="text-center space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Posto Selecionado</p>
                  <h3 className="text-2xl font-bold text-slate-800 uppercase italic tracking-tighter leading-tight">{activeToken.stationName}</h3>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-xl group-hover:bg-primary/10 transition-all"></div>
                  <div className="relative bg-slate-900 p-8 rounded-[2rem] flex flex-col items-center gap-5 shadow-2xl border-b-4 border-primary">
                    <span className="text-5xl font-headline font-bold text-white tracking-[0.3em] ml-4">{activeToken.id}</span>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/20 rounded-full">
                      <QrCode className="w-3 h-3 text-primary" />
                      <span className="text-[9px] font-bold text-primary uppercase tracking-widest italic">Código de Validação</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-orange-600 bg-orange-50 p-4 rounded-2xl border border-orange-100">
                  <Clock className="w-4 h-4 animate-spin-slow" />
                  VALIDADE: 15 MINUTOS NO LOCAL
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lista de promoções reais do banco */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Ofertas Disponíveis</h2>
            <Badge variant="outline" className="border-slate-200 text-slate-400 font-bold text-[8px] rounded-full">{coupons.length} ATIVOS</Badge>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-[2rem]" />
              ))
            ) : coupons.length > 0 ? (
              coupons.map((coupon) => (
                <Card key={coupon.id} className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden group hover:scale-[1.01] transition-all ring-1 ring-slate-100">
                  <CardContent className="p-0 flex h-32">
                    <div className="w-24 bg-primary/5 flex flex-col items-center justify-center border-r border-dashed border-slate-200 gap-2 shrink-0">
                      <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <Ticket className="w-6 h-6" />
                      </div>
                      <span className="text-[8px] font-bold text-primary uppercase tracking-widest">LOOP</span>
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-center min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800 uppercase italic truncate tracking-tight">{coupon.title}</h4>
                        <Badge className="bg-green-50 text-green-600 border-none text-[8px] font-bold rounded-lg shrink-0">NEW</Badge>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium truncate mt-1">{coupon.description || coupon.desc}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                         <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest italic">CÓDIGO: {coupon.code}</span>
                         <Button 
                           onClick={() => copyToClipboard(coupon.code)}
                           variant="ghost" 
                           size="sm" 
                           className="h-8 px-4 rounded-xl text-[9px] font-bold text-primary hover:bg-primary/5 uppercase tracking-widest"
                         >
                           RESGATAR <ArrowRight className="w-3 h-3 ml-1" />
                         </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto ring-1 ring-slate-100">
                  <Gift className="w-8 h-8 text-slate-200" />
                </div>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Nenhum cupom extra disponível</p>
              </div>
            )}
          </div>
        </section>

      </div>
      <Navigation />
    </main>
  )
}

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
