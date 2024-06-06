export const getFirstLetter = (
  string: string | undefined
): string | undefined => {
  return string && string.substring(0, 1)
}
