
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
import Link from "next/link"

export default function WalletPage() {
  const { currentUser: user } = useAuth()
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [walletData, setWalletData] = useState({ balance: 0, points: 0, totalSaved: 0, level: 'Silver' })

  useEffect(() => {
    if (!user) return;

    // Buscar histórico real de transações do usuário em tempo real
    const q = query(
      collection(db, "transactions"), 
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    
    const unsubscribeTransactions = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(docs);
      setLoading(false);
    });

    // Escutar dados do usuário em tempo real
    const unsubscribeUser = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setWalletData({
          balance: data.balance || 0,
          points: data.points || 0,
          totalSaved: data.totalSaved || 0,
          level: data.nivel || 'Silver'
        });
      }
    });

    return () => {
      unsubscribeTransactions();
      unsubscribeUser();
    };
  }, [user]);

  return (
    <main className="min-h-screen pb-32 pt-12 bg-[#F2F2F7] text-black animate-in fade-in duration-1000">
      <div className="max-w-lg mx-auto px-6 space-y-8">
        
        {/* iOS Large Header */}
        <header className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#8E8E93] tracking-tight">Finanças</span>
            <h1 className="text-3xl font-bold tracking-tight text-black">Minha Carteira</h1>
          </div>
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 active:scale-90 transition-transform">
            <Plus className="w-5 h-5 text-black" />
          </Button>
        </header>

        {/* Apple Wallet Style Card */}
        <div className="relative group">
          <div className="w-full h-56 bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl transition-all duration-500 active:scale-[0.98]">
            {/* Glossy Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="flex justify-between items-start relative z-10">
               <div className="space-y-1">
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Saldo Disponível</p>
                 <h2 className="text-4xl font-bold tracking-tight pt-1">
                   {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(walletData.balance)}
                 </h2>
               </div>
               <div className="font-bold text-xl tracking-tighter">ta<span className="text-primary italic font-black">no</span>posto</div>
            </div>

            <div className="flex justify-between items-end relative z-10 pt-10 mt-auto">
               <div className="flex gap-8">
                 <div className="space-y-1">
                   <p className="text-[9px] font-bold text-white/30 uppercase tracking-wider">Pontos</p>
                   <div className="flex items-center gap-1.5 font-bold">
                     <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                     <span className="text-xl tracking-tight">{walletData.points.toLocaleString()}</span>
                   </div>
                 </div>
                 <div className="space-y-1">
                   <p className="text-[9px] font-bold text-white/30 uppercase tracking-wider">Status</p>
                   <p className="text-sm font-bold uppercase tracking-tight text-white/90">{walletData.level} Member</p>
                 </div>
               </div>
               <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 active:scale-90 transition-transform">
                 <QrCode className="w-6 h-6 text-white" />
               </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - iOS Grid */}
        <section className="grid grid-cols-4 gap-4">
          {[
            { icon: Plus, label: "Recarga", color: "text-[#007AFF]" },
            { icon: ArrowUpRight, label: "Enviar", color: "text-[#AF52DE]" },
            { icon: ReceiptText, label: "Extrato", color: "text-[#8E8E93]" },
            { icon: PiggyBank, label: "Resgatar", color: "text-[#34C759]" }
          ].map((action, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.02] shadow-sm flex items-center justify-center active:bg-[#E5E5EA] active:scale-95 transition-all">
                 <action.icon className={cn("w-6 h-6", action.color)} />
              </div>
              <span className="text-[10px] font-bold text-[#8E8E93]">{action.label}</span>
            </div>
          ))}
        </section>

        {/* Transaction History - iOS List Style */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-black">Atividade Recente</h2>
            <Link href="/wallet/history" className="text-sm font-semibold text-primary">Ver tudo</Link>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-black/[0.02] overflow-hidden">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="p-5 flex items-center gap-4 border-b border-black/[0.02]">
                  <div className="w-12 h-12 bg-[#F2F2F7] animate-pulse rounded-2xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#F2F2F7] animate-pulse rounded w-1/2" />
                    <div className="h-3 bg-[#F2F2F7] animate-pulse rounded w-1/4" />
                  </div>
                </div>
              ))
            ) : transactions.length > 0 ? (
              transactions.map((tx, idx) => (
                <div key={tx.id} className={cn(
                  "p-5 flex items-center justify-between active:bg-[#F2F2F7] transition-colors",
                  idx !== transactions.length - 1 && "border-b border-black/[0.02]"
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      tx.type === 'entrada' ? "bg-[#34C759]/10 text-[#34C759]" : "bg-[#8E8E93]/10 text-[#8E8E93]"
                    )}>
                      {tx.type === 'entrada' ? <ArrowDownLeft className="w-6 h-6" /> : <Fuel className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-bold text-black text-sm">{tx.description || tx.stationName}</p>
                      <p className="text-[11px] font-medium text-[#8E8E93]">{new Date(tx.createdAt?.seconds * 1000).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "font-bold text-sm",
                      tx.type === 'entrada' ? "text-[#34C759]" : "text-black"
                    )}>
                      {tx.type === 'entrada' ? "+" : "-"} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.amount)}
                    </p>
                    <p className="text-[10px] font-medium text-[#8E8E93] uppercase tracking-tighter">
                      {tx.paymentMethod?.split(' ')[0] || "TANOPAY"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-4">
                 <div className="w-16 h-16 bg-[#F2F2F7] rounded-3xl flex items-center justify-center mx-auto">
                    <ReceiptText className="w-8 h-8 text-[#C7C7CC]" />
                 </div>
                 <p className="text-sm font-semibold text-[#8E8E93]">Nenhuma transação encontrada</p>
              </div>
            )}
          </div>
        </section>

      </div>
      <Navigation />
    </main>
  )
}

