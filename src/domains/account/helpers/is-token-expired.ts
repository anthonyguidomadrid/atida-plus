import dayjs from 'dayjs'

export const isTokenExpired = (expiry: number): boolean => {
  const expiryDate = dayjs.unix(expiry)

  if (!expiryDate.isValid()) {
    return true
  }

  const today = dayjs()

  return expiryDate.isBefore(today)
}
