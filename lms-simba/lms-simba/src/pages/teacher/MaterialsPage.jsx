import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, ArrowUp, ArrowDown, Paperclip } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import SearchBar from '../../components/forms/SearchBar'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import ConfirmationDialog from '../../components/common/ConfirmationDialog'
import { useAsync } from '../../hooks/useAsync'
import { useToast } from '../../contexts/ToastContext'
import { teacherService } from '../../services'
import { formatDate } from '../../utils/format'

const sorters = {
  order: (a, b) => a.order - b.order,
  newest: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  title: (a, b) => a.title.localeCompare(b.title),
}

export default function MaterialsPage() {
  const { data, loading, error, reload } = useAsync(teacherService.listMaterials)
  const { notify } = useToast()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('order')
  const [toDelete, setToDelete] = useState(null)
  const rows = useMemo(() => (data ?? []).filter((m) => (status === 'all' || m.status === status) && m.title.toLowerCase().includes(q.toLowerCase())).sort(sorters[sort]), [data, q, status, sort])

  const remove = async () => {
    try { await teacherService.deleteMaterial(toDelete.id); notify('Materi dihapus (data simulasi).', 'success'); reload() }
    catch (e) { notify(e.message, 'error') }
    setToDelete(null)
  }
  const move = async (m, dir) => { await teacherService.moveMaterial(m.id, dir); reload() }

  return (
    <>
      <PageHeader title="Materi" breadcrumbs={[{ label: 'Beranda', to: '/teacher/dashboard' }, { label: 'Materi' }]}
        actions={<Link to="/teacher/materials/new" className="btn-primary"><Plus size={16} /> Tambah materi</Link>} />
      <div className="mb-4 flex flex-wrap gap-3">
        <SearchBar value={q} onChange={setQ} placeholder="Cari materi" />
        <select className="input w-auto" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter status">
          <option value="all">Semua status</option><option value="draft">Draft</option><option value="published">Dipublikasikan</option>
        </select>
        <select className="input w-auto" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Urutkan">
          <option value="order">Urutan materi</option><option value="newest">Terbaru diubah</option><option value="title">Judul A–Z</option>
        </select>
      </div>
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : rows.length === 0 ? (
        <div className="card"><EmptyState title="Belum ada materi" description="Tambah materi atau ubah filter." /></div>
      ) : (
        <ul className="space-y-3">
          {rows.map((m, i) => (
            <li key={m.id} className="card flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium">{m.title}</p>
                <p className="text-sm text-slate-500">{m.classNames.join(', ')} · diubah {formatDate(m.updatedAt)}
                  {m.attachments.length > 0 && <span className="ml-2 inline-flex items-center gap-1"><Paperclip size={12} />{m.attachments.length}</span>}</p>
              </div>
              <StatusBadge status={m.status} />
              <div className="flex gap-1">
                {sort === 'order' && !q && status === 'all' && <>
                  <button className="btn-secondary px-2" disabled={i === 0} onClick={() => move(m, -1)} aria-label="Naikkan"><ArrowUp size={14} /></button>
                  <button className="btn-secondary px-2" disabled={i === rows.length - 1} onClick={() => move(m, 1)} aria-label="Turunkan"><ArrowDown size={14} /></button>
                </>}
                <Link className="btn-secondary px-2" to={`/teacher/materials/${m.id}`} aria-label="Detail"><Eye size={14} /></Link>
                <Link className="btn-secondary px-2" to={`/teacher/materials/${m.id}/edit`} aria-label="Edit"><Pencil size={14} /></Link>
                <button className="btn-secondary px-2 text-red-600" onClick={() => setToDelete(m)} aria-label="Hapus"><Trash2 size={14} /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ConfirmationDialog open={!!toDelete} title="Hapus materi?" message={`Materi "${toDelete?.title}" akan dihapus.`} confirmLabel="Hapus" onCancel={() => setToDelete(null)} onConfirm={remove} />
    </>
  )
}
