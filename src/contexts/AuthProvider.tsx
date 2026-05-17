'use client'

import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider } from '@/lib/firebase'
import { AuthContext, type UserRole } from './AuthContext'
import type { User } from 'firebase/auth'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(console.error)

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)
        try {
          const userDocRef = doc(db, 'users', user.uid)
          const userDocSnap = await getDoc(userDocRef)

          if (userDocSnap.exists()) {
            setUserRole(userDocSnap.data().role as UserRole)
          }
        } catch (error) {
          console.error('Error fetching user role:', error)
          setUserRole(null)
        }
      } else {
        setCurrentUser(null)
        setUserRole(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  async function login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password)

    const userDocRef = doc(db, 'users', result.user.uid)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      setUserRole(userDocSnap.data().role as UserRole)
    }
  }

  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    const userDocRef = doc(db, 'users', user.uid)
    const userDocSnap = await getDoc(userDocRef)

    if (!userDocSnap.exists()) {
      // New user via Google - default to 'cliente'
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'cliente',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      setUserRole('cliente')
    } else {
      setUserRole(userDocSnap.data().role as UserRole)
    }
  }

  async function logout() {
    await signOut(auth)
    setCurrentUser(null)
    setUserRole(null)
  }

  const value = {
    currentUser,
    userRole,
    loading,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!currentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
