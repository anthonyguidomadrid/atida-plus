export const normalizeNonPrintableCharacters = (
  str: string | undefined
): string => {
  return str ? str.normalize('NFD').replace(/[^a-zA-Z ]/g, '') : ''
}

export const stripSlashAndBackslashFromAddress = (
  address: string | undefined | null
): string => {
  return address ? address?.slice(0, 50)?.replace(/\/|\\/g, '') : ''
}
