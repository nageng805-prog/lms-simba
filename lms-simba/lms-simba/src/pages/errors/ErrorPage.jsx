import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { roleHome } from '../../utils/format'

function ErrorPage({ code, title, text }) {
  const { user } = useAuth()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="text-6xl font-extrabold text-brand-600">{code}</p>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="max-w-sm text-sm text-slate-500">{text}</p>
      <Link className="btn-primary" to={user ? roleHome[user.role] : '/login'}>{user ? 'Ke dashboard' : 'Ke halaman login'}</Link>
    </div>
  )
}
export const ForbiddenPage = () => <ErrorPage code="403" title="Akses ditolak" text="Anda tidak memiliki izin untuk membuka halaman ini." />
export const NotFoundPage = () => <ErrorPage code="404" title="Halaman tidak ditemukan" text="Alamat yang Anda tuju tidak tersedia." />
