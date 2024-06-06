import { renderHook } from '@testing-library/react-hooks'
import { useRouter } from 'next/router'
import { useFormatAmount } from '..'

describe(useFormatAmount, () => {
  describe('when a valid currency and locale are provided', () => {
    it('can format the amount in gb locale', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'en-gb'
      }))

      const { result } = renderHook(() => useFormatAmount())
      expect(result.current(4323, 'liter')).toEqual('4,323 l')
      expect(result.current(4323, 'day')).toEqual('4,323 days')
      expect(result.current(2, 'hour')).toEqual('2 hrs')
      expect(result.current(1, 'hour')).toEqual('1 hr')
    })

    it('can format the amount in pt locale', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'pt-pt'
      }))

      const { result } = renderHook(() => useFormatAmount())
      expect(result.current(4323, 'liter')).toEqual('4323 l')
      expect(result.current(4323, 'day')).toEqual('4323 dias')
      expect(result.current(2, 'hour')).toEqual('2 h')
      expect(result.current(1, 'hour')).toEqual('1 h')
    })

    it('can format the our custom unit types', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'en-gb'
      }))

      const { result } = renderHook(() => useFormatAmount())
      expect(result.current(4323, 'PIECE', 'something')).toEqual(
        '4323 something'
      )
      expect(result.current(4323, 'PACK', 'else')).toEqual('4323 else')
      expect(result.current(4323, 'POTATO', 'potatoes')).toEqual('4323 potato')
    })
  })
})
