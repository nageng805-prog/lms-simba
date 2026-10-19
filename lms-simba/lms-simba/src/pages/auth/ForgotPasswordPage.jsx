import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import FormField from '../../components/forms/FormField'
import { authService } from '../../services'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (ev) => {
    ev.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Masukkan alamat email yang valid.')
    setError(''); setLoading(true)
    await authService.requestPasswordReset(email)
    setLoading(false); setSent(true)
  }

  return (
    <div className="space-y-4">
      <div><h1 className="text-xl font-bold">Lupa kata sandi</h1><p className="text-sm text-slate-500">Masukkan email akun Anda.</p></div>
      {sent ? (
        <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          Mode simulasi: permintaan hanya dicatat di antarmuka. Tidak ada email yang dikirim dan kata sandi belum diubah. Fitur ini aktif setelah backend terhubung.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <FormField label="Email" id="email" error={error}>
            <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormField>
          <button className="btn-primary w-full" disabled={loading}>{loading && <Loader2 size={16} className="animate-spin" />} Kirim permintaan reset</button>
        </form>
      )}
      <Link to="/login" className="flex items-center justify-center gap-1 text-sm text-brand-600 hover:underline"><ArrowLeft size={14} /> Kembali ke login</Link>
    </div>
  )
}
