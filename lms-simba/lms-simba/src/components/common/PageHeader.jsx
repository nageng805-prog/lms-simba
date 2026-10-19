import Breadcrumb from './Breadcrumb'

export default function PageHeader({ title, description, breadcrumbs, actions }) {
  return (
    <div className="mb-6 space-y-2">
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
        {actions}
      </div>
    </div>
  )
}
