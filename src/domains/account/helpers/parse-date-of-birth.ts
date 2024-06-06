export const parseDateOfBirthFormat = (
  dateOfBirth?: string | null,
  parseToPresentational?: boolean
): string | null => {
  if (!dateOfBirth) return null
  if (parseToPresentational) {
    const [year, month, day] = dateOfBirth.split('-')
    return `${day}-${month}-${year}`
  }
  const [day, month, year] = dateOfBirth.split('-')
  return `${year}-${month}-${day}`
}
