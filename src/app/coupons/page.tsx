
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
  const { currentUser: user } = useAuth()
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
    const q = query(collection(db, "promotions"), where("active", "==", true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Ordenar manualmente para evitar erro de índice no Firestore
      const sortedDocs = docs.sort((a: any, b: any) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA;
      });
      setCoupons(sortedDocs);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar promoções:", error);
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
    <main className="min-h-screen pb-32 pt-12 bg-[#F2F2F7] text-black animate-in fade-in duration-1000">
      <div className="max-w-lg mx-auto px-6 space-y-8">
        
        {/* iOS Native Style Header */}
        <header className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#8E8E93] tracking-tight">Benefícios</span>
            <h1 className="text-3xl font-bold tracking-tight text-black">Meus Cupons</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5">
            <Ticket className="w-5 h-5 text-black" />
          </div>
        </header>

        {activeToken && (
          <section className="space-y-4">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/[0.02] flex flex-col items-center text-center space-y-6 overflow-hidden relative group">
              {/* Background Decorative Element */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#FF9500]/5 rounded-full blur-3xl"></div>
              
              <div className="flex justify-between w-full items-start">
                <div className="text-left space-y-1">
                  <p className="text-[10px] font-bold text-[#FF9500] uppercase tracking-widest">Ativo Agora</p>
                  <h3 className="text-xl font-bold text-black">{activeToken.stationName}</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={cancelToken} className="h-8 w-8 text-[#C7C7CC] hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="w-full bg-[#F2F2F7] rounded-[2rem] p-10 flex flex-col items-center gap-4 border border-black/[0.02] shadow-inner">
                <p className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-[0.2em]">Código de Liberação</p>
                <span className="text-5xl font-black text-black tracking-[0.1em] font-mono leading-none">
                  {activeToken.id.toString().length === 6 
                    ? `${activeToken.id.toString().slice(0,3)}-${activeToken.id.toString().slice(3,6)}`
                    : activeToken.id}
                </span>
                <div className="flex items-center gap-2 mt-4 text-[#8E8E93]">
                  <QrCode className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Apresente ao frentista</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-[#FF3B30] bg-[#FF3B30]/5 w-full py-4 rounded-2xl">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                EXPIRA EM 15 MINUTOS NO POSTO
              </div>
            </div>
          </section>
        )}

        {/* Offers List - iOS Style List */}
        <section className="space-y-5">
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-bold tracking-tight text-black">Ofertas Disponíveis</h3>
            <span className="text-xs font-semibold text-[#8E8E93]">{coupons.length} ofertas</span>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-44 bg-white rounded-[2rem] animate-pulse" />
              ))
            ) : coupons.length > 0 ? (
              coupons.map((coupon) => (
                <div key={coupon.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-black/[0.02] flex flex-col active:scale-[0.98] transition-all">
                  <div className="p-6 flex gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#F2F2F7] flex items-center justify-center border border-black/[0.03] overflow-hidden shrink-0">
                      {coupon.image ? (
                        <img src={coupon.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Ticket className="w-8 h-8 text-[#8E8E93]" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-black leading-tight">{coupon.title}</h4>
                        <Star className="w-4 h-4 text-[#FF9500] fill-[#FF9500]" />
                      </div>
                      <p className="text-[12px] font-medium text-[#8E8E93] line-clamp-2 leading-snug">
                        {coupon.description || "Aproveite esta oferta exclusiva em nossos postos parceiros."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4 bg-[#F2F2F7]/50 border-t border-black/[0.02] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-[#8E8E93] uppercase tracking-wider">Código</span>
                      <span className="text-sm font-black text-black tracking-widest">{coupon.code}</span>
                    </div>
                    <Button 
                      onClick={() => copyToClipboard(coupon.code)}
                      className="h-10 px-6 rounded-xl bg-black text-white text-xs font-bold shadow-lg shadow-black/10 flex gap-2 active:scale-90 transition-transform"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      COPIAR
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-black/[0.05]">
                  <Gift className="w-10 h-10 text-[#C7C7CC]" />
                </div>
                <div className="space-y-1">
                   <p className="text-sm font-bold text-black">Nenhuma oferta no momento</p>
                   <p className="text-xs text-[#8E8E93] px-10">Novas promoções aparecerão aqui toda semana.</p>
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

