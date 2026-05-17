"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  MapPin, 
  Search, 
  List, 
  Map as MapIcon, 
  Fuel, 
  Navigation as NavIcon, 
  Star, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  Clock, 
  Zap,
  QrCode,
  ShieldCheck,
  Loader2
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import dynamic from "next/dynamic"
import { Station, calculateDistance, getCurrentLocation } from "@/hooks/useStations"

// Importar o mapa dinamicamente para evitar erro de SSR do Leaflet
const MapView = dynamic(() => import("@/components/MapView"), { 
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-[2.5rem] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
})

function StationsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSelectedId = searchParams.get('id')

  const [view, setView] = useState<"list" | "map">("list")
  const [selectedFuel, setSelectedFuel] = useState("") // Começar vazio para pegar o primeiro disponível
  const [sortBy, setSortBy] = useState<"distance" | "price">("distance")
  const [selectedStationId, setSelectedStationId] = useState<string | null>(initialSelectedId)
  const [searchTerm, setSearchTerm] = useState("")

  const [stations, setStations] = useState<Station[]>([])
  const [fuelTypes, setFuelTypes] = useState<{id: string, name: string}[]>([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null)

  useEffect(() => {
    getCurrentLocation()
      .then(loc => {
        setUserLocation(loc)
      })
      .catch(err => {
        console.error("Erro ao obter localização:", err)
        toast({
          title: "Erro de Localização",
          description: "Não conseguimos acessar sua localização exata. Verifique as permissões do navegador.",
          variant: "destructive"
        })
      })

    // Buscar Combustíveis Dinâmicos
    const qFuels = query(collection(db, "fuel_types"), orderBy("name"))
    const unsubscribeFuels = onSnapshot(qFuels, (snapshot) => {
      const fuels = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }))
      setFuelTypes(fuels)
      if (fuels.length > 0 && !selectedFuel) {
        setSelectedFuel(fuels[0].id)
      }
    })

    const q = query(collection(db, "stations"), where("status", "==", "ativo"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const stationsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Station[]
      setStations(stationsList)
      setLoading(false)
    })

    return () => {
      unsubscribeFuels()
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (initialSelectedId) {
      setSelectedStationId(initialSelectedId)
    }
  }, [initialSelectedId])

  const stationsWithDistance = useMemo(() => {
    return stations.map(s => {
      let dist = 999
      // Padronizado para latitude e longitude
      const sLat = Number(s.latitude)
      const sLng = Number(s.longitude)

      if (userLocation && !isNaN(sLat) && !isNaN(sLng)) {
        dist = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          sLat,
          sLng
        )
      }
      return { ...s, dist }
    })
  }, [stations, userLocation])

  const filteredAndSortedStations = useMemo(() => {
    return stationsWithDistance
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "distance") return a.dist - b.dist
        if (sortBy === "price") {
          const priceA = Number((a.prices as any)?.[selectedFuel]?.app || 999)
          const priceB = Number((b.prices as any)?.[selectedFuel]?.app || 999)
          return priceA - priceB
        }
        return 0
      })
  }, [stationsWithDistance, sortBy, selectedFuel, searchTerm])

  const selectedStation = stationsWithDistance.find(s => s.id === selectedStationId)

  const [isFuelingDialogOpen, setIsFuelingDialogOpen] = useState(false)

  const handleOpenMaps = () => {
    if (selectedStation) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedStation.latitude},${selectedStation.longitude}`, "_blank");
    }
  }

  const handleGenerateToken = () => {
    if (!selectedStation) return;
    
    const code1 = Math.floor(100 + Math.random() * 900);
    const code2 = Math.floor(100 + Math.random() * 900);
    const formattedCode = `${code1}-${code2}`;

    const token = {
      id: formattedCode,
      stationId: selectedStation.id,
      stationName: selectedStation.name,
      expiresAt: new Date(Date.now() + 15 * 60000).toISOString(),
      active: true
    }

    localStorage.setItem('active_fuel_token', JSON.stringify(token));
    setIsFuelingDialogOpen(false);
    toast({
      title: "Código de 6 Dígitos!",
      description: "Apresente após o abastecimento para ganhar o desconto.",
    });
    
    router.push('/coupons');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Localizando postos...</p>
        </div>
      </div>
    )
  }

  if (selectedStation) {
    return (
      <main className="min-h-screen pb-40 bg-slate-50 text-slate-900 animate-in fade-in slide-in-from-right duration-300">
        <div className="relative h-72 w-full">
          {selectedStation.logo ? (
             <Image 
              src={selectedStation.logo} 
              alt={selectedStation.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <Fuel className="w-12 h-12 text-slate-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/40" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              if (initialSelectedId) router.push('/stations')
              setSelectedStationId(null)
            }}
            className="absolute top-4 left-4 bg-white/80 backdrop-blur-md rounded-full h-10 w-10 shadow-sm z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="max-w-lg mx-auto px-4 -mt-20 relative z-10 space-y-6">
          <Card className="border-none shadow-2xl bg-white overflow-hidden rounded-[2.5rem]">
            <CardContent className="p-8 space-y-6">
              <div className="flex gap-5 items-start">
                <div className="w-24 h-24 rounded-3xl border border-slate-100 overflow-hidden relative shrink-0 shadow-xl bg-white flex items-center justify-center p-3">
                  {selectedStation.logo ? (
                    <Image src={selectedStation.logo} alt={selectedStation.name} fill className="object-contain p-2" />
                  ) : (
                    <Fuel className="w-10 h-10 text-slate-200" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold text-slate-800 uppercase italic tracking-tight leading-tight">{selectedStation.name}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-full shrink-0">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-yellow-700">4.8</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-transparent">
                      Avaliar posto
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 py-2 border-y border-slate-50 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Endereço</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{selectedStation.address}</p>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">
                      {selectedStation.dist ? `A ${selectedStation.dist.toFixed(1)} km de você` : "Calculando distância..."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Funcionamento</p>
                    <p className="text-sm text-slate-700">{selectedStation.hours || "24 horas (todos os dias)"}</p>
                  </div>
                </div>
              </div>

              {selectedStation.services && selectedStation.services.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Serviços no Local</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStation.services.map((service, i) => (
                      <Badge key={i} variant="secondary" className="bg-slate-50 text-slate-500 font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 border-none rounded-xl capitalize">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 uppercase italic tracking-tight">
              <Fuel className="w-5 h-5 text-primary" /> Combustíveis
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {fuelTypes.map((fuel) => {
                const priceData = (selectedStation.prices as any)?.[fuel.id];
                if (!priceData) return null;

                const pumpPrice = priceData.pump || priceData.normal;
                const appPrice = priceData.app || priceData.discount;

                if (!pumpPrice && !appPrice) return null;

                return (
                  <Card key={fuel.id} className="border-none shadow-xl bg-white rounded-3xl overflow-hidden ring-1 ring-slate-100/50">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-bold text-[10px] text-slate-600 uppercase">
                          {fuel.name.substring(0, 3)}
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-800 uppercase tracking-widest">{fuel.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-slate-300 line-through">R$ {Number(pumpPrice)?.toFixed(2)}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">(BOMBA)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-primary uppercase tracking-[0.15em]">Preço no App</p>
                        <p className="text-2xl font-bold text-primary tracking-tighter">R$ {Number(appPrice)?.toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        <Navigation />

        <Dialog open={isFuelingDialogOpen} onOpenChange={setIsFuelingDialogOpen}>
          <DialogContent className="max-w-[90vw] rounded-[2rem] p-0 overflow-hidden border-none text-slate-900">
            <div className="p-8 space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <QrCode className="w-10 h-10 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <DialogTitle className="text-2xl font-bold uppercase tracking-tight text-slate-800">Iniciar Abastecimento</DialogTitle>
                <DialogDescription className="text-slate-500">
                  Você está prestes a gerar um código de desconto para o posto <span className="font-bold text-slate-800">{selectedStation.name}</span>.
                </DialogDescription>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Desconto garantido pela plataforma</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>O código expira em 15 minutos</span>
                </div>
              </div>

              <Button 
                onClick={handleGenerateToken}
                className="w-full h-14 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:bg-black transition-all text-sm tracking-widest uppercase"
              >
                GERAR CÓDIGO AGORA
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="fixed bottom-24 left-0 right-0 px-4 flex gap-3 max-w-lg mx-auto z-40">
          <Button 
            onClick={handleOpenMaps}
            variant="outline"
            className="flex-1 h-14 rounded-2xl bg-white/90 backdrop-blur-md border-slate-200 font-bold text-slate-800 shadow-lg hover:bg-white"
          >
            <NavIcon className="w-5 h-5 mr-1" /> COMO CHEGAR
          </Button>
          <Button 
            onClick={() => setIsFuelingDialogOpen(true)}
            className="flex-1 h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            <Fuel className="w-5 h-5 mr-1" /> ABASTECER
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pb-32 bg-slate-50 text-slate-900 animate-in fade-in duration-300">
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-headline font-bold text-slate-800 tracking-tight uppercase italic">Postos Parceiros</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Economia em tempo real</p>
            </div>
            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
              <Button 
                size="sm"
                variant={view === "list" ? "default" : "ghost"}
                onClick={() => setView("list")}
                className={cn("rounded-xl h-10 px-4 font-bold text-[10px] uppercase tracking-widest transition-all", view === "list" ? "bg-slate-900 text-white shadow-lg" : "text-slate-500")}
              >
                <List className="w-4 h-4 mr-2" /> LISTA
              </Button>
              <Button 
                size="sm"
                variant={view === "map" ? "default" : "ghost"}
                onClick={() => setView("map")}
                className={cn("rounded-xl h-10 px-4 font-bold text-[10px] uppercase tracking-widest transition-all", view === "map" ? "bg-slate-900 text-white shadow-lg" : "text-slate-500")}
              >
                <MapIcon className="w-4 h-4 mr-2" /> MAPA
              </Button>
            </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-all" />
            <Input 
              placeholder="Buscar por nome ou endereço..." 
              className="pl-14 h-16 rounded-3xl border-none shadow-xl shadow-slate-200/50 bg-white text-sm font-medium focus-visible:ring-primary placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {view === "map" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-2 overflow-x-auto py-2 custom-scrollbar no-scrollbar">
              {fuelTypes.map((fuel) => (
                <Badge
                  key={fuel.id}
                  onClick={() => setSelectedFuel(fuel.id)}
                  variant={selectedFuel === fuel.id ? "default" : "outline"}
                  className={cn(
                    "px-6 py-3 rounded-2xl cursor-pointer transition-all border-none shadow-md whitespace-nowrap font-bold text-[10px] uppercase tracking-widest",
                    selectedFuel === fuel.id ? "bg-primary text-white scale-105 shadow-primary/30" : "bg-white text-slate-500 hover:bg-slate-100"
                  )}
                >
                  <Fuel className="w-3 h-3 mr-2" />
                  {fuel.name}
                </Badge>
              ))}
            </div>

            <MapView 
              stations={filteredAndSortedStations} 
              userLocation={userLocation} 
              fuelId={selectedFuel}
              onSelectStation={setSelectedStationId}
            />
          </div>
        )}

        {view === "list" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center px-2">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                <span className="text-primary">{filteredAndSortedStations.length}</span> unidades próximas
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSortBy(sortBy === "distance" ? "price" : "distance")}
                className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-white border border-slate-100 rounded-xl px-4 py-2 h-auto shadow-sm"
              >
                <ArrowUpDown className="w-3 h-3 mr-2 text-primary" /> 
                {sortBy === "distance" ? "Mais próximos" : "Menor preço"}
              </Button>
            </div>

            <div className="space-y-5">
              {filteredAndSortedStations.length > 0 ? (
                filteredAndSortedStations.map((station) => (
                  <Card 
                    key={station.id} 
                    className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-[2.5rem] overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer ring-1 ring-slate-100"
                    onClick={() => setSelectedStationId(station.id)}
                  >
                    <CardContent className="p-0">
                      <div className="p-6 space-y-4">
                        <div className="flex gap-5">
                          <div className="w-20 h-20 relative rounded-3xl overflow-hidden shadow-inner border border-slate-50 shrink-0 bg-slate-50 flex items-center justify-center">
                            {station.logo ? (
                              <Image 
                                src={station.logo} 
                                alt={station.name} 
                                fill 
                                className="object-contain p-2"
                              />
                            ) : (
                              <Fuel className="w-8 h-8 text-slate-200" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 space-y-1 py-1">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-bold text-lg text-slate-800 truncate uppercase italic">{station.name}</h4>
                              <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-0.5 rounded-full shrink-0">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-[10px] font-bold text-yellow-700">4.8</span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-primary" /> {station.address}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-primary/10 text-primary text-[8px] font-bold px-3 py-1 border-none rounded-full">
                                {station.dist ? `${station.dist.toFixed(1)} km de você` : "..."}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                          {fuelTypes.map((fuel) => {
                            const fuelData = (station.prices as any)?.[fuel.id];
                            if (!fuelData) return null;
                            
                            const price = fuelData.app || fuelData.discount;
                            if (!price) return null;

                            return (
                              <div key={fuel.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center justify-center space-y-1">
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{fuel.name}</p>
                                <p className="text-sm font-bold text-primary tracking-tight">R$ {Number(price).toFixed(2)}</p>
                              </div>
                            )
                          })}
                          <div className="bg-slate-900 flex items-center justify-center p-3 rounded-2xl group-hover:bg-primary transition-colors">
                            <ChevronRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="p-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                    <Fuel className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Nenhum posto encontrado</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </main>
  )
}

export default function StationsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <StationsContent />
    </Suspense>
  )
}

