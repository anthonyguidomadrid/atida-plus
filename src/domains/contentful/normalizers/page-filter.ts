import {
  PageFiltersQuery,
  FilterItem as ContentfulFilterItem,
  FilterCollection,
  Category
} from '~generated-graphql'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export type FilterItem = {
  label: string
  id: string
}

export type Filter = {
  title: string
  items: FilterItem[]
}

export type PageFilter = {
  items: Filter[]
}

const normalizeFilterItemCategory = (item: Category): FilterItem => ({
  id: item.id ?? '',
  label: item.title ?? ''
})

export const normalizeFilterItem = (
  item: ContentfulFilterItem | null
): FilterItem => {
  switch (item?.itemToFilterBy?.__typename) {
    case 'Category':
      return normalizeFilterItemCategory(item.itemToFilterBy)
    case 'Translation':
      return {
        id: item?.itemToFilterBy?.key ?? '',
        label: item?.filterItemName ?? ''
      }
    case 'TranslationInfoLabel':
      return {
        id: item?.itemToFilterBy?.labelKey ?? '',
        label: item?.filterItemName ?? ''
      }
    default:
      return { id: '', label: '' }
  }
}

export const normalizeFilter = (filter: FilterCollection): Filter =>
  removeUndefinedPropertiesFromObject({
    title: filter?.filterCollectionName ?? '',
    items: filter?.filterItemsCollection?.items
      ? filter?.filterItemsCollection?.items.map(normalizeFilterItem)
      : []
  })

export const normalizePageFilter = (
  pageFilters?: PageFiltersQuery
): PageFilter => {
  return pageFilters
    ? removeUndefinedPropertiesFromObject({
        items: (
          pageFilters?.filterPageTypeCollection?.items?.[0]
            ?.pageFiltersCollection?.items || []
        ).map(i => normalizeFilter((i as unknown) as FilterCollection))
      })
    : { items: [] }
}
