import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useRef,
  useState
} from 'react'

import { Product } from '~domains/product'
import { ContentBlocksLayout } from '~components/templates/ContentBlocksLayout'
import { ProductTile } from '~components/molecules/ProductTile'
import { ProductsAndContentBlocksListItem } from '~domains/product/types'
import {
  determineIfIsContentBlock,
  determineIfIsProduct
} from '~components/templates/ProductSearchLayout/productsAndContentBlocks'
import classNames from 'classnames'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type ProductListItem = ProductsAndContentBlocksListItem
export type ProductListProps = ComponentPropsWithoutRef<'ul'> & {
  products: ProductListItem[]
  addToBasket?: (product: Product) => void
  removeFromBasket?: (product: Product) => void
  addToFavourites?: (sku: string) => void
  removeFromFavourites?: (sku: string) => void
  addedFrom?: string
  changeQuantity?: (sku: string, quantity: number, id: string) => void
  openBasketModal?: (product: Product) => void
  isFavouritesPage?: boolean
  listId?: string
  isModalOpen?: boolean
}

export const ProductList: FunctionComponent<ProductListProps> = ({
  products,
  addToBasket,
  removeFromBasket,
  addToFavourites,
  removeFromFavourites,
  addedFrom = '',
  changeQuantity,
  openBasketModal,
  listId,
  isFavouritesPage = false,
  isModalOpen
}) => {
  const isUpdatePageNumberInUrlOnProductClickEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_UPDATE_PAGE_NUMBER_IN_URL_ON_PRODUCT_CLICK
  )

  const [productMarkerId, setProductMarkerId] = useState<string | null>(null)

  const storage = globalThis?.sessionStorage

  const persistedId =
    storage && storage.getItem('scroll-position-product-id-marker')

  useEffect(() => {
    if (!isFavouritesPage) {
      setProductMarkerId(persistedId)
    }
  }, [isFavouritesPage, persistedId])

  const restorationRef = useRef<HTMLDivElement>(null)

  return (
    <ul>
      {products.map((product, idx) => {
        return (
          <li
            key={`product-and-contentblock-${idx}`}
            className={classNames({
              'p-2 border-t border-b border-ui-grey-light col-span-full sm:px-0 sm:py-3 lg:py-4':
                product && determineIfIsContentBlock(product)
            })}
          >
            {product && determineIfIsProduct(product) && (
              <ProductTile
                addedFrom={addedFrom}
                restorationRef={
                  isUpdatePageNumberInUrlOnProductClickEnabled &&
                  productMarkerId === product.sku
                    ? restorationRef
                    : null
                }
                listId={listId}
                idx={idx}
                productPage={product.productPage}
                name={product.name}
                brand={product.brand}
                categories={product.categories}
                sku={product.sku}
                gtin={product.gtin}
                availability={product.availability}
                format={product.format}
                productDatImage={product.productDatImage}
                thumbnailImage={product.thumbnailImage}
                mediumImage={product.mediumImage}
                largeImage={product.largeImage}
                productTileImage={product.productTileImage}
                productTileRetinaImage={product.productTileRetinaImage}
                unitVolume={product.unitVolume}
                contentSizeFactor={product.contentSizeFactor}
                price={product.price}
                pricePerUnit={product.pricePerUnit}
                basketQuantity={product.basketQuantity}
                rrp={product.rrp}
                url={product.url}
                pzn={product.pzn}
                labels={product.labels}
                openBasketModal={product => openBasketModal?.(product)}
                isFavouritesPage={isFavouritesPage}
                addToBasket={product => addToBasket?.(product)}
                removeFromBasket={product => removeFromBasket?.(product)}
                addToFavourites={sku => addToFavourites?.(sku)}
                removeFromFavourites={sku => removeFromFavourites?.(sku)}
                changeQuantity={(sku, quantity, id) =>
                  changeQuantity?.(sku, quantity, id)
                }
                key={`${product?.name}-${product?.sku}-${idx}`}
                maxQuantity={product.maxQuantity}
                rating={product.rating}
                isModalOpen={isModalOpen}
              />
            )}
            {product && determineIfIsContentBlock(product) && (
              <ContentBlocksLayout
                contentBlocks={Array.of(product)}
                key={`${product?.title}-${idx}`}
                isContainer={false}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}
