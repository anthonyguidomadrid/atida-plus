const storage = globalThis?.sessionStorage

export const storeAlgoliaABTestingID = (
  algoliaABTestID: number | undefined,
  algoliaABTestVariantID: number | undefined
): void => {
  if (!storage) return

  const id =
    algoliaABTestID && algoliaABTestVariantID
      ? `${algoliaABTestID} + ${algoliaABTestVariantID}`
      : ''
  storage.setItem('algoliaABTestID', id)
}
