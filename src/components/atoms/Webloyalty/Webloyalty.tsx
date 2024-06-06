import { FunctionComponent, useEffect } from 'react'
import { WindowProdIDA } from '~domains/checkout/types'

declare global {
  interface Window {
    prodID: {
      a: WindowProdIDA[]
    }
  }
}

export type WebloyaltyProps = {
  ckw: string
  hash: string
  windowProdIDA: WindowProdIDA[] | undefined
  getWebloyalty: () => void
  pushToWindowProdIDAArray: (ckw: string, hash: string) => void
}

export const Webloyalty: FunctionComponent<WebloyaltyProps> = ({
  ckw,
  hash,
  windowProdIDA,
  getWebloyalty,
  pushToWindowProdIDAArray
}) => {
  useEffect(() => {
    if (windowProdIDA) {
      pushToWindowProdIDAArray(ckw, hash)
      getWebloyalty()
    }
  }, [ckw, getWebloyalty, hash, pushToWindowProdIDAArray, windowProdIDA])

  return (
    <div className="mt-2 font-semibold" data-testid="webloyalty">
      <div id={'w' + hash}></div>
    </div>
  )
}
