
"use client"

import { useState, useEffect } from "react"
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Clock, Search, MoreHorizontal, TrendingUp, CreditCard, History, Star, PiggyBank, ReceiptText, Fuel, QrCode } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, where, orderBy, doc, getDoc } from "firebase/firestore"
import { useAuth } from "@/hooks/useAuth"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function WalletPage() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [walletData, setWalletData] = useState({ balance: 372.60, points: 1250, totalSaved: 85.40 })

  useEffect(() => {
    if (!user) return;

    // Buscar histórico real de transações do usuário
    const q = query(
      collection(db, "transactions"), 
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(docs);
      setLoading(false);
    });

    // Buscar dados consolidados da carteira/perfil
    const userRef = doc(db, "users", user.uid);
    getDoc(userRef).then(snap => {
      if (snap.exists()) {
        const data = snap.data();
        setWalletData({
          balance: data.balance || 372.60,
          points: data.points || 1250,
          totalSaved: data.totalSaved || 85.40
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50 text-slate-900 animate-in fade-in duration-700">
      <div className="max-w-lg mx-auto px-5 space-y-10">
        
        {/* Header Ultra Premium */}
        <header className="flex justify-between items-end pt-4">
          <div className="space-y-1">
            <p className="text-[10px] text-primary uppercase font-black tracking-[0.3em] leading-none">LOOP Finance</p>
            <h1 className="font-headline font-bold text-4xl text-slate-900 tracking-tighter italic uppercase">
              Minha <span className="text-primary">Carteira</span>
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="h-14 w-14 rounded-[1.5rem] bg-white shadow-xl shadow-slate-200/50 border border-slate-100 transition-transform active:scale-90">
            <MoreHorizontal className="w-6 h-6 text-slate-400" />
          </Button>
        </header>

        {/* Card de Cartão de Crédito Style - Apple Card Inspired */}
        <div className="relative group">
          <div className="absolute inset-x-8 -bottom-8 h-16 bg-primary/20 blur-3xl rounded-full opacity-50"></div>
          <div className="w-full h-64 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between ring-1 ring-white/10 transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-primary/20">
            {/* Background pattern progressivo */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] -ml-20 -mb-20"></div>
            
            <div className="flex justify-between items-start relative z-10">
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] leading-none">LOOP BALANCE</p>
                 <h2 className="text-5xl font-headline font-bold tracking-tighter italic leading-none pt-2">
                   <span className="text-xl text-primary mr-2 italic">R$</span>
                   {walletData.balance.toFixed(2).replace('.', ',')}
                 </h2>
               </div>
               <div className="italic font-black text-2xl text-primary tracking-tighter uppercase leading-none">LOOP<span className="text-white opacity-30">PAY</span></div>
            </div>

            <div className="flex justify-between items-end relative z-10 pt-8 border-t border-white/5">
               <div className="flex gap-12">
                 <div className="space-y-1">
                   <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">PONTOS LOOP</p>
                   <div className="flex items-center gap-2 font-bold">
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <span className="text-2xl font-headline tracking-tighter italic">{walletData.points.toLocaleString()}</span>
                   </div>
                 </div>
                 <div className="space-y-1">
                   <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">MEMBRO</p>
                   <p className="text-xl font-headline font-bold uppercase italic tracking-tighter text-white">PLATINUM</p>
                 </div>
               </div>
               <div className="w-16 h-16 bg-white shadow-2xl shadow-black rounded-2xl flex items-center justify-center border border-white/5 transition-transform active:scale-90 group-hover:rotate-6">
                 <QrCode className="w-8 h-8 text-primary" />
               </div>
            </div>
          </div>
        </div>

        {/* Ações da Carteira - Grid Moderno */}
        <section className="grid grid-cols-4 gap-4">
          {[
            { icon: Plus, label: "Recarga", color: "bg-primary" },
            { icon: ArrowUpRight, label: "Transferir", color: "bg-blue-500" },
            { icon: ReceiptText, label: "Extrato", color: "bg-slate-900" },
            { icon: PiggyBank, label: "Poupar", color: "bg-green-500" }
          ].map((action, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <Button size="icon" className="h-16 w-16 rounded-[1.75rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group active:scale-95 transition-all overflow-hidden relative">
                 <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity", action.color)}></div>
                 <action.icon className="w-7 h-7 text-slate-700 group-hover:text-primary transition-colors" />
              </Button>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">{action.label}</span>
            </div>
          ))}
        </section>

        {/* Histórico de Transações - Mobile Native Feel */}
        <section className="space-y-6 pt-4 pb-10">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-headline font-bold text-2xl text-slate-900 italic tracking-tighter uppercase">Atividades</h2>
            <div className="p-2 bg-white rounded-xl shadow-md cursor-pointer border border-slate-50">
               <History className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <Card className="border-none shadow-2xl shadow-slate-200/50 bg-white rounded-[2.5rem] overflow-hidden p-3 border border-slate-50">
            <CardContent className="p-0 divide-y divide-slate-50">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="p-8 flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-100 animate-pulse rounded-[1.5rem]" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-slate-100 animate-pulse rounded w-3/4" />
                      <div className="h-3 bg-slate-100 animate-pulse rounded w-1/4" />
                    </div>
                  </div>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div key={tx.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 active:bg-slate-100 transition-colors cursor-pointer first:rounded-t-[2rem] last:rounded-b-[2rem]">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
                        tx.type === 'entrada' ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-600"
                      )}>
                        {tx.type === 'entrada' ? <ArrowDownLeft className="w-6 h-6" /> : <Fuel className="w-6 h-6" />}
                      </div>
                      <div className="space-y-1">
                        <p className="font-headline font-bold text-slate-800 uppercase italic tracking-tighter text-base leading-none">{tx.description || tx.stationName}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.1em]">{new Date(tx.createdAt?.seconds * 1000).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className={cn(
                        "font-headline font-bold tracking-tighter italic text-lg leading-none",
                        tx.type === 'entrada' ? "text-green-600" : "text-slate-900"
                      )}>
                        {tx.type === 'entrada' ? "+" : "-"} R$ {tx.amount.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                        {tx.paymentMethod?.split(' ')[0] || "LOOP PAY"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center space-y-6">
                   <div className="w-20 h-20 bg-slate-50 shadow-inner rounded-[2rem] flex items-center justify-center mx-auto ring-1 ring-slate-100">
                      <ReceiptText className="w-10 h-10 text-slate-200" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] italic">Carteira Vazia</p>
                      <p className="text-xs text-slate-400 px-10">Suas transações e cashback aparecerão aqui.</p>
                   </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

      </div>
      <Navigation />
    </main>
  )
}

