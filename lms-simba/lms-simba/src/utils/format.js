export const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
export const roleLabel = { admin: 'Administrator', teacher: 'Guru', student: 'Siswa' }
export const roleHome = { admin: '/admin/dashboard', teacher: '/teacher/dashboard', student: '/student/dashboard' }
