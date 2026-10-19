import { createContext, useContext, useState, useCallback } from 'react'
import { authService } from '../services'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.currentUser())
  const login = useCallback(async (creds) => {
    const u = await authService.login(creds)
    setUser(u)
    return u
  }, [])
  const logout = useCallback(() => { authService.logout(); setUser(null) }, [])
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
