import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { create } from 'zustand'

interface RefState {
  ref: string | null
  setRef: (ref: string) => void
}

const useRefStore = create<RefState>((set) => ({
  ref: null,
  setRef: (ref) => set({ ref })
}))

export function useRefParam() {
  const searchParams = useSearchParams()
  const setRef = useRefStore((state) => state.setRef)
  
  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      setRef(ref)
    }
  }, [searchParams, setRef])

  return useRefStore((state) => state.ref)
}
