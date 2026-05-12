import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

function decodeUsername(token) {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return decoded.sub || decoded.username || 'User'
  } catch {
    return 'User'
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('access_token'))
  const [username, setUsername] = useState(() => {
    const stored = sessionStorage.getItem('access_token')
    return stored ? decodeUsername(stored) : null
  })

  const login = useCallback((accessToken) => {
    sessionStorage.setItem('access_token', accessToken)
    setToken(accessToken)
    setUsername(decodeUsername(accessToken))
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('access_token')
    setToken(null)
    setUsername(null)
  }, [])

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
