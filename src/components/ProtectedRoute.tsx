'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import type { UserRole } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, userRole, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login')
        return
      }

      if (userRole && !allowedRoles.includes(userRole)) {
        // Redirect to the correct module for this role
        const roleToRoute: Record<UserRole, string> = {
          'cliente': '/client',
          'frentista': '/frentista',
          'admin-posto': '/admin-posto',
          'admin-empresa': '/admin-empresa',
          'master-admin': '/admin',
        }
        router.replace(roleToRoute[userRole])
      }
    }
  }, [isAuthenticated, userRole, loading, router, allowedRoles])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 font-medium">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (userRole && !allowedRoles.includes(userRole)) {
    return null
  }

  return <>{children}</>
}
