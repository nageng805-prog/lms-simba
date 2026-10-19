phimport { useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import DataTable from '../../components/tables/DataTable'
import { useAsync } from '../../hooks/useAsync'
import { teacherService } from '../../services'

const cols = [{ key: 'name', header: 'Nama' }, { key: 'email', header: 'Email' }, { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> }]
const keys = ['name', 'email']

export default function ClassDetailPage() {
  const { id } = useParams()
  const load = useCallback(() => teacherService.getClass(id), [id])
  const { data: c, loading, error, reload } = useAsync(load)
  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={reload} />
  if (!c) return <div className="card"><EmptyState title="Kelas tidak ditemukan" action={<Link className="btn-secondary" to="/teacher/classes">Kembali</Link>} /></div>
  return (
    <>
      <PageHeader title={c.name} description={`${c.subject} · Tahun ajaran ${c.year}`} breadcrumbs={[{ label: 'Beranda', to: '/teacher/dashboard' }, { label: 'Kelas', to: '/teacher/classes' }, { label: c.name }]} actions={<StatusBadge status={c.status} />} />
      <h2 className="mb-2 font-semibold">Siswa ({c.students.length})</h2>
      <DataTable columns={cols} rows={c.students} searchKeys={keys} searchPlaceholder="Cari siswa" />
      <h2 className="mb-2 mt-6 font-semibold">Materi kelas ini</h2>
      <div className="card p-4 text-sm">
        {c.materials.length === 0 ? <EmptyState title="Belum ada materi" /> : (
          <ul className="divide-y divide-slate-100">{c.materials.map((m) => <li key={m.id} className="flex items-center justify-between py-2"><Link className="text-brand-600 hover:underline" to={`/teacher/materials/${m.id}`}>{m.title}</Link><StatusBadge status={m.status} /></li>)}</ul>
        )}
      </div>
    </>
  )
}
