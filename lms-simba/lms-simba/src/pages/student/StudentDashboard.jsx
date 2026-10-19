import { useCallback } from 'react'
import { ClipboardList, BarChart3, BookOpen } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import StatisticCard from '../../components/common/StatisticCard'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import StatusBadge from '../../components/common/StatusBadge'
import { useAsync } from '../../hooks/useAsync'
import { assignmentService, subjectService, gradeService } from '../../services'
import { formatDate } from '../../utils/format'

export default function StudentDashboard() {
  const load = useCallback(() => Promise.all([assignmentService.list(), subjectService.list(), gradeService.list()]), [])
  const { data, loading, error, reload } = useAsync(load)
  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={reload} />
  const [assignments, subjects, grades] = data
  const avg = grades.length ? Math.round(grades.reduce((s, g) => s + g.score, 0) / grades.length) : '-'
  return (
    <>
      <PageHeader title="Dashboard Siswa" description="Ringkasan aktivitas belajar Anda." breadcrumbs={[{ label: 'Beranda' }, { label: 'Dashboard' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatisticCard label="Mata pelajaran" value={subjects.length} icon={BookOpen} />
        <StatisticCard label="Tugas aktif" value={assignments.length} icon={ClipboardList} />
        <StatisticCard label="Rata-rata nilai" value={avg} icon={BarChart3} />
      </div>
      <div className="card p-5">
        <h2 className="mb-3 font-semibold">Tugas terdekat</h2>
        <ul className="divide-y divide-slate-100">
          {assignments.map((a) => (
            <li key={a.id} className="flex items-center justify-between py-3 text-sm">
              <div><p className="font-medium">{a.title}</p><p className="text-slate-500">Tenggat {formatDate(a.dueDate)}</p></div>
              <StatusBadge status={a.status} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
