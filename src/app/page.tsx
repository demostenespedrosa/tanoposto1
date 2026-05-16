
"use client"

import { useEffect, useState } from "react"
import { QuickAction } from "@/components/QuickAction"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Fuel, MapPin, Wallet, Gift, User, Bell, Search, Star, TrendingDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0)
  
  const banners = [
    { id: 1, img: "https://picsum.photos/seed/promo1/800/400", title: "Cashback em Dobro!", desc: "Abasteça hoje e ganhe 10%" },
    { id: 2, img: "https://picsum.photos/seed/promo2/800/400", title: "Café Grátis", desc: "Na compra de 30L de V-Power" },
    { id: 3, img: "https://picsum.photos/seed/promo3/800/400", title: "Indique e Ganhe", desc: "R$ 10 para cada amigo que usar" },
  ]

  const nearbyStations = [
    { id: 1, name: "Posto Shell - Centro", dist: "1.2 km", price: "R$ 5,79", logo: "https://picsum.photos/seed/shell/100/100" },
    { id: 2, name: "Ipiranga - Av. Brasil", dist: "2.5 km", price: "R$ 5,85", logo: "https://picsum.photos/seed/ipiranga/100/100" },
    { id: 3, name: "Petrobras - Lagoa", dist: "3.8 km", price: "R$ 5,75", logo: "https://picsum.photos/seed/br/100/100" },
    { id: 4, name: "Shell - Aeroporto", dist: "5.0 km", price: "R$ 5,99", logo: "https://picsum.photos/seed/shell2/100/100" },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50">
      <div className="max-w-lg mx-auto px-4 space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              J
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Bem-vindo de volta,</p>
              <h2 className="font-bold text-slate-800">João Silva</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
              <Bell className="w-5 h-5 text-slate-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
              <Search className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </header>

        {/* Saldo e Pontos */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <div className="p-2 bg-green-50 rounded-full mb-1">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Economizado</p>
              <p className="text-xl font-headline font-bold text-slate-800">R$ 124,50</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <div className="p-2 bg-yellow-50 rounded-full mb-1">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Meus Pontos</p>
              <p className="text-xl font-headline font-bold text-slate-800">12.450</p>
            </CardContent>
          </Card>
        </div>

        {/* Banners Carrossel */}
        <Carousel className="w-full">
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative h-44 w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image 
                    src={banner.img} 
                    alt={banner.title} 
                    fill 
                    className="object-cover"
                    data-ai-hint="gas station"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg">{banner.title}</h3>
                    <p className="text-white/80 text-xs">{banner.desc}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Atalhos Rápidos */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Fuel, label: "Abastecer", color: "bg-green-50 text-primary", href: "#" },
            { icon: MapPin, label: "Postos", color: "bg-blue-50 text-blue-500", href: "/stations" },
            { icon: Gift, label: "Cupons", color: "bg-purple-50 text-purple-500", href: "/coupons" },
            { icon: Wallet, label: "Extrato", color: "bg-orange-50 text-orange-500", href: "/wallet" },
          ].map((item, i) => (
            <Link key={i} href={item.href} className="flex flex-col items-center gap-2">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform hover:scale-105", item.color)}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Postos Próximos */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Postos Próximos</h3>
            <Link href="/stations" className="text-xs font-bold text-primary">Ver todos</Link>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 pb-4">
              {nearbyStations.map((posto) => (
                <Card key={posto.id} className="w-48 border-none shadow-sm bg-white overflow-hidden shrink-0">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-slate-100 overflow-hidden relative">
                        <Image src={posto.logo} alt={posto.name} fill className="object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-slate-800 truncate">{posto.name}</h4>
                        <p className="text-[10px] text-muted-foreground">{posto.dist}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                      <span className="text-[10px] text-muted-foreground font-medium uppercase">Gasolina</span>
                      <span className="text-sm font-bold text-primary">{posto.price}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

      </div>

      <QuickAction />
      <Navigation />
    </main>
  )
}
