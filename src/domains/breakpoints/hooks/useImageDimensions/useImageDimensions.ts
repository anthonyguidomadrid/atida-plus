import { useState, useEffect } from 'react'
import {
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_HEIGHT
} from '~config/constants/images'
import { breakpoints } from '~domains/breakpoints/config'
import { useBreakpoint } from '~domains/breakpoints'
import { ResponsiveDimensions } from '~components/atoms/Image/types'

export const useImageDimensions = (
  width?: ResponsiveDimensions,
  height?: ResponsiveDimensions
): {
  imageWidth: number
  imageHeight: number
} => {
  const [imageWidth, setImageWidth] = useState<number>(
    width?.xs || DEFAULT_IMAGE_WIDTH.xs
  )
  const [imageHeight, setImageHeight] = useState<number>(
    height?.xs || DEFAULT_IMAGE_HEIGHT.xs
  )

  const isGreaterThanXS = useBreakpoint(breakpoints.xs)
  const isGreaterThanSM = useBreakpoint(breakpoints.sm)
  const isGreaterThanMD = useBreakpoint(breakpoints.md)

  const getImageWidth = (): number => {
    // Default sizes are for full-width images (the same as the screen width in that breakpoint)
    if (!isGreaterThanXS) return width?.xs || DEFAULT_IMAGE_WIDTH.xs
    if (!isGreaterThanSM) return width?.sm || DEFAULT_IMAGE_WIDTH.sm
    if (!isGreaterThanMD) return width?.md || DEFAULT_IMAGE_WIDTH.md
    return width?.lg || DEFAULT_IMAGE_WIDTH.lg
  }

  const getImageHeight = (): number => {
    // Default sizes are for full-width images (the same as the screen width in that breakpoint)
    if (!isGreaterThanXS) return height?.xs || DEFAULT_IMAGE_HEIGHT.xs
    if (!isGreaterThanSM) return height?.sm || DEFAULT_IMAGE_HEIGHT.sm
    if (!isGreaterThanMD) return height?.md || DEFAULT_IMAGE_HEIGHT.md
    return height?.lg || DEFAULT_IMAGE_HEIGHT.lg
  }

  useEffect(() => {
    setImageWidth(getImageWidth())
    setImageHeight(getImageHeight())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGreaterThanXS, isGreaterThanSM, isGreaterThanMD])

  return { imageWidth, imageHeight }
}
