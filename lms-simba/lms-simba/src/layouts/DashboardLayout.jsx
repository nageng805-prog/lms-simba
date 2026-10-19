import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'
import ConfirmationDialog from '../components/common/ConfirmationDialog'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { navigation } from '../routes/navigation'

// Layout dasar bersama; layout per role hanya menentukan role-nya.
export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)

  return (
    <div className="min-h-screen">
      <Sidebar items={navigation[role]} basePath={`/${role}`} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-64">
        <Navbar user={user} onMenu={() => setMenuOpen(true)} onLogout={() => setConfirmLogout(true)}
          onNotifications={() => notify('Tidak ada notifikasi baru.', 'info')} />
        <main className="p-4 lg:p-8"><Outlet /></main>
      </div>
      <ConfirmationDialog open={confirmLogout} title="Keluar dari LMS Simba?" message="Sesi Anda akan diakhiri."
        confirmLabel="Keluar" onCancel={() => setConfirmLogout(false)}
        onConfirm={() => { logout(); navigate('/login') }} />
    </div>
  )
}
