/**
 * Toggles the overflow of the body element
 * @param condition - based on what condition should we toggle?
 * @param element - the HTML element on which to toggle overflow
 */
export const toggleElementOverflow: (
  condition: boolean,
  element: HTMLElement
) => void = (condition, element) =>
  condition
    ? element.setAttribute('style', 'overflow: visible')
    : element.setAttribute('style', 'overflow: hidden')
