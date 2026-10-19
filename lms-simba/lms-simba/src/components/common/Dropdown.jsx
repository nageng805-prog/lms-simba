import { useEffect, useRef, useState } from 'react'

// items: [{ label, icon: Icon, onClick }]
export default function Dropdown({ trigger, items, align = 'right' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>{trigger}</button>
      {open && (
        <div role="menu" className={`card absolute z-40 mt-2 w-48 p-1 ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {items.map(({ label, icon: Icon, onClick }) => (
            <button key={label} role="menuitem" onClick={() => { setOpen(false); onClick() }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-slate-100">
              {Icon && <Icon size={16} />} {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
