import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

const styles = {
  success: ['border-emerald-200 bg-emerald-50 text-emerald-800', CheckCircle2],
  error: ['border-red-200 bg-red-50 text-red-800', AlertCircle],
  info: ['border-brand-100 bg-brand-50 text-brand-700', Info],
}

export default function ToastNotification({ message, type = 'info', onClose }) {
  const [cls, Icon] = styles[type] ?? styles.info
  return (
    <div role="status" className={`flex items-start gap-2 rounded-lg border p-3 text-sm shadow-card ${cls}`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <p className="flex-1">{message}</p>
      <button onClick={onClose} aria-label="Tutup notifikasi"><X size={16} /></button>
    </div>
  )
}
