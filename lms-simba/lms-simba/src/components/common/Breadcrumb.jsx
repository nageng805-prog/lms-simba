import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} />}
          {it.to && i < items.length - 1 ? <Link to={it.to} className="hover:text-brand-600">{it.label}</Link> : <span className="font-medium text-slate-700">{it.label}</span>}
        </span>
      ))}
    </nav>
  )
}
