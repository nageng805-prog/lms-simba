const map = {
  active: ['Aktif', 'bg-emerald-100 text-emerald-700'],
  inactive: ['Nonaktif', 'bg-slate-200 text-slate-600'],
  pending: ['Menunggu', 'bg-amber-100 text-amber-700'],
  open: ['Dibuka', 'bg-brand-100 text-brand-700'],
  draft: ['Draft', 'bg-slate-200 text-slate-600'],
  published: ['Dipublikasikan', 'bg-emerald-100 text-emerald-700'],
  finished: ['Selesai', 'bg-slate-200 text-slate-600'],
  submitted: ['Terkirim', 'bg-emerald-100 text-emerald-700'],
}

export default function StatusBadge({ status }) {
  const [label, cls] = map[status] ?? [status, 'bg-slate-100 text-slate-600']
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>{label}</span>
}
