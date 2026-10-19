import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Pencil, FileText } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import { formatSize } from '../../components/forms/AttachmentPicker'
import { useAsync } from '../../hooks/useAsync'
import { teacherService } from '../../services'
import { formatDate } from '../../utils/format'

export default function MaterialDetailPage() {
  const { id } = useParams()
  const load = useCallback(() => teacherService.getMaterial(id), [id])
  const { data: m, loading, error, reload } = useAsync(load)
  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={reload} />
  if (!m) return <ErrorState message="Materi tidak ditemukan." />
  return (
    <>
      <PageHeader title={m.title} description={m.description} breadcrumbs={[{ label: 'Beranda', to: '/teacher/dashboard' }, { label: 'Materi', to: '/teacher/materials' }, { label: m.title }]}
        actions={<Link to={`/teacher/materials/${m.id}/edit`} className="btn-secondary"><Pencil size={16} /> Edit</Link>} />
      <div className="card max-w-3xl space-y-4 p-5 text-sm">
        <div className="flex flex-wrap items-center gap-2"><StatusBadge status={m.status} /><span className="text-slate-500">Kelas: {m.classNames.join(', ') || '-'} · diubah {formatDate(m.updatedAt)}</span></div>
        <div><h2 className="mb-1 font-semibold">Pratinjau isi materi</h2><div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">{m.content}</div></div>
        <div><h2 className="mb-1 font-semibold">Lampiran</h2>
          {m.attachments.length === 0 ? <p className="text-slate-500">Tidak ada lampiran.</p> : (
            <ul className="space-y-1">{m.attachments.map((a) => <li key={a.name} className="flex items-center gap-2"><FileText size={16} className="text-slate-400" />{a.name}<span className="text-xs text-slate-500">{formatSize(a.size)} · data simulasi, file tidak tersimpan di server</span></li>)}</ul>
          )}
        </div>
      </div>
    </>
  )
}
