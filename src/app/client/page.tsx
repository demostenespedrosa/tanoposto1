
"use client"

import { useState, useEffect, useMemo } from "react"
import { Navigation } from "@/components/Navigation"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Fuel, MapPin, Wallet, Gift, Bell, Star, TrendingDown, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore"
import { calculateDistance, getCurrentLocation, type Station } from "@/hooks/useStations"
import { useAuth } from "@/hooks/useAuth"

function ClientContent() {
  const { user } = useAuth()
  const [stations, setStations] = useState<Station[]>([])
  const [loadingStations, setLoadingStations] = useState(true)
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null)
  const [fuelTypes, setFuelTypes] = useState<{id: string, name: string}[]>([])

  useEffect(() => {
    // Pegar localização real
    getCurrentLocation()
      .then(loc => setUserLocation(loc))
      .catch(err => console.error("Erro ao pegar localização:", err))

    // Escutar postos ativos do Firestore
    const q = query(collection(db, "stations"), where("status", "==", "ativo"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const stationsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Station[]
      setStations(stationsList)
      setLoadingStations(false)
    })

    // Buscar Combustíveis para exibir preços médios ou destaques
    const qFuels = query(collection(db, "fuel_types"), orderBy("name"))
    const unsubscribeFuels = onSnapshot(qFuels, (snapshot) => {
      const fuels = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }))
      setFuelTypes(fuels)
    })

    return () => {
      unsubscribe()
      unsubscribeFuels()
    }
  }, [])

  // Calcular distâncias e ordenar
  const sortedNearbyStations = useMemo(() => {
    return stations.map(station => {
      let distance = 999
      const sLat = Number(station.latitude)
      const sLng = Number(station.longitude)

      if (userLocation && !isNaN(sLat) && !isNaN(sLng)) {
        distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          sLat,
          sLng
        )
      }
      return { ...station, distance }
    }).sort((a, b) => a.distance - b.distance)
      .slice(0, 5) // Mostra os 5 mais pertos no dashboard
  }, [stations, userLocation])

  const banners = [
    { id: 1, img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop", title: "Cashback em Dobro!", desc: "Abasteça hoje e ganhe 10%" },
    { id: 2, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", title: "Benefício Corporativo", desc: "Sua empresa agora recarrega seu Vale aqui" },
    { id: 3, img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=800&auto=format&fit=crop", title: "Indique e Ganhe", desc: "Ganhe R$ 10 de saldo em cada indicação" },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50 text-slate-900 animate-in fade-in duration-700">
      <div className="max-w-lg mx-auto px-5 space-y-10">
        
        {/* Header Ultra Premium */}
        <header className="flex justify-between items-end pt-4">
          <div className="space-y-1">
            <p className="text-[10px] text-primary uppercase font-black tracking-[0.3em] leading-none">Status: Platinum</p>
            <h2 className="font-headline font-bold text-4xl text-slate-900 tracking-tighter italic uppercase">
              Olá, <span className="text-primary">{user?.displayName?.split(' ')[0] || "João"}</span>
            </h2>
          </div>
          <Button variant="ghost" size="icon" className="relative h-14 w-14 rounded-[1.5rem] bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
            <Bell className="w-6 h-6 text-slate-400" />
            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
        </header>

        {/* Banner Carrossel com Estilo Apple */}
        <section className="-mx-5">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {banners.map((banner) => (
                <CarouselItem key={banner.id} className="pl-5 basis-[92%]">
                  <div className="relative h-56 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 group">
                    <Image 
                      src={banner.img} 
                      alt={banner.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                       <span className="bg-primary hover:bg-primary/90 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full w-fit mb-3 text-white">Promoção Ativa</span>
                       <h3 className="text-white font-headline font-bold text-2xl leading-none italic uppercase tracking-tighter">{banner.title}</h3>
                       <p className="text-white/60 text-[11px] font-medium mt-2 uppercase tracking-widest">{banner.desc}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* Cards de Saldo Rápido */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-slate-900 border-none rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <CardContent className="p-0 space-y-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/20 rounded-xl">
                  <Wallet className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Saldo Loop</span>
              </div>
              <p className="text-2xl font-headline font-bold text-white italic tracking-tighter">R$ 542,00</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none rounded-[2.5rem] p-6 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pontos</span>
              </div>
              <p className="text-2xl font-headline font-bold text-slate-800 italic tracking-tighter">1.250</p>
            </CardContent>
          </Card>
        </div>

        {/* Postos Próximos - Lista Horizontal Nativa */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-headline font-bold text-2xl text-slate-900 italic tracking-tighter uppercase">Abastecer</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preços e postos em tempo real</p>
            </div>
            <Link href="/stations" className="w-10 h-10 bg-white shadow-lg rounded-2xl flex items-center justify-center border border-slate-50">
              <TrendingDown className="w-5 h-5 text-primary" />
            </Link>
          </div>

          <ScrollArea className="w-full -mx-5 px-5" orientation="horizontal">
            <div className="flex gap-6 pb-8">
              {loadingStations ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="w-64 h-80 bg-white rounded-[2.5rem] shadow-xl animate-pulse" />
                ))
              ) : sortedNearbyStations.map((station) => (
                <Link key={station.id} href={`/stations?id=${station.id}`}>
                  <Card className="w-64 border-none shadow-2xl shadow-slate-200/80 bg-white group hover:-translate-y-2 transition-all duration-500 rounded-[2.5rem] overflow-hidden">
                    <div className="relative h-32 bg-slate-900 flex items-center justify-center">
                       {station.logo ? (
                         <Image src={station.logo} alt={station.name} fill className="object-cover opacity-60" />
                       ) : (
                         <Fuel className="w-12 h-12 text-primary opacity-20" />
                       )}
                       <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          <span className="text-[9px] text-white font-black">{station.distance?.toFixed(1)}KM</span>
                       </div>
                    </div>
                    <CardContent className="p-6 space-y-5">
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 text-sm truncate uppercase tracking-tight">{station.name}</h4>
                        <p className="text-[9px] text-slate-400 font-medium truncate italic">{station.address || "Endereço não disponível"}</p>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                         <div className="space-y-0.5">
                            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Gasolina</span>
                            <p className="text-xl font-headline font-bold text-primary italic tracking-tighter leading-none">
                               R$ {Number((station.prices as any)?.gasolina?.app || 0).toFixed(2).replace('.', ',')}
                            </p>
                         </div>
                         <Button className="h-10 w-10 rounded-xl bg-slate-900 text-white p-0 hover:bg-primary transition-colors">
                            <QrCode className="w-5 h-5" />
                         </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Ações Rápidas Ultra Clean */}
        <section className="pb-10 grid grid-cols-4 gap-4">
           {[
             { icon: MapPin, label: "Mapa", href: "/navigator", color: "bg-blue-500" },
             { icon: Gift, label: "Ofertas", href: "/coupons", color: "bg-purple-500" },
             { icon: Wallet, label: "Extrato", href: "/wallet", color: "bg-orange-500" },
             { icon: TrendingDown, label: "Preços", href: "/stations", color: "bg-green-500" }
           ].map((action, i) => (
             <Link key={i} href={action.href} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white shadow-xl shadow-slate-200/50 rounded-[1.75rem] flex items-center justify-center border border-slate-50 transition-transform active:scale-90 overflow-hidden relative group">
                   <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity", action.color)}></div>
                   <action.icon className="w-6 h-6 text-slate-700 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{action.label}</span>
             </Link>
           ))}
        </section>

      </div>
      <Navigation />
    </main>
  )
}

export default function Home() {
  return (
    <ProtectedRoute allowedRoles={['cliente']}>
      <ClientContent />
    </ProtectedRoute>
  )
}
