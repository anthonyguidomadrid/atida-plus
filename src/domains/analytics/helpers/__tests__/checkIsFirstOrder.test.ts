import { checkIsFirstOrder } from '../checkIsFirstOrder'

describe(checkIsFirstOrder, () => {
  const payload = {
    isLoggedIn: false,
    isRedirected: true,
    orderHistoryWasSuccess: true,
    numberOfOrdersFromHistory: 2
  }
  it('returns true when isLoggedIn is false', () => {
    expect(checkIsFirstOrder(payload)).toEqual(true)
  })

  it('returns true when isLoggedIn is true, isRedirected is true and numberOfOrdersFromHistory is 0', () => {
    expect(
      checkIsFirstOrder({
        ...payload,
        isLoggedIn: true,
        numberOfOrdersFromHistory: 0
      })
    ).toEqual(true)
  })

  it('returns false when isLoggedIn is true, isRedirected is true and numberOfOrdersFromHistory is 1', () => {
    expect(
      checkIsFirstOrder({
        ...payload,
        isLoggedIn: true,
        numberOfOrdersFromHistory: 1
      })
    ).toEqual(false)
  })

  it('returns true when isLoggedIn is true, orderHistoryWasSuccess is false and numberOfOrdersFromHistory is 0', () => {
    expect(
      checkIsFirstOrder({
        ...payload,
        isLoggedIn: true,
        orderHistoryWasSuccess: false,
        numberOfOrdersFromHistory: 0
      })
    ).toEqual(true)
  })

  it('returns true when isLoggedIn is true, orderHistoryWasSuccess is false and numberOfOrdersFromHistory is 1', () => {
    expect(
      checkIsFirstOrder({
        ...payload,
        isLoggedIn: true,
        orderHistoryWasSuccess: false,
        numberOfOrdersFromHistory: 1
      })
    ).toEqual(false)
  })

  it('returns true when isLoggedIn is true, isRedirected is false, orderHistoryWasSuccess is true and numberOfOrdersFromHistory is 1', () => {
    expect(
      checkIsFirstOrder({
        ...payload,
        isLoggedIn: true,
        isRedirected: false,
        numberOfOrdersFromHistory: 1
      })
    ).toEqual(true)
  })

  it('returns false when isLoggedIn is true, isRedirected is false, orderHistoryWasSuccess is true and numberOfOrdersFromHistory is 2', () => {
    expect(
      checkIsFirstOrder({
        ...payload,
        isLoggedIn: true,
        isRedirected: false,
        numberOfOrdersFromHistory: 2
      })
    ).toEqual(false)
  })
})
