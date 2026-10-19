import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import SearchBar from '../../components/forms/SearchBar'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import { useAsync } from '../../hooks/useAsync'
import { teacherService } from '../../services'

export default function ClassesPage() {
  const { data, loading, error, reload } = useAsync(teacherService.listClasses)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const rows = useMemo(() => (data ?? []).filter((c) =>
    (status === 'all' || c.status === status) && `${c.name} ${c.subject}`.toLowerCase().includes(q.toLowerCase())), [data, q, status])
  return (
    <>
      <PageHeader title="Kelas Saya" breadcrumbs={[{ label: 'Beranda', to: '/teacher/dashboard' }, { label: 'Kelas' }]} />
      <div className="mb-4 flex flex-wrap gap-3">
        <SearchBar value={q} onChange={setQ} placeholder="Cari kelas atau mapel" />
        <select className="input w-auto" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter status">
          <option value="all">Semua status</option><option value="active">Aktif</option><option value="finished">Selesai</option>
        </select>
      </div>
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : rows.length === 0 ? <div className="card"><EmptyState title="Kelas tidak ditemukan" /></div> : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((c) => (
            <Link key={c.id} to={`/teacher/classes/${c.id}`} className="card p-5 transition hover:border-brand-500">
              <div className="flex items-start justify-between"><h2 className="font-semibold">{c.name}</h2><StatusBadge status={c.status} /></div>
              <p className="mt-1 text-sm text-slate-500">{c.subject} · {c.year}</p>
              <p className="mt-3 text-sm">{c.students.length} siswa</p>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
