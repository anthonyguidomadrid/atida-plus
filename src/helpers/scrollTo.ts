type ScrollLogicalPosition = 'center' | 'end' | 'nearest' | 'start'

export const scrollToElement = (
  element: Element | null,
  block?: ScrollLogicalPosition
): void => {
  if (element) {
    const shouldScrollWithoutAnimation = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    element.scrollIntoView({
      behavior: shouldScrollWithoutAnimation ? 'auto' : 'smooth',
      ...(block && { block })
    })
  }
}

export default scrollToElement
