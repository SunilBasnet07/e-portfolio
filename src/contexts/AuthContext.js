'use client'
import { createContext, useContext, useState, useEffect } from 'react'

// Create the authentication context
const AuthContext = createContext()

// Authentication provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Client-side code
    setIsMounted(true)
    
    // Check if user is logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const userEmail = localStorage.getItem('userEmail')
    
    if (isLoggedIn === 'true' && userEmail) {
      setUser({ email: userEmail })
    }
    
    setIsLoading(false)
  }, [])

  // Login function
  const login = (email) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', email)
    }
    setUser({ email })
  }

  // Logout function
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userEmail')
    }
    setUser(null)
    window.location.href = '/'
  }

  // Provide a default value during server-side rendering
  if (!isMounted) {
    return (
      <AuthContext.Provider value={{ 
        user: null, 
        isAuthenticated: false, 
        isLoading: true,
        login,
        logout
      }}>
        {children}
      </AuthContext.Provider>
    )
  }

  // Context value
  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 