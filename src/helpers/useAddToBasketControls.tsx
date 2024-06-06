import { useState } from 'react'
import useInView from 'react-cool-inview'

export const useAddToBasketControls = (): {
  addToBasketControlsRef: (element?: HTMLElement | null | undefined) => void
  areAddToBasketControlsInView: boolean
  newQuantitySelectorValue: number
  setNewQuantitySelectorValue: React.Dispatch<React.SetStateAction<number>>
} => {
  const {
    observe: addToBasketControlsRef,
    inView: areAddToBasketControlsInView
  } = useInView()

  const [
    newQuantitySelectorValue,
    setNewQuantitySelectorValue
  ] = useState<number>(1)

  return {
    addToBasketControlsRef,
    areAddToBasketControlsInView,
    newQuantitySelectorValue,
    setNewQuantitySelectorValue
  }
}
