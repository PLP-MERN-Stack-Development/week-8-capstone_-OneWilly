"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "user" | "broker" | "admin"
  subscriptionStatus: "free" | "active" | "expired"
  subscriptionExpiry?: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

interface SocketContextType {
  socket: Socket | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000")
    setSocket(newSocket)

    // Check for existing session
    const token = localStorage.getItem("token")
    if (token) {
      // Validate token and get user data
      fetchUser(token)
    } else {
      setIsLoading(false)
    }

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        localStorage.removeItem("token")
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const { token, user: userData } = await response.json()
    localStorage.setItem("token", token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) throw new Error("useSocket must be used within SocketProvider")
  return context
}
