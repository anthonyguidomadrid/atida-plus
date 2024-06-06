import { renderHook } from '@testing-library/react-hooks'
import { setupMatchMediaMock } from '../useBreakpoint'
import { useImageDimensions } from './useImageDimensions'

describe(useImageDimensions, () => {
  describe('When the breakpoint is LG', () => {
    it('returns the correct image dimensions', () => {
      const { reset } = setupMatchMediaMock(true)
      const { result } = renderHook(() => useImageDimensions())
      expect(result.current).toStrictEqual({
        imageHeight: 500,
        imageWidth: 1440
      })
      reset()
    })
  })
  describe('When the breakpoint is XS', () => {
    it('returns the correct image dimensions', () => {
      const { reset } = setupMatchMediaMock(false)
      const { result } = renderHook(() => useImageDimensions())
      expect(result.current).toStrictEqual({
        imageHeight: 250,
        imageWidth: 600
      })
      reset()
    })
  })
})
