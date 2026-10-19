import AdminLayout from '../layouts/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProtectedRoute from './ProtectedRoute'
import { createRoleRoutes } from './createRoleRoutes'

export const adminRoutes = {
  element: <ProtectedRoute role="admin" />,
  children: [{ path: '/admin', element: <AdminLayout />, children: createRoleRoutes('admin', <AdminDashboard />) }],
}
