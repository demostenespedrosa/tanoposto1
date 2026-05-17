'use client'

import { useState, useEffect } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Fuel, ArrowLeft, Loader2, Search } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { toast } from '@/hooks/use-toast'

interface FuelType {
  id: string
  name: string
  category: string // e.g., 'Gasolina', 'Etanol', 'Diesel'
}

export default function AdminFuelsPage() {
  const [fuels, setFuels] = useState<FuelType[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('Gasolina')

  const fetchFuels = async () => {
    try {
      const q = query(collection(db, 'fuel_types'), orderBy('name'))
      const querySnapshot = await getDocs(q)
      const fuelsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FuelType[]
      setFuels(fuelsList)
    } catch (error) {
      console.error("Error fetching fuels:", error)
      toast({ title: "Erro", description: "Não foi possível carregar os combustíveis.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFuels()
  }, [])

  const handleAddFuel = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName) return

    setIsAdding(true)
    try {
      await addDoc(collection(db, 'fuel_types'), {
        name: newName,
        category: newCategory,
        createdAt: serverTimestamp()
      })
      setNewName('')
      toast({ title: "Sucesso", description: "Combustível cadastrado com sucesso!" })
      fetchFuels()
    } catch (error) {
      console.error("Error adding fuel:", error)
      toast({ title: "Erro", description: "Erro ao cadastrar combustível.", variant: "destructive" })
    } finally {
      setIsAdding(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este combustível?")) return

    try {
      await deleteDoc(doc(db, 'fuel_types', id))
      toast({ title: "Excluído", description: "Combustível removido." })
      fetchFuels()
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível excluir.", variant: "destructive" })
    }
  }

  return (
    <ProtectedRoute allowedRoles={['master-admin']}>
      <main className="min-h-screen bg-slate-50 p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-headline font-bold text-slate-800 uppercase tracking-widest">Tipos de Combustíveis</h1>
                <p className="text-sm text-slate-500 font-medium">Gerencie o catálogo global de produtos</p>
              </div>
            </div>
            <Fuel className="w-8 h-8 text-primary opacity-20" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Formulário de Cadastro */}
            <Card className="md:col-span-5 border-none shadow-xl bg-white rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-lg font-bold uppercase tracking-wider">Novo Cadastro</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddFuel} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Combustível</Label>
                    <Input 
                      id="name" 
                      placeholder="Ex: Gasolina Aditivada" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria Base</Label>
                    <select 
                      id="category"
                      className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    >
                      <option value="Gasolina">Gasolina</option>
                      <option value="Etanol">Etanol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="GNV">GNV</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-xl font-bold" disabled={isAdding}>
                    {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> CADASTRAR</>}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Listagem */}
            <Card className="md:col-span-7 border-none shadow-xl bg-white rounded-[2rem] overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold uppercase tracking-wider text-slate-400">Catálogo Ativo</CardTitle>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <Input placeholder="Buscar..." className="pl-9 h-8 w-40 bg-white text-xs border-none shadow-sm rounded-lg" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-200" /></div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {fuels.map((fuel) => (
                      <div key={fuel.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/5 text-primary rounded-lg">
                            <Fuel className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{fuel.name}</p>
                            <Badge variant="outline" className="text-[9px] font-bold py-0 h-4 border-slate-200 text-slate-400 uppercase">{fuel.category}</Badge>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl"
                          onClick={() => handleDelete(fuel.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {fuels.length === 0 && (
                      <p className="p-10 text-center text-sm text-slate-400 font-medium">Nenhum combustível cadastrado.</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
