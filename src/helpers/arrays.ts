export const includeInArrayAtPosition = (
  originalArray: unknown[],
  position: number,
  element: unknown
): unknown[] => {
  originalArray.splice(position, 0, element)
  return originalArray
}
