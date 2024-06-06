import { useEffect, useState } from 'react'

export const useMutationObserver = (
  targetEl: HTMLElement | null,
  cb: MutationCallback
) => {
  const [observer, setObserver] = useState<null | MutationObserver>(null)

  useEffect(() => {
    const obs = new MutationObserver(cb)
    setObserver(obs)
  }, [cb, setObserver])

  useEffect(() => {
    if (!observer) return
    typeof window !== 'undefined' &&
      targetEl &&
      observer.observe(targetEl, { attributes: true })
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [observer, targetEl])
}
