import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import type { MutableRefObject } from 'react'

/**
 * Hook for handling closing when clicking outside of an element
 */
export const useDetectOutsideClick = (
  el: MutableRefObject<HTMLElement | null>,
  initialState: boolean,
  isLoading?: boolean,
  callback?: () => void
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState(initialState)
  const [
    isMouseDownOutsideTargetArea,
    setIsMouseDownOutsideTargetArea
  ] = useState(false)

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      // if the active element exists and the mousedown event occurs outside of it
      if (
        el.current !== null &&
        !el.current.contains(e.target as HTMLElement) &&
        !isLoading
      ) {
        setIsMouseDownOutsideTargetArea(true)
      }
    }

    const onMouseUp = (e: MouseEvent) => {
      // if the active element exists, and
      // the mouseup event occurs outside of it, and
      // the previous mousedown event also occurred outside of it
      if (
        el.current !== null &&
        !el.current.contains(e.target as HTMLElement) &&
        isMouseDownOutsideTargetArea &&
        !isLoading
      ) {
        callback?.()
        setIsActive(!isActive)
      }
      setIsMouseDownOutsideTargetArea(false)
    }

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mouseup', onMouseUp)
    }

    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isActive, el, isLoading, isMouseDownOutsideTargetArea, callback])

  return [isActive, setIsActive]
}
