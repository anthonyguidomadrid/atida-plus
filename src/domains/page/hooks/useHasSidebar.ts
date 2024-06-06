import { useState, useEffect } from 'react'

const useHasSidebar = function (): boolean {
  const [hasSidebar, setHasSidebar] = useState(false)

  useEffect(() => {
    const sidebarElement = document.querySelectorAll('[data-sidebar]')

    if (sidebarElement.length > 0) {
      setHasSidebar(true)
    }
  }, [hasSidebar])

  return hasSidebar
}

export default useHasSidebar
