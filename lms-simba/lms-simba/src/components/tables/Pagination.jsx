import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
      <span>Halaman {page} dari {Math.max(totalPages, 1)}</span>
      <div className="flex gap-2">
        <button className="btn-secondary px-2" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Sebelumnya"><ChevronLeft size={16} /></button>
        <button className="btn-secondary px-2" disabled={page >= totalPages} onClick={() => onChange(page + 1)} aria-label="Berikutnya"><ChevronRight size={16} /></button>
      </div>
    </div>
  )
}
