import { useEffect, useMemo, useState } from 'react'

export const useIsBrowser: () => boolean = () => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false)
  const browser = useMemo(
    () => (process as NodeJS.Process & { browser: boolean }).browser,
    []
  )

  useEffect(() => {
    setIsBrowser(browser)
  }, [browser])

  return isBrowser
}
