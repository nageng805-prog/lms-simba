import { LayoutDashboard, BookOpen, FileText, ClipboardList, BarChart3, CalendarDays, Megaphone, Users, School, Settings, FileBarChart } from 'lucide-react'

// Satu sumber kebenaran untuk menu sidebar DAN rute tiap role.
// `ready: true` = halaman sudah ada; lainnya memakai halaman placeholder sampai modulnya dibuat.
export const navigation = {
  student: [
    { label: 'Dashboard', path: 'dashboard', icon: LayoutDashboard, ready: true },
    { label: 'Mata Pelajaran', path: 'subjects', icon: BookOpen },
    { label: 'Materi', path: 'materials', icon: FileText },
    { label: 'Tugas', path: 'assignments', icon: ClipboardList },
    { label: 'Nilai', path: 'grades', icon: BarChart3 },
    { label: 'Jadwal', path: 'schedule', icon: CalendarDays },
    { label: 'Pengumuman', path: 'announcements', icon: Megaphone },
  ],
  teacher: [
    { label: 'Dashboard', path: 'dashboard', icon: LayoutDashboard, ready: true },
    { label: 'Kelas', path: 'classes', icon: School },
    { label: 'Materi', path: 'materials', icon: FileText },
    { label: 'Tugas', path: 'assignments', icon: ClipboardList },
    { label: 'Penilaian', path: 'grading', icon: BarChart3 },
    { label: 'Jadwal', path: 'schedule', icon: CalendarDays },
  ],
  admin: [
    { label: 'Dashboard', path: 'dashboard', icon: LayoutDashboard, ready: true },
    { label: 'Pengguna', path: 'users', icon: Users },
    { label: 'Kelas', path: 'classes', icon: School },
    { label: 'Mata Pelajaran', path: 'subjects', icon: BookOpen },
    { label: 'Pengumuman', path: 'announcements', icon: Megaphone },
    { label: 'Laporan', path: 'reports', icon: FileBarChart },
    { label: 'Pengaturan', path: 'settings', icon: Settings },
  ],
}
