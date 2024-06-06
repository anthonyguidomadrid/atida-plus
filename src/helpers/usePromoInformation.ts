import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Promotion } from '~domains/contentful'
import { selectData } from '~domains/promotion'
import { parseHtml } from './parseHtml'

export const usePromoInformation = (): [
  Promotion[] | undefined,
  JSX.Element | JSX.Element[] | undefined
] => {
  const promotion = useSelector(selectData)
  const promoInformation = useMemo(
    () => promotion && parseHtml(promotion?.[0]?.promoInformation),
    [promotion]
  )

  return [promotion, promoInformation]
}
