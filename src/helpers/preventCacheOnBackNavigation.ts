/**
 * Force a reload if the page is back/forward cached
 */
export const preventCacheOnBackNavigation = (): void => {
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      location.reload()
    }
  })
}
