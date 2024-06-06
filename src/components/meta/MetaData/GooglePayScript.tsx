import { FunctionComponent } from 'react'
import Script from 'next/script'

export const GooglePayScript: FunctionComponent = () => {
  return <Script src="https://pay.google.com/gp/p/js/pay.js"></Script>
}
