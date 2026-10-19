import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import FormField from '../../components/forms/FormField'
import { useAuth } from '../../contexts/AuthContext'
import { roleHome } from '../../utils/format'

export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ identifier: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to={roleHome[user.role]} replace />

  const validate = () => {
    const e = {}
    if (!form.identifier.trim()) e.identifier = 'Email atau username wajib diisi.'
    if (!form.password) e.password = 'Kata sandi wajib diisi.'
    else if (form.password.length < 6) e.password = 'Kata sandi minimal 6 karakter.'
    return e
  }
  const submit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e); setServerError('')
    if (Object.keys(e).length) return
    setLoading(true)
    try {
      const u = await login(form)
      navigate(roleHome[u.role], { replace: true })
    } catch (err) { setServerError(err.message) } finally { setLoading(false) }
  }
  const set = (k) => (ev) => setForm((f) => ({ ...f, [k]: ev.target.value }))

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div><h1 className="text-xl font-bold">Masuk</h1><p className="text-sm text-slate-500">Gunakan akun LMS Anda.</p></div>
      {serverError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
      <FormField label="Email atau username" id="identifier" error={errors.identifier}>
        <input id="identifier" className="input" value={form.identifier} onChange={set('identifier')} autoComplete="username" />
      </FormField>
      <FormField label="Kata sandi" id="password" error={errors.password}>
        <div className="relative">
          <input id="password" className="input pr-10" type={show ? 'text' : 'password'} value={form.password} onChange={set('password')} autoComplete="current-password" />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </FormField>
      <div className="text-right text-sm"><Link to="/forgot-password" className="text-brand-600 hover:underline">Lupa kata sandi?</Link></div>
      <button className="btn-primary w-full" disabled={loading}>{loading && <Loader2 size={16} className="animate-spin" />} Masuk</button>
      <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
        <p className="mb-1 font-medium">Akun demo (data simulasi):</p>
        <p>admin / admin123 · guru / guru123 · siswa / siswa123</p>
      </div>
    </form>
  )
}
