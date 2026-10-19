import { useCallback, useState } from 'react'
import { Users, School, BookOpen } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import StatisticCard from '../../components/common/StatisticCard'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import StatusBadge from '../../components/common/StatusBadge'
import Modal from '../../components/common/Modal'
import DataTable from '../../components/tables/DataTable'
import { useAsync } from '../../hooks/useAsync'
import { userService, classService, subjectService } from '../../services'
import { roleLabel } from '../../utils/format'

const searchKeys = ['name', 'email']

export default function AdminDashboard() {
  const load = useCallback(() => Promise.all([userService.list(), classService.list(), subjectService.list()]), [])
  const { data, loading, error, reload } = useAsync(load)
  const [selected, setSelected] = useState(null)
  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={reload} />
  const [users, classes, subjects] = data
  const columns = [
    { key: 'name', header: 'Nama' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Peran', render: (r) => roleLabel[r.role] },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'act', header: '', render: (r) => <button className="text-brand-600 hover:underline" onClick={() => setSelected(r)}>Detail</button> },
  ]
  return (
    <>
      <PageHeader title="Dashboard Admin" description="Ikhtisar sistem LMS." breadcrumbs={[{ label: 'Beranda' }, { label: 'Dashboard' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatisticCard label="Pengguna" value={users.length} icon={Users} />
        <StatisticCard label="Kelas" value={classes.length} icon={School} />
        <StatisticCard label="Mata pelajaran" value={subjects.length} icon={BookOpen} />
      </div>
      <DataTable columns={columns} rows={users} searchKeys={searchKeys} searchPlaceholder="Cari nama atau email" />
      <Modal open={!!selected} title="Detail pengguna" onClose={() => setSelected(null)} footer={<button className="btn-secondary" onClick={() => setSelected(null)}>Tutup</button>}>
        {selected && <dl className="space-y-1"><dt className="text-slate-500">Nama</dt><dd className="font-medium">{selected.name}</dd><dt className="text-slate-500">Email</dt><dd>{selected.email}</dd><dt className="text-slate-500">Peran</dt><dd>{roleLabel[selected.role]}</dd></dl>}
      </Modal>
    </>
  )
}
