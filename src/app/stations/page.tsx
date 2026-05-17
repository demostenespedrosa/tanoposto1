\"use client\"

import { useState, useMemo, useEffect, Suspense } from \"react\"
import { Navigation } from \"@/components/Navigation\"
import { Card, CardContent } from \"@/components/ui/card\"
import { Button } from \"@/components/ui/button\"
import { Input } from \"@/components/ui/input\"
import { Badge } from \"@/components/ui/badge\"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from \"@/components/ui/dialog\"
import { useRouter, useSearchParams } from \"next/navigation\"
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
  Clock, 
  Zap,
  Droplets,
  AirVent,
  Store,
  Car,
  QrCode,
  ShieldCheck,
  Loader2
} from \"lucide-react\"
import Image from \"next/image\"
import { cn } from \"@/lib/utils\"
import { toast } from \"@/hooks/use-toast\"
import { db } from \"@/lib/firebase\"
import { collection, onSnapshot, query, where } from \"firebase/firestore\"
import { calculateDistance, getCurrentLocation, type Station } from \"@/hooks/useStations\"

function StationsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSelectedId = searchParams.get('id')

  const [view, setView] = useState<\"list\" | \"map\">(\"list\")
  const [selectedFuel, setSelectedFuel] = useState(\"gasolina\")
  const [sortBy, setSortBy] = useState<\"distance\" | \"price\">(\"distance\")
  const [selectedStationId, setSelectedStationId] = useState<string | null>(initialSelectedId)
  const [searchTerm, setSearchTerm] = useState(\"\")

  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null)

  useEffect(() => {
    getCurrentLocation()
      .then(loc => setUserLocation(loc))
      .catch(err => console.error(\"Erro loc:\", err))

    const q = query(collection(db, \"stations\"), where(\"status\", \"==\", \"ativo\"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const stationsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Station[]
      setStations(stationsList)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (initialSelectedId) {
      setSelectedStationId(initialSelectedId)
    }
  }, [initialSelectedId])

  const fuelTypes = [
    { id: \"gasolina\", label: \"Gasolina\" },
    { id: \"etanol\", label: \"Etanol\" },
    { id: \"diesel\", label: \"Diesel\" },
  ]

  const stationsWithDistance = useMemo(() => {
    return stations.map(s => {
      let dist = 999
      if (userLocation) {
        dist = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          Number(s.latitude),
          Number(s.longitude)
        )
      }
      return { ...s, dist }
    })
  }, [stations, userLocation])

  const filteredAndSortedStations = useMemo(() => {
    return stationsWithDistance
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === \"distance\") return a.dist - b.dist
        if (sortBy === \"price\") {
          const priceA = (a.prices as any)?.[selectedFuel]?.app || 999
          const priceB = (b.prices as any)?.[selectedFuel]?.app || 999
          return priceA - priceB
        }
        return 0
      })
  }, [stationsWithDistance, sortBy, selectedFuel, searchTerm])

  const selectedStation = stationsWithDistance.find(s => s.id === selectedStationId)

  const [isFuelingDialogOpen, setIsFuelingDialogOpen] = useState(false)

  const handleOpenMaps = () => {
    if (selectedStation) {
      const lat = selectedStation.latitude
      const lng = selectedStation.longitude
      window.open(https://www.google.com/maps/dir/?api=1&destination=\,\, '_blank');
    }
  }

  const handleGenerateToken = () => {
    if (!selectedStation) return;
    
    const code1 = Math.floor(100 + Math.random() * 900);
    const code2 = Math.floor(100 + Math.random() * 900);
    const formattedCode = \-\;

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
      title: \"Código de 6 Dígitos!\",
      description: \"Apresente após o abastecimento para ganhar o desconto.\",
    });
    
    router.push('/coupons');
  }

  if (loading) {
    return (
      <div className=\"min-h-screen flex items-center justify-center bg-slate-50\">
        <div className=\"text-center space-y-4\">
          <Loader2 className=\"w-10 h-10 animate-spin text-primary mx-auto\" />
          <p className=\"text-sm font-bold text-slate-500 uppercase tracking-widest\">Localizando postos...</p>
        </div>
      </div>
    )
  }

  if (selectedStation) {
    return (
      <main className=\"min-h-screen pb-32 bg-slate-50 text-slate-900 animate-in fade-in slide-in-from-right duration-300\">
        <div className=\"relative h-64 w-full\">
          {selectedStation.logo ? (
             <Image 
              src={selectedStation.logo} 
              alt={selectedStation.name}
              fill
              className=\"object-cover\"
            />
          ) : (
            <div className=\"w-full h-full bg-slate-200 flex items-center justify-center\">
              <Fuel className=\"w-12 h-12 text-slate-400\" />
            </div>
          )}
          <div className=\"absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/30\" />
          <Button 
            variant=\"ghost\" 
            size=\"icon\" 
            onClick={() => {
              if (initialSelectedId) router.push('/stations')
              setSelectedStationId(null)
            }}
            className=\"absolute top-6 left-4 bg-white/80 backdrop-blur-md rounded-full h-10 w-10 shadow-sm\"
          >
            <ChevronLeft className=\"w-6 h-6\" />
          </Button>
        </div>

        <div className=\"max-w-lg mx-auto px-4 -mt-12 relative z-10 space-y-6\">
          <Card className=\"border-none shadow-xl bg-white overflow-hidden\">
            <CardContent className=\"p-6 space-y-4\">
              <div className=\"flex gap-4 items-start\">
                <div className=\"w-20 h-20 rounded-2xl border border-slate-100 overflow-hidden relative shrink-0 shadow-md bg-slate-50 flex items-center justify-center\">
                  {selectedStation.logo ? (
                    <Image src={selectedStation.logo} alt={selectedStation.name} fill className=\"object-cover\" />
                  ) : (
                    <Fuel className=\"w-8 h-8 text-slate-300\" />
                  )}
                </div>
                <div className=\"flex-1 space-y-1\">
                  <h1 className=\"text-xl font-headline font-bold text-slate-800\">{selectedStation.name}</h1>
                  <p className=\"text-xs text-muted-foreground leading-relaxed flex items-start gap-1\">
                    <MapPin className=\"w-3 h-3 text-slate-400 mt-0.5\" /> {selectedStation.address}
                  </p>
                  <div className=\"flex items-center gap-3 mt-2\">
                    <div className=\"flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full\">
                      <Star className=\"w-3 h-3 text-yellow-500 fill-yellow-500\" />
                      <span className=\"text-[10px] font-bold text-yellow-700\">4.8</span>
                    </div>
                    <span className=\"text-[10px] font-bold text-primary\">
                      {selectedStation.dist ? \ km de você : \"Calculando distância...\"}
                    </span>
                  </div>
                </div>
              </div>

              <div className=\"grid grid-cols-2 gap-3 pt-4 border-t border-slate-50\">
                <div className=\"flex items-center gap-2 text-xs text-slate-600\">
                  <Clock className=\"w-4 h-4 text-slate-400\" />
                  <span>Aberto agora</span>
                </div>
                <div className=\"flex items-center gap-2 text-xs text-slate-600\">
                  <Zap className=\"w-4 h-4 text-primary\" />
                  <span>Abastecimento por App</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className=\"space-y-4\">
            <h3 className=\"font-bold text-slate-800 text-lg flex items-center gap-2\">
              <Fuel className=\"w-5 h-5 text-primary\" /> Tabela de Preços
            </h3>
            <div className=\"space-y-3\">
              {['gasolina', 'etanol', 'diesel'].map((f) => {
                const priceData = (selectedStation.prices as any)?.[f];
                if (!priceData) return null;

                return (
                  <Card key={f} className=\"border-none shadow-md bg-white overflow-hidden\">
                    <CardContent className=\"p-4 flex items-center justify-between\">
                      <div className=\"flex items-center gap-3\">
                        <div className=\"p-2 bg-slate-50 rounded-xl capitalize font-bold text-xs text-slate-600\">
                          {f}
                        </div>
                        <div>
                          <p className=\"text-[8px] font-bold text-muted-foreground uppercase tracking-widest\">Bomba</p>
                          <p className=\"text-sm font-bold text-slate-400 line-through\">R$ {priceData.pump?.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className=\"text-right\">
                        <p className=\"text-[8px] font-bold text-primary uppercase tracking-widest\">No App</p>
                        <p className=\"text-xl font-headline font-bold text-primary\">R$ {priceData.app?.toFixed(2)}</p>
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
          <DialogContent className=\"max-w-[90vw] rounded-[2rem] p-0 overflow-hidden border-none text-slate-900\">
            <div className=\"p-8 space-y-6\">
              <div className=\"w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto\">
                <QrCode className=\"w-10 h-10 text-primary\" />
              </div>
              <div className=\"text-center space-y-2\">
                <DialogTitle className=\"text-2xl font-headline font-bold italic uppercase tracking-tight\">Iniciar Abastecimento</DialogTitle>
                <DialogDescription className=\"text-slate-500\">
                  Você está prestes a gerar um código de desconto para o posto <span className=\"font-bold text-slate-800\">{selectedStation.name}</span>.
                </DialogDescription>
              </div>

              <div className=\"bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 space-y-3\">
                <div className=\"flex items-center gap-3 text-xs text-slate-600\">
                  <ShieldCheck className=\"w-4 h-4 text-green-500\" />
                  <span>Desconto garantido pela plataforma</span>
                </div>
                <div className=\"flex items-center gap-3 text-xs text-slate-600\">
                  <Clock className=\"w-4 h-4 text-orange-400\" />
                  <span>O código expira em 15 minutos</span>
                </div>
              </div>

              <Button 
                onClick={handleGenerateToken}
                className=\"w-full h-14 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:bg-black transition-all text-sm tracking-widest uppercase\"
              >
                GERAR CÓDIGO AGORA
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className=\"fixed bottom-24 left-0 right-0 px-4 flex gap-3 max-w-lg mx-auto z-40\">
          <Button 
            onClick={handleOpenMaps}
            variant=\"outline\"
            className=\"flex-1 h-14 rounded-2xl bg-white/90 backdrop-blur-md border-slate-200 font-bold text-slate-800 shadow-lg hover:bg-white\"
          >
            <NavIcon className=\"w-5 h-5 mr-1\" /> COMO CHEGAR
          </Button>
          <Button 
            onClick={() => setIsFuelingDialogOpen(true)}
            className=\"flex-1 h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform\"
          >
            <Fuel className=\"w-5 h-5 mr-1\" /> ABASTECER
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className=\"min-h-screen pb-32 bg-slate-50 text-slate-900 animate-in fade-in duration-300\">
      <div className=\"max-w-lg mx-auto px-4 pt-6 space-y-6\">
        <div className=\"space-y-4\">
          <div className=\"flex justify-between items-center\">
            <h1 className=\"text-2xl font-headline font-bold italic uppercase tracking-tight text-slate-800\">Encontrar Posto</h1>
            <div className=\"flex gap-2\">
              <Button 
                size=\"icon\" 
                variant={view === \"list\" ? \"default\" : \"outline\"}
                onClick={() => setView(\"list\")}
                className={cn(\"rounded-xl w-10 h-10\", view === \"list\" ? \"bg-slate-900\" : \"bg-white text-slate-600\")}
              >
                <List className=\"w-5 h-5\" />
              </Button>
              <Button 
                size=\"icon\" 
                variant={view === \"map\" ? \"default\" : \"outline\"}
                onClick={() => setView(\"map\")}
                className={cn(\"rounded-xl w-10 h-10\", view === \"map\" ? \"bg-slate-900\" : \"bg-white text-slate-600\")}
              >
                <MapIcon className=\"w-5 h-5\" />
              </Button>
            </div>
          </div>
          <div className=\"relative group\">
            <Search className=\"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors\" />
            <Input 
              placeholder=\"Buscar por nome, bairro ou rede\" 
              className=\"pl-12 h-14 rounded-2xl border-none shadow-md bg-white text-sm focus-visible:ring-primary\"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className=\"flex gap-2 overflow-x-auto pb-2 custom-scrollbar\">
          {fuelTypes.map((fuel) => (
            <Badge
              key={fuel.id}
              onClick={() => setSelectedFuel(fuel.id)}
              variant={selectedFuel === fuel.id ? \"default\" : \"outline\"}
              className={cn(
                \"px-5 py-2 rounded-full cursor-pointer transition-all border-none shadow-sm whitespace-nowrap font-bold text-[10px] uppercase tracking-widest\",
                selectedFuel === fuel.id ? \"bg-primary text-white scale-105 shadow-primary/20\" : \"bg-white text-slate-500 hover:bg-slate-100\"
              )}
            >
              {fuel.label}
            </Badge>
          ))}
        </div>

        <div className=\"space-y-4\">
          <div className=\"flex justify-between items-center px-1\">
            <p className=\"text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]\">{filteredAndSortedStations.length} Postos encontrados</p>
            <div className=\"flex items-center gap-2\">
              <Button 
                variant=\"ghost\" 
                size=\"sm\" 
                onClick={() => setSortBy(sortBy === \"distance\" ? \"price\" : \"distance\")}
                className=\"text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary/5 p-0 h-auto\"
              >
                <ArrowUpDown className=\"w-3 h-3 mr-1\" /> 
                {sortBy === \"distance\" ? \"Mais próximos\" : \"Menor preço\"}
              </Button>
            </div>
          </div>

          <div className=\"space-y-4\">
            {filteredAndSortedStations.length > 0 ? (
              filteredAndSortedStations.map((station) => (
                <Card 
                  key={station.id} 
                  className=\"border-none shadow-md bg-white overflow-hidden group hover:shadow-xl transition-all cursor-pointer\"
                  onClick={() => setSelectedStationId(station.id)}
                >
                  <CardContent className=\"p-0\">
                    <div className=\"flex\">
                      <div className=\"w-28 relative overflow-hidden\">
                        {station.logo ? (
                          <Image src={station.logo} alt={station.name} fill className=\"object-cover group-hover:scale-110 transition-transform duration-500\" />
                        ) : (
                          <div className=\"w-full h-full bg-slate-100 flex items-center justify-center\">
                            <Fuel className=\"w-8 h-8 text-slate-300\" />
                          </div>
                        )}
                        <div className=\"absolute top-2 left-2\">
                          <Badge className=\"bg-white/90 backdrop-blur-md text-slate-800 text-[8px] font-bold px-2 py-0.5 border-none shadow-sm\">
                            {station.dist ? \ km : \"...\"}
                          </Badge>
                        </div>
                      </div>
                      <div className=\"flex-1 p-4 space-y-3\">
                        <div>
                          <h4 className=\"font-bold text-slate-800\">{station.name}</h4>
                          <p className=\"text-[10px] text-muted-foreground truncate leading-relaxed\">{station.address}</p>
                        </div>
                        <div className=\"flex justify-between items-end\">
                          <div className=\"space-y-0.5\">
                            <p className=\"text-[8px] text-muted-foreground font-bold uppercase tracking-widest\">
                              {fuelTypes.find(f => f.id === selectedFuel)?.label}
                            </p>
                            <p className=\"text-xl font-headline font-bold text-primary\">
                              R$ {(station.prices as any)?.[selectedFuel]?.app?.toFixed(2) || \"---\"}
                            </p>
                          </div>
                          <div className=\"flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg\">
                            <Star className=\"w-3 h-3 text-yellow-500 fill-yellow-500\" />
                            <span className=\"text-[10px] font-bold text-yellow-700\">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className=\"p-10 text-center space-y-2\">
                <Fuel className=\"w-12 h-12 text-slate-200 mx-auto\" />
                <p className=\"text-sm font-bold text-slate-400 uppercase tracking-widest italic\">Nenhum posto encontrado</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <Navigation />
    </main>
  )
}

export default function StationsPage() {
  return (
    <Suspense fallback={
      <div className=\"min-h-screen flex items-center justify-center\">
        <Loader2 className=\"w-8 h-8 animate-spin text-primary\" />
      </div>
    }>
      <StationsContent />
    </Suspense>
  )
}
