'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Fuel, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { UserRole } from '@/contexts/AuthContext'

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState<UserRole>('cliente')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não conferem.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)

    try {
      setPersistence(auth, browserLocalPersistence)

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update profile
      await updateProfile(user, {
        displayName: displayName || 'Usuário',
      })

      // Create Firestore user document
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: displayName || 'Usuário',
        photoURL: null,
        role: role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      router.push('/')
    } catch (err: any) {
      const errorCode = err?.code || 'unknown'
      if (errorCode === 'auth/email-already-in-use') {
        setError('Este email já está cadastrado.')
      } else if (errorCode === 'auth/weak-password') {
        setError('A senha é muito fraca.')
      } else if (errorCode === 'auth/invalid-email') {
        setError('Email inválido.')
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary rounded-[2rem] shadow-2xl shadow-primary/20">
              <Fuel className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-headline font-bold text-slate-800 tracking-tight">
            Tá no Posto
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Crie sua conta para começar
          </p>
        </div>

        <Card className="border-none shadow-lg bg-white">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Criar Conta</CardTitle>
            <CardDescription>Preencha os dados abaixo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold text-slate-700">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={loading}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-slate-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-bold text-slate-700">
                  Tipo de Usuário
                </Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente (Motorista)</SelectItem>
                    <SelectItem value="frentista">Frentista (Operacional)</SelectItem>
                    <SelectItem value="admin-posto">Gerente de Posto</SelectItem>
                    <SelectItem value="admin-empresa">Admin Corporativo</SelectItem>
                    <SelectItem value="master-admin">Master Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-bold text-slate-700">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-sm font-bold text-slate-700">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="rounded-lg"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  'Criar Conta'
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-600 font-medium">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-primary font-bold hover:underline">
                Fazer login
              </Link>
            </p>
          </CardContent>
        </Card>

        <Link href="/login" className="flex items-center justify-center text-primary font-bold text-sm hover:underline gap-1">
          <ArrowLeft className="w-4 h-4" />
          Voltar para login
        </Link>
      </div>
    </main>
  )
}
