/*  
  Note: there is a known limitation with this function – by specifying a certain forbidden key,
  you are marking that key (e.g. `zipCode`) as forbidden regardless of which parent it
  belongs to. This means that if you wish to exclude a key from being trimmed, all matching
  keys are also exluded (e.g. `shipping.zipCode` and `billing.zipCode`) 
*/

export const recursiveTrimObjectValues = (
  values: Record<string, unknown>,
  options?: {
    forbiddenKeys?: string[]
  }
): void => {
  Object.keys(values).map((k: string) => {
    if (typeof values[k] == 'object' && values[k] !== null)
      recursiveTrimObjectValues(values[k] as Record<string, unknown>, options)
    if (typeof values[k] === 'string') {
      if (options?.forbiddenKeys && options?.forbiddenKeys.includes(k)) {
        return
      }
      values[k] = (values[k] as string).trim()
    }
  })
}
