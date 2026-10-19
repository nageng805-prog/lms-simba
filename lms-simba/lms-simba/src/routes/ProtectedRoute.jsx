import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Pengecekan di sisi klien hanya untuk UX; otorisasi sebenarnya wajib di backend Laravel.
export default function ProtectedRoute({ role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) return <Navigate to="/403" replace />
  return <Outlet />
}
