'use client'

import { useState, useEffect } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Plus, 
  Store, 
  Search, 
  MapPin, 
  Clock, 
  Fuel, 
  Trash2, 
  Edit3, 
  ArrowLeft, 
  Loader2, 
  X,
  Navigation,
  ExternalLink,
  Settings2
} from 'lucide-react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, doc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { toast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

// Tipos
interface Station {
  id: string
  name: string
  address: string
  lat: string
  lng: string
  hours: string
  logo: string
  services: string[]
  prices: Record<string, { normal: string, discount: string }>
}

interface FuelType {
  id: string
  name: string
}

const SERVICES_OPTIONS = [
  "Calibrador de Pneus",
  "Troca de Óleo",
  "Conveniência",
  "Lava Jato",
  "Mecânica Rápida",
  "Restaurante"
]

export default function AdminStationsPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    lat: '',
    lng: '',
    hours: '',
    logo: '',
    services: [] as string[]
  })
  const [stationPrices, setStationPrices] = useState<Record<string, { normal: string, discount: string }>>({})

  const fetchData = async () => {
    try {
      setLoading(true)
      // Fetch Stations
      const stationsSnap = await getDocs(query(collection(db, 'stations'), orderBy('name')))
      setStations(stationsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Station[])

      // Fetch Fuel Types
      const fuelsSnap = await getDocs(query(collection(db, 'fuel_types'), orderBy('name')))
      setFuelTypes(fuelsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as FuelType[])
    } catch (error) {
      console.error(error)
      toast({ title: "Erro", description: "Houve um problema ao carregar dados.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'stations'), {
        ...formData,
        prices: stationPrices,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      toast({ title: "Sucesso", description: "Posto cadastrado com sucesso!" })
      setIsModalOpen(false)
      fetchData()
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao salvar posto.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este posto parceiro?")) return
    try {
      await deleteDoc(doc(db, 'stations', id))
      toast({ title: "Excluído", description: "Posto removido do sistema." })
      fetchData()
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao excluir.", variant: "destructive" })
    }
  }

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  return (
    <ProtectedRoute allowedRoles={['master-admin']}>
      <main className="min-h-screen bg-slate-50 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-6">
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50 hover:bg-slate-100 h-14 w-14">
                  <ArrowLeft className="w-6 h-6" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-headline font-bold text-slate-800 uppercase tracking-widest italic">Rede de Parceiros</h1>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Gerenciamento de Unidades Ativas
                </p>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-white font-bold h-14 px-8 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
              <Plus className="w-5 h-5 mr-3" /> NOVO POSTO PARCEIRO
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1,2,3].map(i => <div key={i} className="h-64 bg-white rounded-[2.5rem] animate-pulse" />)
            ) : stations.map(station => (
              <Card key={station.id} className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="w-16 min-w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 shadow-inner">
                      {station.logo ? <img src={station.logo} className="w-full h-full object-cover" /> : <Store className="w-8 h-8 text-slate-200" />}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(station.id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="pt-6">
                    <CardTitle className="text-xl font-bold text-slate-800">{station.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {station.address}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {station.services?.slice(0, 3).map(s => (
                      <Badge key={s} className="bg-slate-100 text-slate-500 border-none font-bold text-[8px] uppercase">{s}</Badge>
                    ))}
                    {station.services?.length > 3 && <Badge className="bg-slate-100 text-slate-400 border-none font-bold text-[8px] uppercase">+{station.services.length - 3}</Badge>}
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-2xl space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Principais Combustíveis</p>
                    <div className="space-y-2">
                      {Object.entries(station.prices || {}).slice(0, 2).map(([fuelId, prices]: any) => {
                        const fuelName = fuelTypes.find(f => f.id === fuelId)?.name || 'Combustível'
                        return (
                          <div key={fuelId} className="flex justify-between items-center text-xs">
                            <span className="font-bold text-slate-600">{fuelName}</span>
                            <div className="flex gap-3 font-mono">
                              <span className="text-slate-400 line-through">R${prices.normal}</span>
                              <span className="text-primary font-bold">R${prices.discount}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50">
                    <Edit3 className="w-4 h-4 mr-2" /> Editar Canal do Parceiro
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modal Giga de Cadastro */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
            <DialogHeader className="p-10 bg-slate-900 text-white shrink-0 relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex justify-between items-center">
                <div>
                  <DialogTitle className="text-3xl font-headline font-bold text-white tracking-widest italic uppercase">Integração de Novo Posto</DialogTitle>
                  <DialogDescription className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Formulário de Engenharia de Parceiros</DialogDescription>
                </div>
                <div className="p-4 bg-primary/20 rounded-2xl border border-primary/30">
                  <Store className="w-8 h-8 text-primary" />
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-10 py-8 space-y-10 custom-scrollbar">
              {/* Informações Básicas */}
              <div className="space-y-6">
                 <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-3">
                   <Settings2 className="w-4 h-4" /> Dados Cadastrais
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Logo / URL da Imagem</Label>
                      <Input placeholder="https://..." value={formData.logo} onChange={e => setFormData(p => ({...p, logo: e.target.value}))} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Nome Fantasia do Posto</Label>
                      <Input placeholder="Ex: Posto Premium Ipiranga" required value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Endereço Completo</Label>
                      <Input placeholder="Rua, Número, Bairro, Cidade - UF" required value={formData.address} onChange={e => setFormData(p => ({...p, address: e.target.value}))} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1 text-blue-500">Coordenada Latitude</Label>
                      <div className="relative">
                        <Input placeholder="-23.456..." required value={formData.lat} onChange={e => setFormData(p => ({...p, lat: e.target.value}))} className="pl-10" />
                        <MapPin className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1 text-blue-500">Coordenada Longitude</Label>
                      <div className="relative">
                        <Input placeholder="-46.789..." required value={formData.lng} onChange={e => setFormData(p => ({...p, lng: e.target.value}))} className="pl-10" />
                        <MapPin className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Horário de Funcionamento</Label>
                      <div className="relative">
                        <Input placeholder="24h ou 06h às 22h" required value={formData.hours} onChange={e => setFormData(p => ({...p, hours: e.target.value}))} className="pl-10" />
                        <Clock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                    <div className="flex items-end">
                       <Button type="button" variant="outline" className="w-full rounded-xl h-10 border-blue-100 text-blue-600 bg-blue-50/30 font-bold text-[10px] uppercase tracking-wider hover:bg-blue-50"
                         onClick={() => window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(formData.address)}`, '_blank')}
                       >
                         <Navigation className="w-4 h-4 mr-2" /> Localizar no OpenStreetMap <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                       </Button>
                    </div>
                 </div>
              </div>

              {/* Serviços */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Serviços Disponíveis</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {SERVICES_OPTIONS.map(service => (
                    <div key={service} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                      <Checkbox id={service} checked={formData.services.includes(service)} onCheckedChange={() => toggleService(service)} className="rounded-md h-5 w-5" />
                      <label htmlFor={service} className="text-xs font-bold text-slate-600 cursor-pointer">{service}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Combustíveis e Preços */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-3">
                     <Fuel className="w-4 h-4" /> Tabela de Preços (Operacional)
                   </h3>
                   <Link href="/admin/fuels" target="_blank">
                     <Button type="button" variant="ghost" className="text-[10px] text-slate-400 font-bold underline">CADASTRAR NOVO COMBUSTÍVEL</Button>
                   </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {fuelTypes.map((fuel) => (
                    <div key={fuel.id} className="space-y-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <p className="font-bold text-slate-800 uppercase text-xs tracking-wider">{fuel.name}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[9px] font-bold uppercase text-slate-400">Normal (R$)</Label>
                          <Input 
                            type="number" step="0.001" placeholder="5.999"
                            onChange={(e) => setStationPrices(prev => ({
                              ...prev,
                              [fuel.id]: { ...prev[fuel.id], normal: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="space-y-2 border-l border-slate-200 pl-4">
                          <Label className="text-[9px] font-bold font-primary uppercase text-primary">APP (R$)</Label>
                          <Input 
                            type="number" step="0.001" placeholder="5.799"
                            className="border-primary/30 focus-visible:ring-primary shadow-sm shadow-primary/5"
                            onChange={(e) => setStationPrices(prev => ({
                              ...prev,
                              [fuel.id]: { ...prev[fuel.id], discount: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {fuelTypes.length === 0 && (
                    <div className="col-span-2 p-10 bg-orange-50 rounded-2xl border border-orange-100 text-center">
                      <p className="text-orange-600 font-bold text-sm uppercase">Nenhum combustível ativo no sistema.</p>
                      <p className="text-orange-500/70 text-[10px] mt-1 font-medium">Cadastre os tipos primeiro para definir os preços aqui.</p>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="pt-6 shrink-0 bg-slate-50 p-8 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl h-14 font-bold uppercase text-[10px] tracking-widest text-slate-400">
                  DESCARTAR
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white font-bold h-14 px-10 rounded-2xl shadow-xl hover:bg-black transition-all">
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "FINALIZAR INTEGRAÇÃO E ATIVAR POSTO"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </main>
    </ProtectedRoute>
  )
}
