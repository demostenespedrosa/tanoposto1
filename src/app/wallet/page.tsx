
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
    <main className="min-h-screen pb-32 pt-6 bg-slate-50 text-slate-900 animate-in fade-in duration-500">
      <div className="max-w-lg mx-auto px-4 space-y-8">
        
        {/* Header Elegante */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
                <Wallet className="w-7 h-7" />
             </div>
             <div>
                <h1 className="text-3xl font-headline font-bold text-slate-800 tracking-tight italic uppercase">Minha Carteira</h1>
                <p className="text-[10px] text-primary uppercase font-bold tracking-[0.2em]">Gestão de Saldo LOOP</p>
             </div>
          </div>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <MoreHorizontal className="w-6 h-6 text-slate-400" />
          </Button>
        </header>

        {/* Card de Cartão de Crédito Style */}
        <div className="relative h-64 w-full group perspective-1000">
          <div className="absolute inset-x-4 -bottom-6 h-12 bg-primary/20 blur-2xl rounded-full"></div>
          <div className="w-full h-full bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] -ml-16 -mb-16"></div>
            
            <div className="flex justify-between items-start relative z-10">
               <div className="space-y-1">
                 <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em]">Saldo Disponível</p>
                 <h2 className="text-5xl font-headline font-bold tracking-tighter italic">
                   <span className="text-xl text-primary mr-2 italic">R$</span>
                   {walletData.balance.toFixed(2).replace('.', ',')}
                 </h2>
               </div>
               <div className="italic font-bold text-2xl text-primary tracking-tighter uppercase">LOOP<span className="text-white opacity-50">PAY</span></div>
            </div>

            <div className="flex justify-between items-end relative z-10 pt-8 border-t border-white/10">
               <div className="flex gap-10">
                 <div className="space-y-1">
                   <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">PONTOS LOOP</p>
                   <div className="flex items-center gap-1.5 font-bold">
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <span className="text-xl">{walletData.points.toLocaleString()}</span>
                   </div>
                 </div>
                 <div className="space-y-1">
                   <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">STATUS</p>
                   <p className="text-lg font-bold uppercase italic tracking-tighter text-primary">PREMIUM</p>
                 </div>
               </div>
               <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                 <QrCode className="w-6 h-6 text-primary" />
               </div>
            </div>
          </div>
        </div>

        {/* Ações da Carteira */}
        <section className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" className="h-16 w-16 rounded-[1.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:bg-primary group transition-all">
               <Plus className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
            </Button>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Recarregar</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" className="h-16 w-16 rounded-[1.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:bg-primary group transition-all">
               <ArrowUpRight className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
            </Button>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Transferir</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" className="h-16 w-16 rounded-[1.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:bg-primary group transition-all">
               <ReceiptText className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
            </Button>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Extrato</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" className="h-16 w-16 rounded-[1.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:bg-primary group transition-all">
               <PiggyBank className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
            </Button>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Economia</span>
          </div>
        </section>

        {/* Histórico de Transações */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <History className="w-4 h-4" /> Atividades Recentes
            </h2>
          </div>

          <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden p-2">
            <CardContent className="p-0 divide-y divide-slate-50">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 animate-pulse rounded-2xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-100 animate-pulse rounded w-1/2" />
                      <div className="h-3 bg-slate-100 animate-pulse rounded w-1/3" />
                    </div>
                  </div>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div key={tx.id} className="p-6 flex items-center justify-between group hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
                        tx.type === 'entrada' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"
                      )}>
                        {tx.type === 'entrada' ? <ArrowDownLeft className="w-6 h-6" /> : <Fuel className="w-6 h-6" />}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-800 uppercase italic tracking-tighter text-sm">{tx.description || tx.stationName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(tx.createdAt?.seconds * 1000).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-0.5">
                      <p className={cn(
                        "font-bold tracking-tight italic",
                        tx.type === 'entrada' ? "text-green-600" : "text-slate-900"
                      )}>
                        {tx.type === 'entrada' ? "+" : "-"} R$ {tx.amount.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                        {tx.paymentMethod || "LOOP PAY"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-300 space-y-4">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto ring-1 ring-slate-100">
                      <ReceiptText className="w-8 h-8 opacity-20" />
                   </div>
                   <p className="text-[10px] font-bold uppercase tracking-widest italic">Nenhuma transação encontrada</p>
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

                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bloco Informativo para Colaboradores */}
      <Card className="bg-slate-900 border-none shadow-xl text-white overflow-hidden">
        <CardContent className="p-6 flex gap-4">
          <div className="bg-primary/20 p-3 rounded-2xl h-fit">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-sm">Sua empresa no Tá no Posto</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              O seu saldo de <strong>Vale Combustível</strong> é recarregado automaticamente pela sua empresa. Use-o para abastecer com desconto em qualquer posto parceiro e economize ainda mais!
            </p>
            <Button variant="link" className="text-primary text-[10px] p-0 font-bold h-auto">SAIBA COMO FUNCIONA</Button>
          </div>
        </CardContent>
      </Card>

      <Navigation />
    </main>
  )
}
