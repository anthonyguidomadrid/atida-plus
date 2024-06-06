import 'globalthis'

export const setPageSegmentInfo = (name: string, type: string): void => {
  const storage = globalThis?.sessionStorage
  if (!storage) return

  storage.setItem('pageName', name)
  storage.setItem('pageType', type)
}

export const setPreviousPageSegmentInfo = (
  previousPageName?: string,
  previousPageType?: string
): void => {
  const storage = globalThis?.sessionStorage
  if (!storage) return

  const previousPageNameInStorage: string = storage.getItem('pageName') || ''
  const previousPageTypeInStorage: string = storage.getItem('pageType') || ''

  storage.setItem(
    'previousPageName',
    previousPageName || previousPageNameInStorage
  )
  storage.setItem(
    'previousPageType',
    previousPageType || previousPageTypeInStorage
  )
}
