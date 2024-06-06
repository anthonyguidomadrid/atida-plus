export const setupMatchMediaMock = (
  matches = false,
  stubs = { addListener: jest.fn(), removeListener: jest.fn() }
): { reset: () => void } => {
  const originalMatchMedia = window.matchMedia
  window.matchMedia = (): {
    matches: boolean
    addListener: () => void
    removeListener: () => void
    // @ts-ignore
  } => ({
    matches,
    ...stubs
  })

  const reset = (): void => {
    window.matchMedia = originalMatchMedia
  }

  return {
    reset
  }
}
