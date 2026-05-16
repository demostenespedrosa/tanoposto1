
"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, List, Map as MapIcon, Fuel, Navigation as NavIcon, Star, ArrowUpDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function StationsPage() {
  const [view, setView] = useState<"list" | "map">("list")
  const [selectedFuel, setSelectedFuel] = useState("gasolina")
  const [sortBy, setSortBy] = useState<"distance" | "price">("distance")

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
      prices: { gasolina: 5.79, etanol: 3.99, diesel: 6.10 },
      logo: "https://picsum.photos/seed/shell/100/100" 
    },
    { 
      id: 2, 
      name: "Ipiranga Pro", 
      address: "Rua Sete de Setembro, 12 - Centro", 
      dist: 2.5, 
      rating: 4.5,
      prices: { gasolina: 5.85, etanol: 4.05, diesel: 6.05 },
      logo: "https://picsum.photos/seed/ipiranga/100/100" 
    },
    { 
      id: 3, 
      name: "Petrobras Podium", 
      address: "Estrada do Galeão, 300 - Ilha", 
      dist: 0.8, 
      rating: 4.7,
      prices: { gasolina: 5.75, etanol: 3.89, diesel: 6.20 },
      logo: "https://picsum.photos/seed/br/100/100" 
    },
  ]

  const sortedStations = useMemo(() => {
    return [...stationsData].sort((a, b) => {
      if (sortBy === "distance") return a.dist - b.dist
      if (sortBy === "price") {
        const priceA = a.prices[selectedFuel as keyof typeof a.prices]
        const priceB = b.prices[selectedFuel as keyof typeof b.prices]
        return priceA - priceB
      }
      return 0
    })
  }, [sortBy, selectedFuel])

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
                className="h-9 w-9 p-0 rounded-lg"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button 
                variant={view === "map" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView("map")}
                className="h-9 w-9 p-0 rounded-lg"
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Input className="pl-10 bg-white border-none shadow-sm h-12 rounded-2xl focus-visible:ring-primary" placeholder="Buscar posto ou endereço..." />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          {/* Filtros Contextuais */}
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
                    sortBy === "distance" ? "bg-primary text-white border-none shadow-md shadow-primary/20" : "bg-white text-slate-500 border-slate-100"
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
                    sortBy === "price" ? "bg-primary text-white border-none shadow-md shadow-primary/20" : "bg-white text-slate-500 border-slate-100"
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
                      selectedFuel === fuel.id ? "bg-primary text-white border-none shadow-md shadow-primary/20" : "bg-white text-slate-500 border-slate-100"
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
              <Card key={station.id} className="border-none shadow-md overflow-hidden bg-white active:scale-[0.98] transition-transform">
                <CardContent className="p-0">
                  <div className="p-4 flex gap-4">
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
                  <div className="bg-slate-50/50 p-3 grid grid-cols-3 gap-2 border-t border-slate-100">
                    <div className="text-center">
                      <p className="text-[8px] uppercase font-bold text-muted-foreground mb-0.5">Gasolina</p>
                      <p className="text-sm font-headline font-bold text-slate-700">R$ {station.prices.gasolina.toFixed(2)}</p>
                    </div>
                    <div className="text-center border-x border-slate-200">
                      <p className="text-[8px] uppercase font-bold text-muted-foreground mb-0.5">Etanol</p>
                      <p className="text-sm font-headline font-bold text-slate-700">R$ {station.prices.etanol.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] uppercase font-bold text-muted-foreground mb-0.5">Diesel</p>
                      <p className="text-sm font-headline font-bold text-slate-700">R$ {station.prices.diesel.toFixed(2)}</p>
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
                 {/* Pins Customizados baseados no combustível selecionado */}
                 <div className="absolute top-[30%] left-[25%] p-2 bg-white rounded-2xl shadow-xl border-2 border-primary flex items-center gap-2 pointer-events-auto cursor-pointer transform hover:scale-110 transition-transform">
                    <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Fuel className="w-4 h-4 text-primary" />
                    </div>
                    <div className="pr-1">
                      <p className="text-[7px] font-bold text-muted-foreground uppercase leading-none">{selectedFuel}</p>
                      <span className="text-xs font-headline font-bold text-slate-800">R$ 5,79</span>
                    </div>
                 </div>
                 <div className="absolute top-[60%] left-[65%] p-2 bg-white rounded-2xl shadow-xl border-2 border-primary flex items-center gap-2 pointer-events-auto cursor-pointer transform hover:scale-110 transition-transform">
                    <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Fuel className="w-4 h-4 text-primary" />
                    </div>
                    <div className="pr-1">
                      <p className="text-[7px] font-bold text-muted-foreground uppercase leading-none">{selectedFuel}</p>
                      <span className="text-xs font-headline font-bold text-slate-800">R$ 5,85</span>
                    </div>
                 </div>
              </div>
              
              <div className="absolute bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-white/50 flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-700">
                <div className="w-14 h-14 rounded-2xl border border-slate-100 overflow-hidden relative shadow-sm shrink-0">
                  <Image src="https://picsum.photos/seed/shell/100/100" alt="Shell" fill className="object-cover" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-bold text-slate-800 truncate">Shell V-Power</h4>
                  <p className="text-[10px] text-muted-foreground truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> 1.2 km de distância
                  </p>
                  <p className="text-[10px] text-primary font-bold mt-1">Preço: R$ 5,79 ({selectedFuel})</p>
                </div>
                <Button size="icon" className="rounded-2xl h-12 w-12 shadow-lg shadow-primary/20">
                  <NavIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
      <Navigation />
    </main>
  )
}
