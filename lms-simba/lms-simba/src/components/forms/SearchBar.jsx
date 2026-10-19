import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Cari...' }) {
  return (
    <div className="relative w-full max-w-xs">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input className="input pl-9" type="search" value={value} placeholder={placeholder}
        aria-label={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
