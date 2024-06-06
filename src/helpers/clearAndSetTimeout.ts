const timeoutIds = new Map<string, number | ReturnType<typeof setTimeout>>()

export const clearAndSetTimeout = (ms: number, timeoutId: string) => {
  return new Promise(resolve => {
    if (timeoutIds.has(timeoutId)) {
      clearTimeout(timeoutIds.get(timeoutId))
    }
    timeoutIds.set(timeoutId, setTimeout(resolve, ms))
  })
}
