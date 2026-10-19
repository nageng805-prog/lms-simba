import { Navigate, useRoutes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import LoginPage from '../pages/auth/LoginPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import { ForbiddenPage, NotFoundPage } from '../pages/errors/ErrorPage'
import { studentRoutes } from './studentRoutes'
import { teacherRoutes } from './teacherRoutes'
import { adminRoutes } from './adminRoutes'

export default function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Navigate to="/login" replace /> },
    { element: <AuthLayout />, children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ] },
    studentRoutes, teacherRoutes, adminRoutes,
    { path: '/403', element: <ForbiddenPage /> },
    { path: '*', element: <NotFoundPage /> },
  ])
}
