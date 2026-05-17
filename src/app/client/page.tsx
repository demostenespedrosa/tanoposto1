
"use client"

import { useState, useEffect } from "react"
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
    <main className="min-h-screen pb-32 pt-6 bg-slate-50 text-slate-900">
      <div className="max-w-lg mx-auto px-4 space-y-8">
        
        {/* Header Amigável */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200 ring-4 ring-white">
              <span className="font-bold text-xl uppercase italic">
                {user?.displayName ? user.displayName.substring(0, 2) : "JS"}
              </span>
            </div>
            <div>
              <p className="text-[10px] text-primary uppercase font-bold tracking-[0.2em]">Bem-vindo de volta</p>
              <h2 className="font-bold text-xl text-slate-800 tracking-tight">João Silva 👋</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-white shadow-sm border border-slate-100 h-12 w-12">
              <Bell className="w-6 h-6 text-slate-600" />
            </Button>
          </div>
        </header>

        {/* Card de Saldo Centralizado */}
        <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden group">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo na Carteira</p>
                <div className="flex items-baseline gap-1">
                   <span className="text-sm font-bold text-slate-400">R$</span>
                   <h3 className="text-4xl font-headline font-bold text-slate-900 tracking-tight">372,60</h3>
                </div>
              </div>
              <Link href="/wallet">
                <Button size="icon" className="rounded-2xl bg-primary shadow-lg shadow-primary/20 h-14 w-14 hover:scale-105 transition-transform">
                  <Wallet className="w-6 h-6" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
              <div className="space-y-1">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Economia Total</p>
                <p className="text-sm font-bold text-green-600 flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" /> R$ 85,40
                </p>
              </div>
              <div className="space-y-1 border-l pl-4 border-slate-50">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Pontos Loop</p>
                <p className="text-sm font-bold text-primary flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary" /> 1.250
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Banner Promocionais */}
        <section className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden group shadow-xl ring-1 ring-slate-100">
                    <Image src={banner.img} alt={banner.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-center">
                      <h3 className="text-white font-bold text-xl uppercase italic tracking-tight">{banner.title}</h3>
                      <p className="text-white/80 text-xs font-medium mt-1">{banner.desc}</p>
                      <Button variant="link" className="text-white text-[10px] font-bold uppercase tracking-widest p-0 h-auto mt-4 w-fit">VER OFERTA →</Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* Postos Próximos - Reais */}
        <section className="space-y-5">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-slate-800 text-lg uppercase italic tracking-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Postos Próximos
            </h3>
            <Link href="/stations" className="text-[10px] font-bold text-primary uppercase tracking-widest">VER MAPA</Link>
          </div>

          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex gap-4">
              {loadingStations ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="w-72 h-44 bg-slate-200 animate-pulse rounded-[2rem]" />
                ))
              ) : sortedNearbyStations.map((station) => (
                <Link key={station.id} href={`/stations?id=${station.id}`}>
                  <Card className="w-72 border-none shadow-xl bg-white rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all duration-300 ring-1 ring-slate-50">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-16 h-16 rounded-2xl border border-slate-50 overflow-hidden relative shrink-0 shadow-sm bg-white p-2">
                          {station.logo ? (
                            <Image src={station.logo} alt={station.name} fill className="object-contain p-1" />
                          ) : (
                            <Fuel className="w-full h-full text-slate-100" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 truncate uppercase italic tracking-tighter">{station.name}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                            {station.distance < 999 ? `${station.distance.toFixed(1)} km de você` : "Calculando..."}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-[10px] font-bold text-yellow-700">4.8</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded-2xl flex items-center justify-between">
                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Gasolina Comum</span>
                         <span className="text-sm font-bold text-primary tracking-tight">
                           R$ {Number((station.prices as any)?.[Object.keys(station.prices || {})[0]]?.app || 0).toFixed(2)}
                         </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Atalhos Rápidos Estilizados */}
        <section className="grid grid-cols-2 gap-4 pb-12">
           <Link href="/stations">
             <Button variant="outline" className="w-full h-24 bg-white border-none shadow-xl rounded-[2rem] flex flex-col gap-2 hover:bg-slate-50">
               <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                 <Fuel className="w-6 h-6" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Postos</span>
             </Button>
           </Link>
           <Link href="/coupons">
             <Button variant="outline" className="w-full h-24 bg-white border-none shadow-xl rounded-[2rem] flex flex-col gap-2 hover:bg-slate-50">
               <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                 <Gift className="w-6 h-6" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Cupons</span>
             </Button>
           </Link>
        </section>

      </div>
      <Navigation />
    </main>
  )
}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-xl leading-tight">{banner.title}</h3>
                    <p className="text-white/80 text-sm mt-1">{banner.desc}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Atalhos Rápidos */}
        <div className="grid grid-cols-4 gap-4 py-2">
          {[
            { icon: Fuel, label: "Abastecer", color: "bg-green-100 text-green-700", href: "/stations" },
            { icon: MapPin, label: "Postos", color: "bg-blue-100 text-blue-700", href: "/stations" },
            { icon: Gift, label: "Cupons", color: "bg-purple-100 text-purple-700", href: "/coupons" },
            { icon: Wallet, label: "Carteira", color: "bg-orange-100 text-orange-700", href: "/wallet" },
          ].map((item, i) => (
            <Link key={i} href={item.href} className="flex flex-col items-center gap-2 group">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:-translate-y-1 group-hover:shadow-lg shadow-sm", item.color)}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Postos Próximos */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-slate-800 text-lg">Próximos a você</h3>
            <Link href="/stations" className="text-xs font-bold text-primary flex items-center gap-1">Ver todos</Link>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 pb-6">
              {loadingStations ? (
                <div className="flex items-center justify-center w-full py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : sortedNearbyStations.length > 0 ? (
                sortedNearbyStations.map((posto) => (
                  <Card key={posto.id} className="w-56 border-none shadow-md bg-white overflow-hidden shrink-0 hover:shadow-lg transition-shadow">
                    <div className="p-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl border border-slate-100 overflow-hidden relative shrink-0 bg-slate-50 flex items-center justify-center">
                          {posto.logo ? (
                            <Image src={posto.logo} alt={posto.name} fill className="object-cover" />
                          ) : (
                            <Fuel className="w-6 h-6 text-slate-300" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-sm font-bold text-slate-800 truncate">{posto.name}</h4>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> 
                            {posto.distance 
                              ? `${posto.distance.toFixed(1)} km` 
                              : "Calculando..."}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                        <div className="space-y-0.5">
                          <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest">A partir de</p>
                          <p className="text-base font-headline font-bold text-primary">
                            R$ {posto.prices?.gasolina?.app?.toFixed(2) || "---"}
                          </p>
                        </div>
                        <Link href={`/stations?id=${posto.id}`}>
                          <Button size="sm" className="h-8 rounded-lg bg-slate-900 text-white font-bold text-[10px]">VER PREÇOS</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="p-4 text-center w-56 text-xs text-muted-foreground italic">
                  Nenhum posto ativo encontrado.
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

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
