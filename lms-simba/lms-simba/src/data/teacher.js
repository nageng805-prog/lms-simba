// Data simulasi modul guru (guru login: id 2). Siswa merujuk ke data/users.js.
export const teachingClasses = [
  { classId: 1, subject: 'Matematika', year: '2026/2027', status: 'active', studentIds: [3, 4] },
  { classId: 2, subject: 'Matematika', year: '2026/2027', status: 'active', studentIds: [6] },
  { classId: 3, subject: 'Fisika', year: '2025/2026', status: 'finished', studentIds: [3] },
]
export const extraClasses = [{ id: 3, name: 'XI IPA 1', homeroom: 'Bu Ratna Wulandari', students: 1 }]
export const teacherAssignments = [
  { id: 1, classId: 1, title: 'Latihan Fungsi Kuadrat', dueDate: '2026-10-20' },
  { id: 2, classId: 2, title: 'Kuis Persamaan Linear', dueDate: '2026-10-18' },
]
export const teacherSubmissions = [
  { id: 1, assignmentId: 1, studentId: 3, submittedAt: '2026-10-14', status: 'submitted' },
  { id: 2, assignmentId: 1, studentId: 4, submittedAt: '2026-10-13', status: 'graded' },
  { id: 3, assignmentId: 2, studentId: 6, submittedAt: '2026-10-15', status: 'submitted' },
]
export const teacherSchedule = [
  { id: 1, dayIndex: 4, day: 'Kamis', time: '13:00', classId: 1, room: 'R. 101' },
  { id: 2, dayIndex: 5, day: 'Jumat', time: '08:00', classId: 2, room: 'R. 102' },
  { id: 3, dayIndex: 1, day: 'Senin', time: '07:30', classId: 1, room: 'R. 101' },
]
export const teacherMaterials = [
  { id: 1, title: 'Fungsi Kuadrat', description: 'Pengantar fungsi kuadrat.', content: 'Bentuk umum: f(x) = ax² + bx + c.\n\nGrafiknya berupa parabola.', classIds: [1, 2], status: 'published', order: 1, updatedAt: '2026-10-10',
    attachments: [{ name: 'fungsi-kuadrat.pdf', size: 482000 }] },
  { id: 2, title: 'Persamaan Linear', description: 'Dasar persamaan linear satu variabel.', content: 'Persamaan linear berbentuk ax + b = 0.', classIds: [2], status: 'draft', order: 2, updatedAt: '2026-10-12', attachments: [] },
]
