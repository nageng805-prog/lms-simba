import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../routes'
import { AuthProvider } from '../contexts/AuthContext'
import { ToastProvider } from '../contexts/ToastContext'

const teacher = { id: 2, name: 'Bu Ratna Wulandari', role: 'teacher', status: 'active' }
function renderAt(path) {
  localStorage.setItem('simba_mock_session', JSON.stringify(teacher))
  return render(<MemoryRouter initialEntries={[path]}><ToastProvider><AuthProvider><App /></AuthProvider></ToastProvider></MemoryRouter>)
}
const find = (t) => screen.findByText(t, {}, { timeout: 5000 })

test('dashboard menampilkan statistik dari data', async () => {
  renderAt('/teacher/dashboard')
  await find('Perlu dinilai')
  const card = (label) => screen.getByText(label).parentElement
  expect(card('Kelas diajar')).toHaveTextContent('2')
  expect(card('Siswa')).toHaveTextContent('3')
  expect(card('Perlu dinilai')).toHaveTextContent('2')
  expect(card('Sudah dinilai')).toHaveTextContent('1')
})

test('kelas: filter status dan detail', async () => {
  const user = userEvent.setup()
  renderAt('/teacher/classes')
  await find('XI IPA 1')
  await user.selectOptions(screen.getByLabelText('Filter status'), 'finished')
  expect(screen.queryByText('X IPA 1')).not.toBeInTheDocument()
  await user.click(screen.getByText('XI IPA 1'))
  await find('Siswa (1)')
})

test('materi: filter, validasi, tambah, edit, hapus, konsistensi dengan detail kelas', async () => {
  const user = userEvent.setup()
  renderAt('/teacher/materials')
  await find('Fungsi Kuadrat')
  await user.selectOptions(screen.getByLabelText('Filter status'), 'draft')
  expect(screen.queryByText('Fungsi Kuadrat')).not.toBeInTheDocument()
  expect(screen.getByText('Persamaan Linear')).toBeInTheDocument()
  await user.selectOptions(screen.getByLabelText('Filter status'), 'all')

  // validasi form kosong
  await user.click(screen.getByText('Tambah materi'))
  await screen.findByLabelText('Judul', {}, { timeout: 5000 })
  await user.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(await screen.findByText('Judul wajib diisi.')).toBeInTheDocument()
  expect(screen.getByText('Isi materi wajib diisi.')).toBeInTheDocument()

  // validasi lampiran tidak valid
  const file = new File(['x'], 'virus.exe')
  await user.upload(screen.getByLabelText('Pilih file lampiran'), file)
  expect(screen.getByText(/jenis file tidak didukung/)).toBeInTheDocument()
  const ok = new File(['x'.repeat(2048)], 'bab1.pdf', { type: 'application/pdf' })
  await user.upload(screen.getByLabelText('Pilih file lampiran'), ok)
  expect(screen.getByText('bab1.pdf')).toBeInTheDocument()
  expect(screen.getByText(/belum diunggah/)).toBeInTheDocument()

  // publikasi tanpa kelas ditolak
  await user.type(screen.getByLabelText('Judul'), 'Trigonometri')
  await user.type(screen.getByLabelText('Isi materi'), 'Sin, cos, tan.')
  await user.selectOptions(screen.getByLabelText('Status'), 'published')
  await user.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(await screen.findByText(/minimal satu kelas/)).toBeInTheDocument()

  // simpan berhasil
  await user.click(screen.getByLabelText('X IPA 1'))
  await user.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(await screen.findByText(/Materi ditambahkan/)).toBeInTheDocument()
  await find('Trigonometri')

  // edit
  const row = screen.getByText('Trigonometri').closest('li')
  await user.click(within(row).getByLabelText('Edit'))
  const title = await screen.findByLabelText('Judul', {}, { timeout: 5000 })
  await waitFor(() => expect(title).toHaveValue('Trigonometri'))
  await user.clear(title); await user.type(title, 'Trigonometri Dasar')
  await user.click(screen.getByRole('button', { name: 'Simpan' }))
  await find('Trigonometri Dasar')

  // hapus dengan konfirmasi (batal lalu konfirmasi)
  const row2 = screen.getByText('Trigonometri Dasar').closest('li')
  await user.click(within(row2).getByLabelText('Hapus'))
  await user.click(screen.getByText('Batal'))
  expect(screen.getByText('Trigonometri Dasar')).toBeInTheDocument()
  await user.click(within(row2).getByLabelText('Hapus'))
  await user.click(within(screen.getByRole('dialog')).getByText('Hapus'))
  await waitFor(() => expect(screen.queryByText('Trigonometri Dasar')).not.toBeInTheDocument(), { timeout: 5000 })
})

test('urutan materi: turunkan mengubah posisi', async () => {
  const user = userEvent.setup()
  renderAt('/teacher/materials')
  await find('Fungsi Kuadrat')
  const titles = () => screen.getAllByRole('listitem').map((li) => li.querySelector('p')?.textContent)
  expect(titles()[0]).toBe('Fungsi Kuadrat')
  await user.click(within(screen.getByText('Fungsi Kuadrat').closest('li')).getByLabelText('Turunkan'))
  await waitFor(() => expect(titles()[0]).toBe('Persamaan Linear'), { timeout: 5000 })
})

test('detail materi menampilkan pratinjau dan lampiran simulasi', async () => {
  renderAt('/teacher/materials/1')
  await find('Pratinjau isi materi')
  expect(screen.getByText('fungsi-kuadrat.pdf')).toBeInTheDocument()
  expect(screen.getByText(/tidak tersimpan di server/)).toBeInTheDocument()
})
