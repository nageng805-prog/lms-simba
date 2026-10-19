import { useRef, useState } from 'react'
import { Paperclip, X, FileText } from 'lucide-react'

const ALLOWED = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg']
const MAX = 5 * 1024 * 1024
export const formatSize = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)

// value: [{ name, size }]. Hanya metadata yang disimpan; isi file TIDAK diunggah ke server mana pun.
export default function AttachmentPicker({ value, onChange }) {
  const ref = useRef(null)
  const [errors, setErrors] = useState([])

  const pick = (e) => {
    const errs = [], ok = []
    for (const f of e.target.files) {
      const ext = f.name.split('.').pop().toLowerCase()
      if (!ALLOWED.includes(ext)) errs.push(`${f.name}: jenis file tidak didukung.`)
      else if (f.size > MAX) errs.push(`${f.name}: melebihi 5 MB.`)
      else if (value.some((v) => v.name === f.name)) errs.push(`${f.name}: sudah dipilih.`)
      else ok.push({ name: f.name, size: f.size })
    }
    setErrors(errs)
    if (ok.length) onChange([...value, ...ok])
    e.target.value = ''
  }

  return (
    <div className="space-y-2">
      <input ref={ref} type="file" multiple hidden onChange={pick} aria-label="Pilih file lampiran" />
      <button type="button" className="btn-secondary" onClick={() => ref.current.click()}><Paperclip size={16} /> Pilih file</button>
      <p className="text-xs text-slate-500">Format: {ALLOWED.join(', ')}. Maks. 5 MB per file. Mode simulasi: file tidak diunggah ke server.</p>
      {errors.map((er) => <p key={er} role="alert" className="text-xs text-red-600">{er}</p>)}
      <ul className="space-y-1">
        {value.map((f) => (
          <li key={f.name} className="flex items-center gap-2 rounded-lg border border-slate-200 p-2 text-sm">
            <FileText size={16} className="text-slate-400" />
            <span className="flex-1 truncate">{f.name}</span>
            <span className="text-xs text-slate-500">{formatSize(f.size)}</span>
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">Simulasi · belum diunggah</span>
            <button type="button" aria-label={`Hapus ${f.name}`} onClick={() => onChange(value.filter((v) => v.name !== f.name))}><X size={14} /></button>
          </li>
        ))}
      </ul>
    </div>
  )
}
