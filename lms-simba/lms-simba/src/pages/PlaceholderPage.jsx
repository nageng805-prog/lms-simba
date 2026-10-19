import { Construction } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import EmptyState from '../components/common/EmptyState'

export default function PlaceholderPage({ title }) {
  return (
    <>
      <PageHeader title={title} breadcrumbs={[{ label: 'Beranda' }, { label: title }]} />
      <div className="card"><EmptyState title="Modul belum dikerjakan" description={`Halaman ${title} akan dibangun pada fase berikutnya.`} action={<Construction className="text-slate-300" />} /></div>
    </>
  )
}
