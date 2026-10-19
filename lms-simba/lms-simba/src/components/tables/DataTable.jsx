import { useMemo, useState } from 'react'
import SearchBar from '../forms/SearchBar'
import Pagination from './Pagination'
import EmptyState from '../common/EmptyState'

// columns: [{ key, header, render?(row) }]. Pencarian & paginasi dilakukan di sisi klien (mock).
export default function DataTable({ columns, rows, pageSize = 5, searchKeys = [], searchPlaceholder }) {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? rows.filter((r) => searchKeys.some((k) => String(r[k]).toLowerCase().includes(s))) : rows
  }, [rows, q, searchKeys])
  const totalPages = Math.ceil(filtered.length / pageSize)
  const current = Math.min(page, Math.max(totalPages, 1))
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize)

  return (
    <div className="card overflow-hidden">
      {searchKeys.length > 0 && (
        <div className="border-b border-slate-200 p-4">
          <SearchBar value={q} onChange={(v) => { setQ(v); setPage(1) }} placeholder={searchPlaceholder} />
        </div>
      )}
      {visible.length === 0 ? <EmptyState title="Data tidak ditemukan" description="Coba kata kunci lain." /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>{columns.map((c) => <th key={c.key} className="px-4 py-3 font-medium">{c.header}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  {columns.map((c) => <td key={c.key} className="px-4 py-3">{c.render ? c.render(r) : r[c.key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={current} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
