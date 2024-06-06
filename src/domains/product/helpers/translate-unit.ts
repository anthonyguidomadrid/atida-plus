export const translateUnit = (
  unit: string,
  locale: string | undefined
): string => {
  if (unit === 'piece' && locale === 'pt-pt') {
    return '1 un'
  }
  if (unit === 'piece' && locale === 'es-es') {
    return '1 ud'
  }
  if (unit === 'piece' && locale === 'de-de') {
    return '1 st'
  }
  if (unit === 'piece' && locale === 'de-at') {
    return '1 st'
  }
  return '1 piece'
}
