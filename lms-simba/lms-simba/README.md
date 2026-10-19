# LMS Simba — Frontend (Fase 1: Fondasi)

React 19 + Vite + Tailwind CSS 4 + React Router + Lucide React.
Fase ini hanya frontend dengan data simulasi. Belum ada backend Laravel, migration, atau koneksi PostgreSQL.

## Menjalankan
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build produksi ke dist/
npm run lint     # oxlint
```
Prasyarat: Node.js LTS dan npm.

## Dependency
- react, react-dom, react-router-dom, lucide-react
- dev: vite, @vitejs/plugin-react, tailwindcss, @tailwindcss/vite, oxlint

## Akun demo (mock)
| Peran | Username | Password |
|---|---|---|
| Admin | admin | admin123 |
| Guru | guru | guru123 |
| Siswa | siswa | siswa123 |

Autentikasi hanya simulasi (sesi di localStorage). Lupa kata sandi hanya simulasi: tidak ada email terkirim dan tidak ada reset di server.
Pengecekan role di klien hanya untuk UX; otorisasi nyata wajib di backend.

## Struktur
```
src/
  components/{common,layout,forms,tables}
  layouts/        AuthLayout, StudentLayout, TeacherLayout, AdminLayout (+ DashboardLayout bersama)
  pages/{auth,student,teacher,admin,errors}
  routes/         navigation.js (menu + rute per role), *Routes.jsx, ProtectedRoute
  services/       http.js (titik ganti ke API Laravel), authService, createCrudService, index
  data/           mock data
  contexts/ hooks/ utils/ styles/
```

## Migrasi ke API Laravel
Ganti isi `request()` di `src/services/http.js` dan implementasi tiap service
(`list`, `get`, dst.) menjadi pemanggilan HTTP. Halaman memakai service, bukan data langsung.

## Status
Selesai: auth UI, layout per role, komponen global, dashboard tiap role, 403/404.
Belum: modul siswa/guru/admin lengkap. Menu selain Dashboard menampilkan halaman placeholder.
Desain: Figma tidak dapat diakses secara otomatis, sehingga desain dibuat mandiri dan perlu disesuaikan dengan Figma.
