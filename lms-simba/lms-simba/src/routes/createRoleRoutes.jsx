import { Navigate } from 'react-router-dom'
import PlaceholderPage from '../pages/PlaceholderPage'
import { navigation } from './navigation'

// Membuat rute anak untuk satu role dari konfigurasi navigasi.
export function createRoleRoutes(role, dashboardElement) {
  const children = navigation[role].map((n) => ({
    path: n.path,
    element: n.ready ? dashboardElement : <PlaceholderPage title={n.label} />,
  }))
  return [{ index: true, element: <Navigate to="dashboard" replace /> }, ...children]
}
