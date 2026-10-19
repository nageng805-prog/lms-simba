import { request } from './http'
import { users } from '../data/users'

const KEY = 'simba_mock_session'

export const authService = {
  async login({ identifier, password }) {
    return request(() => {
      const id = identifier.trim().toLowerCase()
      const u = users.find((x) => (x.email === id || x.username === id) && x.password === password)
      if (!u) throw new Error('Email/username atau kata sandi salah.')
      if (u.status !== 'active') throw new Error('Akun tidak aktif. Hubungi administrator.')
      const { password: _p, ...safe } = u
      localStorage.setItem(KEY, JSON.stringify(safe))
      return safe
    })
  },
  logout() { localStorage.removeItem(KEY) },
  currentUser() {
    try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null }
  },
  // Simulasi saja: tidak ada email yang dikirim dan tidak ada reset di server.
  async requestPasswordReset() { return request(() => ({ simulated: true })) },
}
