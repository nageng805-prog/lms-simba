import StudentLayout from '../layouts/StudentLayout'
import StudentDashboard from '../pages/student/StudentDashboard'
import ProtectedRoute from './ProtectedRoute'
import { createRoleRoutes } from './createRoleRoutes'

export const studentRoutes = {
  element: <ProtectedRoute role="student" />,
  children: [{ path: '/student', element: <StudentLayout />, children: createRoleRoutes('student', <StudentDashboard />) }],
}
