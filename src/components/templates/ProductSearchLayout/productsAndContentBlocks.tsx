import { Product } from '~domains/product'
import { ContentBlock, PageContent } from '~domains/page'
import { ProductsAndContentBlocksListItem } from '~domains/product/types'
import { includeInArrayAtPosition } from '~helpers'

export const determineIfIsProduct = (
  toBeDetermined: ProductsAndContentBlocksListItem
): toBeDetermined is Product => {
  if ((toBeDetermined as Product)?.name) {
    return true
  }
  return false
}

export const determineIfIsContentBlock = (
  toBeDetermined: ProductsAndContentBlocksListItem
): toBeDetermined is ContentBlock => !determineIfIsProduct(toBeDetermined)

export const listOfProductsAndContentBlocks = (
  listOfProducts: Partial<Product>[],
  isDesktop = false,
  content?: PageContent
): ProductsAndContentBlocksListItem[] => {
  let productsAndBlocksList: ProductsAndContentBlocksListItem[]
  // eslint-disable-next-line prefer-const
  productsAndBlocksList = [...listOfProducts]

  content?.contentBlocks?.forEach((block, index) => {
    const positionEverySixItems = (index + 1) * 7 - 1
    const positionEveryEightItems = (index + 1) * 9 - 1
    includeInArrayAtPosition(
      productsAndBlocksList,
      isDesktop ? positionEveryEightItems : positionEverySixItems,
      block
    )
  })
  return productsAndBlocksList
}
