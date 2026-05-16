
"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, List, Map as MapIcon, Fuel, Navigation as NavIcon, Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function StationsPage() {
  const [view, setView] = useState<"list" | "map">("list")
  const [selectedFuel, setSelectedFuel] = useState("gasolina")

  const fuelTypes = [
    { id: "gasolina", label: "Gasolina" },
    { id: "etanol", label: "Etanol" },
    { id: "diesel", label: "Diesel" },
  ]

  const stations = [
    { 
      id: 1, 
      name: "Shell V-Power", 
      address: "Av. das Américas, 4200 - Barra", 
      dist: "1.2 km", 
      rating: 4.8,
      prices: { gasolina: "5.79", etanol: "3.99", diesel: "6.10" },
      logo: "https://picsum.photos/seed/shell/100/100" 
    },
    { 
      id: 2, 
      name: "Ipiranga Pro", 
      address: "Rua Sete de Setembro, 12 - Centro", 
      dist: "2.5 km", 
      rating: 4.5,
      prices: { gasolina: "5.85", etanol: "4.05", diesel: "6.05" },
      logo: "https://picsum.photos/seed/ipiranga/100/100" 
    },
    { 
      id: 3, 
      name: "Petrobras Podium", 
      address: "Estrada do Galeão, 300 - Ilha", 
      dist: "3.8 km", 
      rating: 4.7,
      prices: { gasolina: "5.75", etanol: "3.89", diesel: "6.20" },
      logo: "https://picsum.photos/seed/br/100/100" 
    },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50">
      <div className="max-w-lg mx-auto px-4 space-y-6">
        
        <header className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-headline font-bold text-slate-800">Postos Parceiros</h1>
            <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-100 flex gap-1">
              <Button 
                variant={view === "list" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView("list")}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button 
                variant={view === "map" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView("map")}
                className="h-8 w-8 p-0"
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Input className="pl-10 bg-white border-none shadow-sm h-12 rounded-xl" placeholder="Buscar posto ou endereço..." />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
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
        </header>

        {view === "list" ? (
          <div className="space-y-4">
            {stations.map((station) => (
              <Card key={station.id} className="border-none shadow-md overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className="p-4 flex gap-4">
                    <div className="w-16 h-16 rounded-2xl border border-slate-50 overflow-hidden relative shrink-0">
                      <Image src={station.logo} alt={station.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-800 truncate">{station.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-[10px] font-bold text-slate-600">{station.rating}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {station.address}
                      </p>
                      <p className="text-[10px] text-primary font-bold">{station.dist} de você</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 grid grid-cols-3 gap-2 border-t border-slate-100">
                    <div className="text-center">
                      <p className="text-[8px] uppercase font-bold text-muted-foreground">Gasolina</p>
                      <p className="text-sm font-bold text-slate-700">R$ {station.prices.gasolina}</p>
                    </div>
                    <div className="text-center border-x border-slate-200">
                      <p className="text-[8px] uppercase font-bold text-muted-foreground">Etanol</p>
                      <p className="text-sm font-bold text-slate-700">R$ {station.prices.etanol}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] uppercase font-bold text-muted-foreground">Diesel</p>
                      <p className="text-sm font-bold text-slate-700">R$ {station.prices.diesel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative h-[450px] w-full bg-slate-200 rounded-3xl overflow-hidden shadow-inner border border-slate-100">
              {/* Mock do OpenStreetMap - Em um app real usaríamos Leaflet ou Iframe de OSM */}
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-43.2105%2C-22.9205%2C-43.1605%2C-22.8805&layer=mapnik"
                className="grayscale opacity-80"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                 {/* Pins Customizados */}
                 <div className="absolute top-1/4 left-1/3 p-2 bg-white rounded-xl shadow-lg border border-primary flex items-center gap-2 pointer-events-auto cursor-pointer transform hover:scale-110 transition-transform">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Fuel className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">R$ 5,79</span>
                 </div>
                 <div className="absolute top-1/2 left-2/3 p-2 bg-white rounded-xl shadow-lg border border-primary flex items-center gap-2 pointer-events-auto cursor-pointer transform hover:scale-110 transition-transform">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Fuel className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">R$ 5,85</span>
                 </div>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border border-slate-100 overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/shell/100/100" alt="Shell" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800">Shell V-Power</h4>
                  <p className="text-[10px] text-muted-foreground truncate">Gasolina: R$ 5,79 • 1.2km</p>
                </div>
                <Button size="icon" className="rounded-full h-10 w-10">
                  <NavIcon className="w-4 h-4" />
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
