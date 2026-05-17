import { createContext } from 'react'
import type { User } from 'firebase/auth'

export type UserRole = 'cliente' | 'frentista' | 'admin-posto' | 'admin-empresa' | 'master-admin'

export interface AuthContextType {
  currentUser: User | null
  userRole: UserRole | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
