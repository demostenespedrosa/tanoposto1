"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Fuel, MapPin, Wallet, Gift, Bell, Search, Star, TrendingDown, Building2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Home() {
  const banners = [
    { id: 1, img: "https://picsum.photos/seed/promo1/800/400", title: "Cashback em Dobro!", desc: "Abasteça hoje e ganhe 10%" },
    { id: 2, img: "https://picsum.photos/seed/promo2/800/400", title: "Benefício Corporativo", desc: "Sua empresa agora recarrega seu Vale aqui" },
    { id: 3, img: "https://picsum.photos/seed/promo3/800/400", title: "Indique e Ganhe", desc: "Ganhe R$ 10 de saldo em cada indicação" },
  ]

  const nearbyStations = [
    { id: 1, name: "Posto Shell - Centro", dist: "1.2 km", price: "R$ 5,79", logo: "https://picsum.photos/seed/shell/100/100" },
    { id: 2, name: "Ipiranga - Av. Brasil", dist: "2.5 km", price: "R$ 5,85", logo: "https://picsum.photos/seed/ipiranga/100/100" },
    { id: 3, name: "Petrobras - Lagoa", dist: "3.8 km", price: "R$ 5,75", logo: "https://picsum.photos/seed/br/100/100" },
  ]

  return (
    <main className="min-h-screen pb-32 pt-6 bg-slate-50">
      <div className="max-w-lg mx-auto px-4 space-y-6">
        
        {/* Header Amigável */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="font-bold text-xl">JS</span>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Olá, João Silva</p>
              <h2 className="font-bold text-slate-800">Bom dia! 🚗</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm border border-slate-100">
              <Bell className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </header>

        {/* Resumo de Economia e Pontos */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-none shadow-md bg-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <TrendingDown className="w-12 h-12 text-primary" />
            </div>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <div className="p-2 bg-green-50 rounded-full mb-1">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Já economizei</p>
              <p className="text-xl font-headline font-bold text-slate-800">R$ 1.240,50</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-2 opacity-5">
              <Star className="w-12 h-12 text-yellow-500" />
            </div>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <div className="p-2 bg-yellow-50 rounded-full mb-1">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Meus Pontos</p>
              <p className="text-xl font-headline font-bold text-slate-800">12.450</p>
            </CardContent>
          </Card>
        </div>

        {/* Banners de Publicidade/Benefícios */}
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative h-48 w-full rounded-[2rem] overflow-hidden shadow-lg group">
                  <Image 
                    src={banner.img} 
                    alt={banner.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint="gas station advertisement"
                  />
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
              {nearbyStations.map((posto) => (
                <Card key={posto.id} className="w-56 border-none shadow-md bg-white overflow-hidden shrink-0 hover:shadow-lg transition-shadow">
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl border border-slate-100 overflow-hidden relative shrink-0">
                        <Image src={posto.logo} alt={posto.name} fill className="object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-sm font-bold text-slate-800 truncate">{posto.name}</h4>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {posto.dist}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                      <div className="space-y-0.5">
                        <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest">Gasolina</p>
                        <p className="text-base font-headline font-bold text-primary">{posto.price}</p>
                      </div>
                      <Button size="sm" className="h-8 rounded-lg bg-slate-900 text-white font-bold text-[10px]">VER PREÇOS</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

      </div>

      <Navigation />
    </main>
  )
}
