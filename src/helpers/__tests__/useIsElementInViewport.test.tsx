import { fireEvent, render, waitFor } from '@testing-library/react'
import useIsElementInViewport from '~helpers/useIsElementInViewport'
import { setWindowSize } from '~test-helpers'
import { renderHook } from '@testing-library/react-hooks'
import { RefObject } from 'react'

describe(useIsElementInViewport, () => {
  const setup = ({ elementRef }: { elementRef: RefObject<HTMLDivElement> }) =>
    render(
      <div>
        <div style={{ height: '300px', width: '300px' }} ref={elementRef}></div>

        <div style={{ height: '1200px' }}></div>
      </div>
    )
  const windowSize = { width: 1920, height: 1080 }
  setWindowSize(windowSize)
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(
      (): DOMRect => {
        return {
          width: 300,
          height: 300,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          x: 0,
          y: 0,
          toJSON: jest.fn()
        }
      }
    )
  })

  it('Renders element at top and check if it is visible', async () => {
    const { result } = renderHook(() => useIsElementInViewport(true))
    setup({
      elementRef: result.current.elementRef as RefObject<HTMLDivElement>
    })
    fireEvent.scroll(window, { target: { scrollY: 1 } })

    await waitFor(() =>
      expect(result.current.isElementInViewport).toEqual(true)
    )
  })

  it('Renders element at top, scroll to 1200px and checks if element is in viewport', async () => {
    const { result } = renderHook(() => useIsElementInViewport(true))
    setup({
      elementRef: result.current.elementRef as RefObject<HTMLDivElement>
    })
    fireEvent.scroll(window, { target: { scrollY: 1200 } })

    await waitFor(() =>
      expect(result.current.isElementInViewport).toEqual(false)
    )
  })
})
