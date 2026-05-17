
"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
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
  ShieldCheck
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export default function StationsPage() {
  const router = useRouter()
  const [view, setView] = useState<"list" | "map">("list")
  const [selectedFuel, setSelectedFuel] = useState("gasolina")
  const [sortBy, setSortBy] = useState<"distance" | "price">("distance")
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null)
  
  // Fueling state
  const [isFuelingDialogOpen, setIsFuelingDialogOpen] = useState(false)

  const fuelTypes = [
    { id: "gasolina", label: "Gasolina" },
    { id: "etanol", label: "Etanol" },
    { id: "diesel", label: "Diesel" },
  ]

  const stationsData = [
    { 
      id: 1, 
      name: "Shell V-Power", 
      address: "Av. das Américas, 4200 - Barra", 
      dist: 1.2, 
      rating: 4.8,
      hours: "Aberto 24h",
      services: [
        { name: "Calibrador", icon: AirVent },
        { name: "Troca de Óleo", icon: Droplets },
        { name: "Conveniência", icon: Store },
        { name: "Lava Jato", icon: Car }
      ],
      prices: { 
        gasolina: { pump: 5.79, app: 5.65 }, 
        etanol: { pump: 3.99, app: 3.85 }, 
        diesel: { pump: 6.10, app: 5.95 } 
      },
      logo: "https://picsum.photos/seed/shell/200/200" 
    },
    { 
      id: 2, 
      name: "Ipiranga Pro", 
      address: "Rua Sete de Setembro, 12 - Centro", 
      dist: 2.5, 
      rating: 4.5,
      hours: "06:00 - 22:00",
      services: [
        { name: "Calibrador", icon: AirVent },
        { name: "Conveniência", icon: Store }
      ],
      prices: { 
        gasolina: { pump: 5.85, app: 5.70 }, 
        etanol: { pump: 4.05, app: 3.90 }, 
        diesel: { pump: 6.05, app: 5.85 } 
      },
      logo: "https://picsum.photos/seed/ipiranga/200/200" 
    },
    { 
      id: 3, 
      name: "Petrobras Podium", 
      address: "Estrada do Galeão, 300 - Ilha", 
      dist: 0.8, 
      rating: 4.7,
      hours: "Aberto 24h",
      services: [
        { name: "Calibrador", icon: AirVent },
        { name: "Troca de Óleo", icon: Droplets },
        { name: "Lava Jato", icon: Car }
      ],
      prices: { 
        gasolina: { pump: 5.75, app: 5.59 }, 
        etanol: { pump: 3.89, app: 3.75 }, 
        diesel: { pump: 6.20, app: 5.99 } 
      },
      logo: "https://picsum.photos/seed/br/200/200" 
    },
  ]

  const sortedStations = useMemo(() => {
    return [...stationsData].sort((a, b) => {
      if (sortBy === "distance") return a.dist - b.dist
      if (sortBy === "price") {
        const priceA = a.prices[selectedFuel as keyof typeof a.prices].app
        const priceB = b.prices[selectedFuel as keyof typeof b.prices].app
        return priceA - priceB
      }
      return 0
    })
  }, [sortBy, selectedFuel])

  const selectedStation = stationsData.find(s => s.id === selectedStationId)

  const handleOpenMaps = () => {
    if (selectedStation) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStation.name + " " + selectedStation.address)}`, '_blank');
    }
  }

  const handleGenerateToken = () => {
    if (!selectedStation) return;
    
    // Gera código de 6 dígitos formatado 000-000
    const code1 = Math.floor(100 + Math.random() * 900);
    const code2 = Math.floor(100 + Math.random() * 900);
    const formattedCode = `${code1}-${code2}`;

    const token = {
      id: formattedCode,
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

  if (selectedStation) {
    return (
      <main className="min-h-screen pb-32 bg-slate-50 text-slate-900 animate-in fade-in slide-in-from-right duration-300">
        <div className="relative h-64 w-full">
          <Image 
            src={`https://picsum.photos/seed/station-${selectedStation.id}/800/600`} 
            alt={selectedStation.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/30" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSelectedStationId(null)}
            className="absolute top-6 left-4 bg-white/80 backdrop-blur-md rounded-full h-10 w-10 shadow-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="max-w-lg mx-auto px-4 -mt-12 relative z-10 space-y-6">
          <Card className="border-none shadow-xl bg-white overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-20 h-20 rounded-2xl border border-slate-100 overflow-hidden relative shrink-0 shadow-md">
                  <Image src={selectedStation.logo} alt={selectedStation.name} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h1 className="text-xl font-headline font-bold text-slate-800">{selectedStation.name}</h1>
                  <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 mt-0.5" /> {selectedStation.address}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] font-bold text-yellow-700">{selectedStation.rating}</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary">{selectedStation.dist} km de você</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium">{selectedStation.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 justify-end">
                  <Badge variant="secondary" className="bg-green-50 text-primary border-none">Aberto agora</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 px-1">Preços no Aplicativo</h3>
            <div className="grid gap-3">
              {Object.entries(selectedStation.prices).map(([key, price]) => (
                <Card key={key} className="border-none shadow-sm bg-white overflow-hidden">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Fuel className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 uppercase">{key}</p>
                        <p className="text-[10px] text-muted-foreground">Bomba: R$ {price.pump.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase font-bold text-primary tracking-widest">No App</p>
                      <p className="text-xl font-headline font-bold text-primary">R$ {price.app.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 px-1">Serviços no Local</h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedStation.services.map((service, i) => {
                const Icon = service.icon
                return (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-slate-50">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{service.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex gap-3 pb-8">
            <Button 
              onClick={handleOpenMaps}
              variant="outline" 
              className="flex-1 h-14 border-slate-200 text-slate-600 font-bold rounded-2xl flex gap-2"
            >
              <NavIcon className="w-5 h-5" /> MAPA
            </Button>
            <Button 
              onClick={() => setIsFuelingDialogOpen(true)}
              className="flex-[2] h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex gap-2"
            >
              <Fuel className="w-5 h-5" /> ABASTECER AQUI
            </Button>
          </div>
        </div>

        <Dialog open={isFuelingDialogOpen} onOpenChange={setIsFuelingDialogOpen}>
          <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl">
            <DialogHeader className="items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                 <QrCode className="w-8 h-8 text-primary" />
              </div>
              <DialogTitle className="font-headline font-bold text-slate-800 text-xl">Confirmar Abastecimento</DialogTitle>
              <DialogDescription className="text-slate-500 font-medium px-4">
                Abasteça normalmente no posto. Ao final, apresente o código que vamos gerar agora ao frentista.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
               <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                 <div className="flex items-center gap-2 text-primary">
                   <ShieldCheck className="w-4 h-4" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Operação Segura</span>
                 </div>
                 <p className="text-xs text-slate-600 font-medium leading-relaxed">
                   O desconto será aplicado diretamente pelo frentista e o pagamento sairá da sua carteira Tá no posto.
                 </p>
               </div>
            </div>

            <DialogFooter>
              <Button 
                onClick={handleGenerateToken}
                className="w-full h-14 bg-primary text-white font-bold rounded-2xl"
              >
                GERAR CÓDIGO DE 6 DÍGITOS
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Navigation />
      </main>
    )
  }

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50 text-slate-900">
      <div className="max-w-lg mx-auto px-4 space-y-6">
        
        <header className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-headline font-bold text-slate-800 tracking-tight">Postos Parceiros</h1>
            <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex gap-1">
              <Button 
                variant={view === "list" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView("list")}
                className={cn("h-9 w-9 p-0 rounded-lg", view === "list" && "bg-primary text-white")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button 
                variant={view === "map" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView("map")}
                className={cn("h-9 w-9 p-0 rounded-lg", view === "map" && "bg-primary text-white")}
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Input className="pl-10 bg-white border-none shadow-sm h-12 rounded-2xl focus-visible:ring-primary" placeholder="Buscar posto ou endereço..." />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            {view === "list" ? (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2 flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3" /> Ordenar:
                </span>
                <Button
                  variant={sortBy === "distance" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("distance")}
                  className={cn(
                    "rounded-full px-4 h-9 font-bold text-[10px] uppercase tracking-widest",
                    sortBy === "distance" ? "bg-primary text-white border-none" : "bg-white text-slate-500 border-slate-100"
                  )}
                >
                  Mais perto
                </Button>
                <Button
                  variant={sortBy === "price" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("price")}
                  className={cn(
                    "rounded-full px-4 h-9 font-bold text-[10px] uppercase tracking-widest",
                    sortBy === "price" ? "bg-primary text-white border-none" : "bg-white text-slate-500 border-slate-100"
                  )}
                >
                  Menor preço
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2 flex items-center gap-1">
                  <Fuel className="w-3 h-3" /> Exibir:
                </span>
                {fuelTypes.map((fuel) => (
                  <Button
                    key={fuel.id}
                    variant={selectedFuel === fuel.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFuel(fuel.id)}
                    className={cn(
                      "rounded-full px-4 h-9 font-bold text-[10px] uppercase tracking-widest",
                      selectedFuel === fuel.id ? "bg-primary text-white border-none" : "bg-white text-slate-500 border-slate-100"
                    )}
                  >
                    {fuel.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </header>

        {view === "list" ? (
          <div className="space-y-4">
            {sortedStations.map((station) => (
              <Card 
                key={station.id} 
                className="border-none shadow-md overflow-hidden bg-white active:scale-[0.98] transition-transform cursor-pointer rounded-[2rem]"
                onClick={() => setSelectedStationId(station.id)}
              >
                <CardContent className="p-0">
                  <div className="p-5 flex gap-4">
                    <div className="w-16 h-16 rounded-2xl border border-slate-50 overflow-hidden relative shrink-0 shadow-sm">
                      <Image src={station.logo} alt={station.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-800 truncate">{station.name}</h3>
                        <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-md">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-[10px] font-bold text-yellow-700">{station.rating}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {station.address}
                      </p>
                      <p className="text-[10px] text-primary font-bold">{station.dist} km de você</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 p-4 grid grid-cols-3 gap-2 border-t border-slate-100">
                    <div className="text-center">
                      <p className="text-[8px] uppercase font-bold text-muted-foreground mb-0.5">Gasolina</p>
                      <p className="text-sm font-headline font-bold text-primary">R$ {station.prices.gasolina.app.toFixed(2)}</p>
                    </div>
                    <div className="text-center border-x border-slate-200">
                      <p className="text-[8px] uppercase font-bold text-muted-foreground mb-0.5">Etanol</p>
                      <p className="text-sm font-headline font-bold text-primary">R$ {station.prices.etanol.app.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] uppercase font-bold text-muted-foreground mb-0.5">Diesel</p>
                      <p className="text-sm font-headline font-bold text-primary">R$ {station.prices.diesel.app.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in zoom-in-95 duration-500">
            <div className="relative h-[500px] w-full bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-inner border border-slate-100">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-43.2105%2C-22.9205%2C-43.1605%2C-22.8805&layer=mapnik"
                className="grayscale opacity-70 contrast-125"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                 {stationsData.map((station, i) => (
                   <div 
                    key={station.id}
                    onClick={() => setSelectedStationId(station.id)}
                    className={cn(
                      "absolute p-2 bg-white rounded-2xl shadow-xl border-2 border-primary flex items-center gap-2 pointer-events-auto cursor-pointer transform hover:scale-110 transition-transform",
                      i === 0 ? "top-[30%] left-[25%]" : i === 1 ? "top-[60%] left-[65%]" : "top-[45%] left-[50%]"
                    )}
                   >
                      <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Fuel className="w-4 h-4 text-primary" />
                      </div>
                      <div className="pr-1">
                        <p className="text-[7px] font-bold text-muted-foreground uppercase leading-none">{selectedFuel}</p>
                        <span className="text-xs font-headline font-bold text-slate-800">R$ {station.prices[selectedFuel as keyof typeof station.prices].app.toFixed(2)}</span>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )}

      </div>
      <Navigation />
    </main>
  )
}

function Info(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
