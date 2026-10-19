export const classes = [
  { id: 1, name: 'X IPA 1', homeroom: 'Bu Ratna Wulandari', students: 32 },
  { id: 2, name: 'X IPS 2', homeroom: 'Budi Santoso', students: 30 },
]
export const subjects = [
  { id: 1, name: 'Matematika', teacherId: 2 },
  { id: 2, name: 'Bahasa Indonesia', teacherId: 5 },
]
export const materials = [{ id: 1, subjectId: 1, title: 'Fungsi Kuadrat', type: 'PDF' }]
export const assignments = [{ id: 1, subjectId: 1, title: 'Latihan Fungsi Kuadrat', dueDate: '2026-10-20', status: 'open' }]
export const submissions = [{ id: 1, assignmentId: 1, studentId: 3, submittedAt: '2026-10-14', status: 'submitted' }]
export const grades = [{ id: 1, studentId: 3, subjectId: 1, score: 86 }]
export const schedules = [
  { id: 1, day: 'Senin', time: '07:30', subject: 'Matematika', room: 'R. 101' },
  { id: 2, day: 'Senin', time: '09:30', subject: 'Bahasa Indonesia', room: 'R. 101' },
]
export const announcements = [
  { id: 1, title: 'Ujian Tengah Semester', date: '2026-10-12', body: 'UTS dimulai 26 Oktober 2026.' },
  { id: 2, title: 'Pemeliharaan Sistem', date: '2026-10-10', body: 'Akses LMS terbatas Sabtu malam.' },
]
export const reports = [{ id: 1, name: 'Rekap Kehadiran Oktober', generatedAt: '2026-10-14' }]
export const settings = { schoolName: 'SMA Simba', academicYear: '2026/2027', semester: 'Ganjil' }
