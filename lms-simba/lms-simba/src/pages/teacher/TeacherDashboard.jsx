import { Link } from 'react-router-dom'
import { School, Users, ClipboardCheck, CheckCircle2 } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import StatisticCard from '../../components/common/StatisticCard'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import { useAsync } from '../../hooks/useAsync'
import { teacherService } from '../../services'
import { formatDate } from '../../utils/format'

const Section = ({ title, children }) => <section className="card p-5"><h2 className="mb-3 font-semibold">{title}</h2>{children}</section>

export default function TeacherDashboard() {
  const { data: d, loading, error, reload } = useAsync(teacherService.dashboard)
  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={reload} />
  return (
    <>
      <PageHeader title="Dashboard Guru" description="Ringkasan kegiatan mengajar." breadcrumbs={[{ label: 'Beranda' }, { label: 'Dashboard' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatisticCard label="Kelas diajar" value={d.classCount} icon={School} />
        <StatisticCard label="Siswa" value={d.studentCount} icon={Users} />
        <StatisticCard label="Perlu dinilai" value={d.toGrade} icon={ClipboardCheck} />
        <StatisticCard label="Sudah dinilai" value={d.graded} icon={CheckCircle2} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Jadwal mengajar terdekat">
          <ul className="divide-y divide-slate-100 text-sm">
            {d.schedule.slice(0, 3).map((s) => <li key={s.id} className="flex justify-between py-2"><span>{s.className} · {s.room}</span><span className="text-slate-500">{s.day}, {s.time}</span></li>)}
          </ul>
        </Section>
        <Section title="Tugas dengan tenggat terdekat">
          <ul className="divide-y divide-slate-100 text-sm">
            {d.deadlines.map((a) => <li key={a.id} className="flex justify-between py-2"><span>{a.title} <span className="text-slate-400">({a.className})</span></span><span className="text-slate-500">{formatDate(a.dueDate)}</span></li>)}
          </ul>
        </Section>
        <Section title="Ringkasan pengumpulan tugas">
          <ul className="space-y-3 text-sm">
            {d.submissionSummary.map((s) => (
              <li key={s.id}>
                <div className="flex justify-between"><span>{s.title} ({s.className})</span><span>{s.submitted}/{s.total}</span></div>
                <div className="mt-1 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-brand-600" style={{ width: `${s.total ? (s.submitted / s.total) * 100 : 0}%` }} /></div>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Aktivitas siswa">
          {d.activity.length === 0 ? <EmptyState title="Belum ada aktivitas" /> : (
            <ul className="divide-y divide-slate-100 text-sm">
              {d.activity.map((a) => <li key={a.id} className="py-2">{a.text}<span className="block text-xs text-slate-400">{formatDate(a.date)}</span></li>)}
            </ul>
          )}
        </Section>
      </div>
      <p className="mt-4 text-sm text-slate-500"><Link to="/teacher/classes" className="text-brand-600 hover:underline">Lihat semua kelas</Link></p>
    </>
  )
}
