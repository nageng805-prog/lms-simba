import { Menu, LogOut, ChevronDown, Bell } from 'lucide-react'
import Dropdown from '../common/Dropdown'
import { roleLabel } from '../../utils/format'

export default function Navbar({ user, onMenu, onLogout, onNotifications }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-8">
      <button className="lg:hidden" onClick={onMenu} aria-label="Buka menu"><Menu size={22} /></button>
      <div className="ml-auto flex items-center gap-4">
        <button onClick={onNotifications} aria-label="Notifikasi" className="rounded-full p-2 text-slate-500 hover:bg-slate-100"><Bell size={18} /></button>
        <Dropdown
          trigger={
            <span className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">{user.name[0]}</span>
              <span className="hidden text-left sm:block"><span className="block text-sm font-medium leading-tight">{user.name}</span><span className="block text-xs text-slate-500">{roleLabel[user.role]}</span></span>
              <ChevronDown size={16} />
            </span>
          }
          items={[{ label: 'Keluar', icon: LogOut, onClick: onLogout }]}
        />
      </div>
    </header>
  )
}
