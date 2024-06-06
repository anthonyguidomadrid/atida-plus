export const removeUndefinedPropertiesFromObject = <
  T extends Record<string, unknown>
>(
  obj: T
): T =>
  Object.keys(obj).reduce((newObj, current) => {
    if (typeof obj[current as string] !== 'undefined') {
      return {
        ...newObj,
        [current as string]: obj[current]
      }
    }

    return newObj
  }, {} as T)
