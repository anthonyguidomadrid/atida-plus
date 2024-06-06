import { useEffect, RefObject, useReducer } from 'react'
type Size = {
  width: number | undefined
  height: number | undefined
}
// Recieves the reference of a node and returns its updated size when the screen is resized
// If no component is passed, it returns the size of the window
export const useSize = (component?: RefObject<HTMLDivElement>): Size => {
  // Initialize state with undefined width/height so server and client renders match

  const [size, setSize] = useReducer(
    state => {
      return {
        ...state,
        width: component?.current?.offsetWidth ?? window.innerWidth,
        height: component?.current?.offsetHeight ?? window.innerHeight
      }
    },
    {
      width: undefined,
      height: undefined
    }
  )

  useEffect(() => {
    window.addEventListener('resize', setSize)
    setSize()
    return () => window.removeEventListener('resize', setSize)
  }, [])

  return size
}
