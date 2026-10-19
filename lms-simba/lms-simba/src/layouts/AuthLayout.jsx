import { Outlet } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-brand-700"><GraduationCap size={32} /> LMS Simba</div>
        <div className="card p-6 sm:p-8"><Outlet /></div>
      </div>
    </div>
  )
}
