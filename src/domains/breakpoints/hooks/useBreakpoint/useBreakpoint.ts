import { useState, useEffect } from 'react'

export function useBreakpoint(
  breakpoint: string,
  defaultState = false
): boolean {
  const [isMatch, setIsMatch] = useState(defaultState)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint})`)

    const checkMedia = (): void => {
      if (mediaQuery.matches) {
        setIsMatch(true)
      } else {
        setIsMatch(false)
      }
    }

    checkMedia()

    mediaQuery.addListener(checkMedia)

    return (): void => {
      mediaQuery.removeListener(checkMedia)
    }
  }, [breakpoint, setIsMatch])

  return isMatch
}
