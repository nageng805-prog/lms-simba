import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'Belum ada data', description, action }) {
  return (
    <div className="flex flex-col items-center gap-2 p-10 text-center">
      <Inbox className="text-slate-400" size={36} />
      <h3 className="font-semibold text-slate-700">{title}</h3>
      {description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
      {action}
    </div>
  )
}
