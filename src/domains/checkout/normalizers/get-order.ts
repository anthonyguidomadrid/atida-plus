import { BasketWithProducts } from '~domains/basket/types'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { SprykerOrderResponse, GetOrderResponseItem } from '../types'

export const normalizeGetOrder = (
  sprykerOrderData?: SprykerOrderResponse | undefined
): Omit<Partial<BasketWithProducts>, 'items'> | undefined => {
  const coupons =
    sprykerOrderData?.data?.attributes?.calculatedDiscounts &&
    Object.keys(sprykerOrderData?.data?.attributes?.calculatedDiscounts).map(
      _key => ({
        displayName:
          sprykerOrderData?.data?.attributes?.calculatedDiscounts?.[_key]
            ?.displayName,
        code:
          sprykerOrderData?.data?.attributes?.calculatedDiscounts?.[_key]
            ?.voucherCode,
        amount:
          sprykerOrderData?.data?.attributes?.calculatedDiscounts?.[_key]
            ?.sumAmount,
        discountKey:
          sprykerOrderData?.data?.attributes?.calculatedDiscounts?.[_key]
            ?.discountKey
      })
    )
  return removeUndefinedPropertiesFromObject({
    currency: sprykerOrderData?.data?.attributes?.currencyIsoCode,
    grandTotal: sprykerOrderData?.data?.attributes?.totals?.grandTotal,
    taxTotal: sprykerOrderData?.data?.attributes?.totals?.taxTotal,
    discountTotal: sprykerOrderData?.data?.attributes?.totals?.discountTotal,
    surchargeTotal: sprykerOrderData?.data?.attributes?.totals?.surchargeTotal,
    expenseTotal: sprykerOrderData?.data?.attributes?.totals?.expenseTotal,
    rewardTotal: sprykerOrderData?.data?.attributes?.totals?.rewardTotal,
    loyaltySpent: sprykerOrderData?.data?.attributes?.totals?.loyaltySpent,
    amountPaidByRealPayment:
      sprykerOrderData?.data?.attributes?.totals?.amountPaidByRealPayment,
    coupons,
    items: sprykerOrderData?.data?.attributes?.items?.map(
      (item: GetOrderResponseItem | undefined) => ({
        sku: item?.sku,
        quantity: item?.quantity,
        unitPrice: item?.unitPrice,
        tax: item?.unitTaxAmountFullAggregation,
        coupons,
        product: {
          name: item?.name,
          brand: {
            code: item?.brandCode,
            label: item?.brand
          },
          categories: item?.categoryList && {
            lvl0: [item?.categoryList?.split(',')[0]],
            lvl1: [item?.categoryList?.split(',')[1]],
            lvl2: [item?.categoryList?.split(',')[2]]
          },
          url: item?.urlSlug,
          largeImage: item?.metadata?.image
        },
        discount: item?.calculatedDiscounts?.[0]?.unitAmount,
        unitPriceToPayAggregation: item?.unitPriceToPayAggregation
      })
    )
  })
}
