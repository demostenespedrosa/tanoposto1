
"use client"

import { useState, useEffect, useMemo } from "react"
import { Navigation } from "@/components/Navigation"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { 
  Fuel, 
  MapPin, 
  Wallet, 
  Gift, 
  Bell, 
  Star, 
  TrendingDown, 
  Loader2,
  QrCode,
  History
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore"
import { calculateDistance, getCurrentLocation, type Station } from "@/hooks/useStations"
import { useAuth } from "@/hooks/useAuth"

function ClientContent() {
  const { currentUser: user } = useAuth()
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
    <main className="min-h-screen pb-32 pt-12 bg-[#F2F2F7] text-black animate-in fade-in duration-1000">
      <div className="max-w-lg mx-auto px-6 space-y-8">
        
        {/* iOS Native Style Header */}
        <header className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#8E8E93] tracking-tight">Segunda, 18 de Maio</span>
            <h1 className="text-3xl font-bold tracking-tight text-black">Olá, {user?.displayName?.split(' ')[0] || "João"}</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/notifications" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 active:scale-90 transition-transform">
              <Bell className="w-5 h-5 text-black" />
            </Link>
            <Link href="/profile" className="w-10 h-10 rounded-full overflow-hidden border border-black/5 shadow-sm active:scale-90 transition-transform">
              {user?.photoURL ? (
                <Image src={user.photoURL} alt="User" width={40} height={40} className="object-cover" />
              ) : (
                <div className="w-full h-full bg-[#E5E5EA] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#8E8E93]">JS</span>
                </div>
              )}
            </Link>
          </div>
        </header>

        {/* Quick Stats - iOS Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/wallet" className="bg-white rounded-[2rem] p-6 border border-black/[0.02] shadow-sm active:scale-95 transition-transform flex flex-col justify-between h-36">
            <div className="w-10 h-10 rounded-2xl bg-[#34C759]/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#34C759]" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[12px] font-semibold text-[#8E8E93]">Seu Saldo</span>
              <p className="text-xl font-bold tracking-tight text-black">R$ 542,00</p>
            </div>
          </Link>

          <Link href="/rewards" className="bg-white rounded-[2rem] p-6 border border-black/[0.02] shadow-sm active:scale-95 transition-transform flex flex-col justify-between h-36">
            <div className="w-10 h-10 rounded-2xl bg-[#FF9500]/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[12px] font-semibold text-[#8E8E93]">Pontos Loop</span>
              <p className="text-xl font-bold tracking-tight text-black">1.250 pts</p>
            </div>
          </Link>
        </div>

        {/* Main Banner / Promotion */}
        <section>
          <div className="relative h-44 rounded-[2rem] overflow-hidden group active:scale-[0.98] transition-all">
            <Image 
              src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=1000&auto=format&fit=crop"
              alt="Promotion"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col justify-center p-8 space-y-2">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/20 w-fit text-[10px] uppercase font-bold tracking-wider">Oferta Hero</Badge>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-none">Indique um Amigo e<br/>ganhe R$ 20,00</h3>
            </div>
          </div>
        </section>

        {/* Nearby Stations - Apple Style Scroll */}
        <section className="space-y-5">
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-bold tracking-tight text-black">Postos Próximos</h3>
            <Link href="/stations" className="text-sm font-semibold text-primary">Ver todos</Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {loadingStations ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="min-w-[280px] h-[160px] bg-white rounded-3xl animate-pulse" />
              ))
            ) : sortedNearbyStations.map((station) => (
              <Link key={station.id} href={`/stations?id=${station.id}`} className="min-w-[280px] bg-white rounded-[2rem] p-5 shadow-sm border border-black/[0.02] active:scale-95 transition-transform flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#F2F2F7] flex items-center justify-center overflow-hidden border border-black/[0.05]">
                    {station.logo ? (
                      <Image src={station.logo} alt={station.name} width={48} height={48} className="object-cover" />
                    ) : (
                      <Fuel className="w-6 h-6 text-[#8E8E93]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-black text-sm truncate">{station.name}</h4>
                    <span className="text-[11px] font-medium text-[#8E8E93] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {station.distance?.toFixed(1)} km • {station.address?.split(',')[0]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/[0.03]">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">Gasolina</span>
                    <p className="text-lg font-bold text-black">R$ {Number((station.prices as any)?.gasolina?.app || 0).toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="h-10 px-4 bg-primary rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary/20">
                    Ir agora
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Global Navigation Shortcut */}
        <section className="pb-10 grid grid-cols-4 gap-4">
          {[
            { icon: MapPin, label: "Mapa", href: "/navigator", color: "text-[#007AFF]" },
            { icon: Gift, label: "Cupons", href: "/coupons", color: "text-[#AF52DE]" },
            { icon: TrendingDown, label: "Preços", href: "/stations", color: "text-[#34C759]" },
            { icon: History, label: "Atividade", href: "/wallet", color: "text-[#FF9500]" }
          ].map((item, i) => (
            <Link key={i} href={item.href} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.02] shadow-sm flex items-center justify-center active:bg-[#F2F2F7] active:scale-90 transition-all">
                <item.icon className={cn("w-6 h-6", item.color)} />
              </div>
              <span className="text-[10px] font-bold text-[#8E8E93]">{item.label}</span>
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
