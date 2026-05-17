'use client'

import { AuthProvider } from '@/contexts/AuthProvider'
import { Toaster } from '@/components/ui/toaster'

interface RootLayoutClientProps {
  children: React.ReactNode
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  )
}
