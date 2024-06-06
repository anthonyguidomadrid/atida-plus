import { contentfulPageContentNormalized } from '~domains/page/__mocks__/contentfulPageContent'
import { mockedProducts } from '../../../__mocks__/pop/productsAndContentBlocks'
import {
  determineIfIsContentBlock,
  determineIfIsProduct,
  listOfProductsAndContentBlocks
} from './productsAndContentBlocks'

const productsAndBlocksListSmallerThanDesktop = listOfProductsAndContentBlocks(
  mockedProducts,
  false,
  contentfulPageContentNormalized
)
describe(determineIfIsProduct, () => {
  it('determines it is a product', () => {
    const isProduct: boolean = determineIfIsProduct(
      productsAndBlocksListSmallerThanDesktop[0]
    )
    expect(isProduct).toBe(true)
  })
  it('determines it is not a product', () => {
    const isContent: boolean = determineIfIsContentBlock(
      productsAndBlocksListSmallerThanDesktop[6]
    )
    expect(isContent).toBe(true)
  })
})

describe(listOfProductsAndContentBlocks, () => {
  it('adds the content blocks to the products every 6 products', () => {
    expect(productsAndBlocksListSmallerThanDesktop[6]).toBe(
      contentfulPageContentNormalized.contentBlocks[0]
    )
    expect(productsAndBlocksListSmallerThanDesktop[13]).toBe(
      contentfulPageContentNormalized.contentBlocks[1]
    )
    expect(productsAndBlocksListSmallerThanDesktop[17]).toBe(
      contentfulPageContentNormalized.contentBlocks[2]
    )
    expect(productsAndBlocksListSmallerThanDesktop[18]).toBe(
      contentfulPageContentNormalized.contentBlocks[3]
    )
  })
})

const productsAndBlocksListDesktop = listOfProductsAndContentBlocks(
  mockedProducts,
  true,
  contentfulPageContentNormalized
)
describe(determineIfIsProduct, () => {
  it('determines it is a product', () => {
    const isProduct: boolean = determineIfIsProduct(
      productsAndBlocksListDesktop[0]
    )
    expect(isProduct).toBe(true)
  })
  it('determines it is not a product', () => {
    const isContent: boolean = determineIfIsContentBlock(
      productsAndBlocksListDesktop[8]
    )
    expect(isContent).toBe(true)
  })
})

describe(listOfProductsAndContentBlocks, () => {
  it('adds the content blocks to the products every 8 products', () => {
    expect(productsAndBlocksListDesktop[8]).toBe(
      contentfulPageContentNormalized.contentBlocks[0]
    )
    expect(productsAndBlocksListDesktop[16]).toBe(
      contentfulPageContentNormalized.contentBlocks[1]
    )
    expect(productsAndBlocksListDesktop[17]).toBe(
      contentfulPageContentNormalized.contentBlocks[2]
    )
    expect(productsAndBlocksListDesktop[18]).toBe(
      contentfulPageContentNormalized.contentBlocks[3]
    )
  })
})
