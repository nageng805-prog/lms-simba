import { useEffect, useState, useCallback } from 'react'

// Memuat data dari service: { data, loading, error, reload }
export function useAsync(fn) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let active = true
    fn()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((e) => active && setState({ data: null, loading: false, error: e.message }))
    return () => { active = false }
  }, [fn, tick])

  const reload = useCallback(() => {
    setState({ data: null, loading: true, error: null })
    setTick((t) => t + 1)
  }, [])
  return { ...state, reload }
}
