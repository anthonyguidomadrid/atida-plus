export const checkIsFirstOrder = ({
  isLoggedIn,
  isRedirected,
  orderHistoryWasSuccess,
  numberOfOrdersFromHistory
}: {
  isLoggedIn: boolean
  isRedirected: boolean
  orderHistoryWasSuccess: boolean
  numberOfOrdersFromHistory: number
}) => {
  if (!isLoggedIn) {
    return true
  }
  if (isRedirected || !orderHistoryWasSuccess) {
    return numberOfOrdersFromHistory === 0
  }
  return numberOfOrdersFromHistory - 1 <= 0
}
