import { request } from './http'
import { users } from '../data/users'
import { classes } from '../data/academic'
import * as t from '../data/teacher'

// Store dalam memori: berubah selama sesi, kembali ke awal saat halaman dimuat ulang.
const store = { materials: [...t.teacherMaterials].map((m) => ({ ...m })), nextId: 3 }
const allClasses = [...classes, ...t.extraClasses]
const students = users.filter((u) => u.role === 'student').map(({ password: _p, ...u }) => u)
const className = (id) => allClasses.find((c) => c.id === id)?.name ?? '-'

const enrich = (tc) => ({
  ...tc, id: tc.classId, name: className(tc.classId),
  students: tc.studentIds.map((id) => students.find((s) => s.id === id)).filter(Boolean),
})
const classIsNamed = (m) => ({ ...m, classNames: m.classIds.map(className) })

export const teacherService = {
  listClasses: () => request(() => t.teachingClasses.map(enrich)),
  getClass: (id) => request(() => {
    const tc = t.teachingClasses.find((c) => c.classId === Number(id))
    return tc ? { ...enrich(tc), materials: store.materials.filter((m) => m.classIds.includes(tc.classId)).map(classIsNamed) } : null
  }),
  classOptions: () => request(() => t.teachingClasses.filter((c) => c.status === 'active').map((c) => ({ id: c.classId, name: className(c.classId) }))),

  dashboard: () => request(() => {
    const active = t.teachingClasses.filter((c) => c.status === 'active')
    const studentIds = new Set(active.flatMap((c) => c.studentIds))
    const subs = t.teacherSubmissions
    const aName = (id) => t.teacherAssignments.find((a) => a.id === id)?.title
    const sName = (id) => students.find((s) => s.id === id)?.name
    return {
      classCount: active.length, studentCount: studentIds.size,
      toGrade: subs.filter((s) => s.status === 'submitted').length,
      graded: subs.filter((s) => s.status === 'graded').length,
      schedule: [...t.teacherSchedule].sort((a, b) => a.dayIndex - b.dayIndex || a.time.localeCompare(b.time)).map((s) => ({ ...s, className: className(s.classId) })),
      activity: subs.map((s) => ({ id: s.id, text: `${sName(s.studentId)} mengumpulkan "${aName(s.assignmentId)}"`, date: s.submittedAt })).sort((a, b) => b.date.localeCompare(a.date)),
      submissionSummary: t.teacherAssignments.map((a) => ({
        id: a.id, title: a.title, className: className(a.classId),
        total: t.teachingClasses.find((c) => c.classId === a.classId).studentIds.length,
        submitted: subs.filter((s) => s.assignmentId === a.id).length,
      })),
      deadlines: [...t.teacherAssignments].sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((a) => ({ ...a, className: className(a.classId) })),
    }
  }),

  listMaterials: () => request(() => store.materials.map(classIsNamed)),
  getMaterial: (id) => request(() => { const m = store.materials.find((x) => x.id === Number(id)); return m ? classIsNamed(m) : null }),
  saveMaterial: (data) => request(() => {
    const now = '2026-10-15'
    if (data.id) {
      const i = store.materials.findIndex((m) => m.id === data.id)
      if (i < 0) throw new Error('Materi tidak ditemukan.')
      store.materials[i] = { ...store.materials[i], ...data, updatedAt: now }
      return store.materials[i]
    }
    const m = { ...data, id: store.nextId++, order: store.materials.length + 1, updatedAt: now }
    store.materials.push(m)
    return m
  }),
  deleteMaterial: (id) => request(() => {
    store.materials = store.materials.filter((m) => m.id !== id).sort((a, b) => a.order - b.order).map((m, i) => ({ ...m, order: i + 1 }))
    return true
  }),
  moveMaterial: (id, dir) => request(() => {
    const list = [...store.materials].sort((a, b) => a.order - b.order)
    const i = list.findIndex((m) => m.id === id), j = i + dir
    if (j < 0 || j >= list.length) return false
    ;[list[i].order, list[j].order] = [list[j].order, list[i].order]
    store.materials = list
    return true
  }),
}
