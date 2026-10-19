import TeacherLayout from '../layouts/TeacherLayout'
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import ClassesPage from '../pages/teacher/ClassesPage'
import ClassDetailPage from '../pages/teacher/ClassDetailPage'
import MaterialsPage from '../pages/teacher/MaterialsPage'
import MaterialFormPage from '../pages/teacher/MaterialFormPage'
import MaterialDetailPage from '../pages/teacher/MaterialDetailPage'
import PlaceholderPage from '../pages/PlaceholderPage'
import ProtectedRoute from './ProtectedRoute'
import { Navigate } from 'react-router-dom'

const ph = (t) => <PlaceholderPage title={t} />

export const teacherRoutes = {
  element: <ProtectedRoute role="teacher" />,
  children: [{
    path: '/teacher', element: <TeacherLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <TeacherDashboard /> },
      { path: 'classes', element: <ClassesPage /> },
      { path: 'classes/:id', element: <ClassDetailPage /> },
      { path: 'materials', element: <MaterialsPage /> },
      { path: 'materials/new', element: <MaterialFormPage /> },
      { path: 'materials/:id', element: <MaterialDetailPage /> },
      { path: 'materials/:id/edit', element: <MaterialFormPage /> },
      { path: 'assignments', element: ph('Tugas') },
      { path: 'grading', element: ph('Penilaian') },
      { path: 'schedule', element: ph('Jadwal') },
    ],
  }],
}
