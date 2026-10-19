import { AlertTriangle } from 'lucide-react'

export default function ErrorState({ message = 'Terjadi kesalahan.', onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 p-10 text-center">
      <AlertTriangle className="text-red-500" size={36} />
      <p className="text-sm text-slate-600">{message}</p>
      {onRetry && <button className="btn-secondary" onClick={onRetry}>Coba lagi</button>}
    </div>
  )
}
