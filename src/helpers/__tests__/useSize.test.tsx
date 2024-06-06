import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { RefObject } from 'react'

import { useSize } from '~helpers/useSize'
import { setWindowSize } from '~test-helpers'

describe(useSize, () => {
  it('returns the size of the component', async () => {
    const { result } = renderHook(() =>
      useSize({
        current: { offsetWidth: 800, offsetHeight: 800 }
      } as RefObject<HTMLDivElement>)
    )
    expect(result.current).toEqual({ width: 800, height: 800 })
  })

  it('returns the size of the window when the component is undefined', async () => {
    const window = { width: 1920, height: 1080 }
    setWindowSize(window)
    const { result } = renderHook(() => useSize())
    await waitFor(() => expect(result.current).toEqual(window))
    setWindowSize({ width: 800, height: 800 })
    waitFor(() => expect(result.current).toEqual({ width: 800, height: 800 }))
  })
})
