import { renderHook } from '@testing-library/react-hooks'
import { setupMatchMediaMock } from './useBreakpoint.mock'
import { useBreakpoint } from './useBreakpoint'

describe(useBreakpoint, () => {
  describe('When: hook is used', () => {
    it('Then: it listens on screen size changes', () => {
      const addListener = jest.fn()
      const removeListener = jest.fn()
      const { reset } = setupMatchMediaMock(true, {
        addListener,
        removeListener
      })
      renderHook(() => useBreakpoint('500px', false))
      expect(addListener).toHaveBeenCalledTimes(1)
      expect(removeListener).toHaveBeenCalledTimes(0)
      reset()
    })
  })

  describe('When: hook is unmounted', () => {
    it('Then: it removes screen size listener', () => {
      const addListener = jest.fn()
      const removeListener = jest.fn()
      const { reset } = setupMatchMediaMock(true, {
        addListener,
        removeListener
      })
      const { unmount } = renderHook(() => useBreakpoint('500px', false))
      unmount()
      expect(removeListener).toHaveBeenCalledTimes(1)
      reset()
    })
  })

  describe('When: breakpoint is 500px', () => {
    describe('And: min-width of screen is at least 500px', () => {
      it('Then: it returns true', () => {
        const { reset } = setupMatchMediaMock(true)
        const { result } = renderHook(() => useBreakpoint('500px', false))
        expect(result.current).toBe(true)
        reset()
      })
    })

    describe('And: min-width of screen is smaller than 500px', () => {
      it('Then: it returns false', () => {
        const { reset } = setupMatchMediaMock(false)
        const { result } = renderHook(() => useBreakpoint('500px', false))
        expect(result.current).toBe(false)
        reset()
      })
    })
  })
})
