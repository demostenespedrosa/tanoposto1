"use client"

import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Map, Navigation as NavIcon, Search, DollarSign, Fuel, MapPin, Loader2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function NavigatorPage() {
  const [isSearching, setIsSearching] = useState(false)
  const [stations] = useState([
    { name: "Shell V-Power", distance: "2.4 km", routeSavings: "$4.50", price: "$5.10/L", rating: 4.8, active: true },
    { name: "Petrobras Podium", distance: "4.1 km", routeSavings: "$6.20", price: "$5.05/L", rating: 4.5, active: false },
    { name: "Ipiranga Pro", distance: "1.8 km", routeSavings: "$1.20", price: "$5.25/L", rating: 4.2, active: false },
  ])

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 1500)
  }

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-lg mx-auto space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Map className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-headline font-bold tracking-tighter">Navegador Inteligente</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-accent" /> Otimização de Rota Oktano
          </p>
        </div>
      </header>

      <div className="space-y-4">
        <div className="relative">
          <Input 
            className="pl-10 h-12 bg-secondary border-none focus-visible:ring-primary" 
            placeholder="Buscar destino ou rota..." 
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Button 
            onClick={handleSearch}
            className="absolute right-1 top-1 h-10 bg-primary text-primary-foreground font-bold"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "BUSCAR"}
          </Button>
        </div>

        <div className="relative h-64 w-full bg-secondary/30 rounded-2xl border border-border/50 overflow-hidden group">
          <img 
            src="https://picsum.photos/seed/oktano-map/1200/800" 
            alt="Map background" 
            className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all"
            data-ai-hint="dark map"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(122,92,255,0.8)]" />
          <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-accent rounded-full animate-bounce shadow-[0_0_15px_rgba(107,179,255,0.8)]" />
          
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className="bg-accent/90 text-accent-foreground font-bold tracking-widest text-[10px] uppercase">Melhor Rota Identificada</Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Análise de Economia</h2>
        <div className="space-y-3">
          {stations.map((station, i) => (
            <Card key={i} className={cn("bg-card transition-all border-l-4", station.active ? "border-l-accent border-border" : "border-l-transparent border-border/30 opacity-70")}>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">{station.name}</h3>
                    <Badge variant="outline" className="text-[8px] py-0 border-muted text-muted-foreground">{station.rating} ★</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {station.distance} 
                    <span className="text-primary font-bold">•</span>
                    <Fuel className="w-3 h-3" /> {station.price}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase font-bold text-accent tracking-widest">Economia Real</p>
                  <p className="text-lg font-headline font-bold text-accent">{station.routeSavings}</p>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] font-bold text-primary">
                    <NavIcon className="w-3 h-3 mr-1" /> IR
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Navigation />
    </main>
  )
}