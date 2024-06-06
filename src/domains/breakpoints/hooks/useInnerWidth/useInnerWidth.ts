import { useEffect, useState } from 'react'

export const useInnerWidth = (): number => {
  const [innerWidth, setInnerWidth] = useState<number>(
    window ? window.innerWidth : 0
  )

  useEffect(() => {
    if (window) {
      document.addEventListener('resize', () => {
        setInnerWidth(window.innerWidth)
      })
      return () => {
        document.removeEventListener('resize', () => {
          setInnerWidth(window.innerWidth)
        })
      }
    }
  }, [])

  if (!window) return 0
  return innerWidth
}
