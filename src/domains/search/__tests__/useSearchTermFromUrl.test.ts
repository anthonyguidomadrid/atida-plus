import { renderHook } from '@testing-library/react-hooks'
import { useRouter } from 'next/router'
import { useSearchTermFromUrl } from '..'

describe(useSearchTermFromUrl, () => {
  it('returns the search term from the query', () => {
    ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
      query: {
        search: 'some search term'
      }
    }))

    const { result } = renderHook(() => useSearchTermFromUrl())
    expect(result.current).toEqual('some search term')
  })

  it('returns an empty string from the query', () => {
    ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
      query: {
        search: ''
      }
    }))

    const { result } = renderHook(() => useSearchTermFromUrl())
    expect(result.current).toEqual('')
  })

  it('does not error when no search term parameter', () => {
    ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
      query: {}
    }))

    const { result } = renderHook(() => useSearchTermFromUrl())
    expect(result.current).toEqual(undefined)
  })

  it('does not error when no query', () => {
    ;(useRouter as jest.Mock).mockImplementationOnce(() => ({}))

    const { result } = renderHook(() => useSearchTermFromUrl())
    expect(result.current).toEqual(undefined)
  })
})
