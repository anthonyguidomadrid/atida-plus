import { FunctionComponent } from 'react'
import Script from 'next/script'

export const WebloyaltyScript: FunctionComponent = () => {
  return (
    <Script data-testid="webloyalty-script">{`var prodID = { "a": [], "c": 0, "u": "", "r": false }; function _lppr(v){for(var i=0;i<prodID.a.length;i++){if(prodID.a[i].h===v){return i;}}}`}</Script>
  )
}
