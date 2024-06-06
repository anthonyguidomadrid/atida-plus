/**
 * @jest-environment node
 */
// @ts-ignore
import { GetServerSidePropsContext } from 'next'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { getBrandFulfill, getBrandTrigger } from '~domains/brand'
import { PageType } from '~domains/page'
import { contentFulfill, contentTrigger } from '~domains/product'
import { RootState } from '~domains/redux'
import { getProductDataProps } from '../get-product-data-props'

describe(getProductDataProps, () => {
  it('dispatches an action to fetch the product data', async () => {
    const dispatch = jest.fn()
    const props = await getProductDataProps(
      ({
        locale: 'pt-pt',
        req: {
          cookies: {
            session_channel: '{ "channel": "amazon", "sku": "some-sku" }'
          }
        },
        params: {
          all: ['some']
        }
      } as unknown) as GetServerSidePropsContext,
      // @ts-ignore
      {
        dispatch,
        getState: () =>
          ({
            server: {
              product: {
                content: {
                  data: {
                    categories: {
                      lvl0: ['beauty', 'beauty']
                    }
                  }
                }
              }
            }
          } as RootState)
      },
      {
        type: PageType.Product,
        identifier: 'some-product-sku'
      }
    )

    expect(dispatch).toHaveBeenCalledTimes(6)
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      contentTrigger({
        sku: 'some-product-sku',
        sessionChannel: { channel: 'amazon', sku: 'some-sku' }
      })
    )
    expect(dispatch).toHaveBeenNthCalledWith(2, getBrandTrigger())
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      type: 'product',
      [WAIT_FOR_ACTION]: contentFulfill().type
    })
    expect(dispatch).toHaveBeenNthCalledWith(4, {
      type: 'brands',
      [WAIT_FOR_ACTION]: getBrandFulfill().type
    })
    expect(props).toEqual({})
  })
})
