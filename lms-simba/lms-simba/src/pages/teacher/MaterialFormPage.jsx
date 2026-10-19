import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import FormField from '../../components/forms/FormField'
import AttachmentPicker from '../../components/forms/AttachmentPicker'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import { useAsync } from '../../hooks/useAsync'
import { useToast } from '../../contexts/ToastContext'
import { teacherService } from '../../services'

const empty = { title: '', description: '', content: '', classIds: [], attachments: [], status: 'draft' }

function Form({ initial, classes }) {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [f, setF] = useState(initial)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }))
  const toggle = (id) => set('classIds', f.classIds.includes(id) ? f.classIds.filter((c) => c !== id) : [...f.classIds, id])

  const submit = async (e) => {
    e.preventDefault()
    const er = {}
    if (!f.title.trim()) er.title = 'Judul wajib diisi.'
    if (!f.content.trim()) er.content = 'Isi materi wajib diisi.'
    if (f.status === 'published' && f.classIds.length === 0) er.classIds = 'Pilih minimal satu kelas untuk dipublikasikan.'
    setErrors(er)
    if (Object.keys(er).length) return
    setSaving(true)
    try {
      await teacherService.saveMaterial({ ...f, title: f.title.trim() })
      notify(initial.id ? 'Materi diperbarui (data simulasi).' : 'Materi ditambahkan (data simulasi).', 'success')
      navigate('/teacher/materials')
    } catch (err) { notify(err.message, 'error'); setSaving(false) }
  }

  return (
    <form onSubmit={submit} className="card max-w-3xl space-y-4 p-5" noValidate>
      <FormField label="Judul" id="title" error={errors.title}><input id="title" className="input" value={f.title} onChange={(e) => set('title', e.target.value)} /></FormField>
      <FormField label="Deskripsi singkat" id="desc"><input id="desc" className="input" value={f.description} onChange={(e) => set('description', e.target.value)} /></FormField>
      <FormField label="Isi materi" id="content" error={errors.content}><textarea id="content" rows={8} className="input" value={f.content} onChange={(e) => set('content', e.target.value)} /></FormField>
      <fieldset>
        <legend className="mb-1 text-sm font-medium">Kelas tujuan</legend>
        <div className="flex flex-wrap gap-3">{classes.map((c) => <label key={c.id} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.classIds.includes(c.id)} onChange={() => toggle(c.id)} />{c.name}</label>)}</div>
        {errors.classIds && <p role="alert" className="mt-1 text-xs text-red-600">{errors.classIds}</p>}
      </fieldset>
      <div><p className="mb-1 text-sm font-medium">Lampiran</p><AttachmentPicker value={f.attachments} onChange={(v) => set('attachments', v)} /></div>
      <FormField label="Status" id="status">
        <select id="status" className="input" value={f.status} onChange={(e) => set('status', e.target.value)}><option value="draft">Draft</option><option value="published">Dipublikasikan</option></select>
      </FormField>
      <div className="flex justify-end gap-2">
        <button type="button" className="btn-secondary" onClick={() => navigate('/teacher/materials')}>Batal</button>
        <button className="btn-primary" disabled={saving}>{saving && <Loader2 size={16} className="animate-spin" />} Simpan</button>
      </div>
    </form>
  )
}

export default function MaterialFormPage() {
  const { id } = useParams()
  const load = useCallback(async () => ({ classes: await teacherService.classOptions(), material: id ? await teacherService.getMaterial(id) : empty }), [id])
  const { data, loading, error, reload } = useAsync(load)
  const title = id ? 'Edit materi' : 'Tambah materi'
  return (
    <>
      <PageHeader title={title} breadcrumbs={[{ label: 'Beranda', to: '/teacher/dashboard' }, { label: 'Materi', to: '/teacher/materials' }, { label: title }]} />
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : !data.material ? <ErrorState message="Materi tidak ditemukan." /> : <Form initial={data.material} classes={data.classes} />}
    </>
  )
}
