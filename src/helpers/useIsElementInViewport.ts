import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

interface IUseIsElementInViewportReturn {
  isElementInViewport: boolean
  elementRef: RefObject<HTMLElement> | RefObject<HTMLDivElement>
}

const useIsElementInViewport = (
  initialValue = false
): IUseIsElementInViewportReturn => {
  const [isElementInViewport, setIsElementInViewport] = useState(initialValue)
  const elementRef = useRef<HTMLElement>(null)

  const onScroll = useCallback(() => {
    if (elementRef.current) {
      const { top, height } = elementRef.current.getBoundingClientRect()
      const bodyRect = document.body.getBoundingClientRect()
      const offset = top - bodyRect.top

      setIsElementInViewport(offset + height > window.scrollY)
    }
  }, [])

  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return { elementRef, isElementInViewport }
}

export default useIsElementInViewport
