export default function StatisticCard({ label, value, icon: Icon, hint }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      {Icon && <div className="rounded-lg bg-brand-50 p-3 text-brand-600"><Icon size={22} /></div>}
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        {hint && <p className="text-xs text-slate-400">{hint}</p>}
      </div>
    </div>
  )
}
