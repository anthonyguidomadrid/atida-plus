export const updateNestedValue = (
  path: string,
  object: Record<string, string | number | boolean | unknown>,
  value:
    | string
    | number
    | boolean
    | Record<string, string | number | boolean | unknown>
): Record<string, string | number | boolean | unknown> => {
  let updatedObject = { ...object }
  let lastKey: string | undefined = undefined
  path
    .split('.')
    .reduce(
      (
        previous:
          | Record<string, string | number | boolean | symbol | unknown>
          | string,
        current: keyof typeof previous | string
      ) => {
        if (typeof previous[current as keyof typeof previous] === 'object') {
          updatedObject = {
            ...updatedObject,
            [current]: previous[current as keyof typeof previous]
          }
          lastKey = current as string
          return previous[current as keyof unknown]
        } else {
          if (lastKey && typeof previous !== 'string') {
            updatedObject = {
              ...updatedObject,
              [lastKey]: { ...previous, [current]: value }
            }
            previous[current as keyof typeof previous] = value
          } else {
            updatedObject = {
              ...updatedObject,
              [current]: value
            }
            object[current] = value
          }
          return previous[current as keyof unknown]
        }
      },
      updatedObject
    )
  return updatedObject
}
