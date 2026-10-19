import { createContext, useContext, useState, useCallback } from 'react'
import ToastNotification from '../components/common/ToastNotification'

const ToastContext = createContext(null)
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const notify = useCallback((message, type = 'info') => {
    const id = crypto.randomUUID()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => dismiss(id), 4000)
  }, [dismiss])
  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="fixed right-4 top-4 z-[60] flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
        {toasts.map((t) => <ToastNotification key={t.id} {...t} onClose={() => dismiss(t.id)} />)}
      </div>
    </ToastContext.Provider>
  )
}
