'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, userRole, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login')
        return
      }

      // Redirect based on user role
      const roleToRoute = {
        'cliente': '/client',
        'frentista': '/frentista',
        'admin-posto': '/admin-posto',
        'admin-empresa': '/admin-empresa',
        'master-admin': '/admin',
      }

      if (userRole && userRole in roleToRoute) {
        router.replace(roleToRoute[userRole as keyof typeof roleToRoute])
      }
    }
  }, [isAuthenticated, userRole, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 font-medium">Redirecionando...</p>
      </div>
    </div>
  )
}
