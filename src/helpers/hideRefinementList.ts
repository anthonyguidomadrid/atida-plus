export const hideRefinementList = (): void => {
  const filterSubBrandPanel = document.querySelector('#filterSubBrandPanel')
  const filterBrandPanel = document.querySelector('#filterBrandPanel')
  const filterCategoryPanel = document.querySelector('#filterCategoryPanel')
  const filterCategoryLevel1Panel = document.querySelector(
    '#filterCategoryLevel1Panel'
  )
  const filterCategoryLevel2Panel = document.querySelector(
    '#filterCategoryLevel2Panel'
  )
  const filterFormatPanel = document.querySelector('#filterFormatPanel')

  const filters = [
    filterBrandPanel,
    filterSubBrandPanel,
    filterCategoryLevel1Panel,
    filterCategoryPanel,
    filterFormatPanel,
    filterCategoryLevel2Panel
  ]

  filters.forEach(item => {
    const elementChildren = item?.querySelectorAll('.ais-Panel--noRefinement')

    if (elementChildren?.length === 1) {
      item?.classList.add('hidden')
    } else {
      item?.classList.remove('hidden')
    }
  })
}
