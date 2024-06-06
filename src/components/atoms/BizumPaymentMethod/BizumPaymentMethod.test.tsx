import { screen } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import { BizumPaymentMethod } from './BizumPaymentMethod'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { createBizumPaymentResponseData } from '~domains/checkout/__mocks__/create-bizum-payment'
import { BizumResponseData } from '~domains/checkout/types'
import React from 'react'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'

describe(BizumPaymentMethod, () => {
  const setup = () =>
    renderWithStore(<BizumPaymentMethod />, {
      initialState: {
        client: {
          basket: {
            content: {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              data: basketWithProducts
            }
          }
        }
      }
    })

  describe(BizumPaymentMethod, () => {
    const setup = (
      isLoading: boolean,
      wasSuccess: boolean,
      wasError: boolean,
      details: BizumResponseData | undefined
    ) =>
      renderWithStore(
        <RouterContext.Provider value={routerMock}>
          <BizumPaymentMethod />
        </RouterContext.Provider>,
        {
          initialState: {
            client: {
              checkout: {
                bizum: {
                  isLoading: isLoading,
                  wasSuccess: wasSuccess,
                  wasError: wasError,
                  details: details
                }
              }
            }
          }
        }
      )

    it('displays the form once the bizum details are received and fill the inputs with the right values', () => {
      setup(false, true, false, createBizumPaymentResponseData)
      const bizumForm = screen.getByTestId('bizum-form')
      const bizumSignatureVersion = screen.getByTestId(
        'bizum-signature-version-input'
      )
      const bizumMerchantParameters = screen.getByTestId(
        'bizum-merchant-parameters-input'
      )
      const bizumSignature = screen.getByTestId('bizum-ds-signature-input')
      expect(bizumForm).toBeInTheDocument()
      expect(bizumSignatureVersion).toHaveValue('HMAC_SHA256_V1')
      expect(bizumMerchantParameters).toHaveValue(
        'eyJEU19NRVJDSEFOVF9QQVlNRVRIT0RTIjoieiIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiIzNTI0NTgzNDMiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9BTU9VTlQiOiIyMTI5IiwiRFNfTUVSQ0hBTlRfT1JERVIiOiIxNjMzNjAxNzUxIiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVFVSTCI6IiIsIkRTX01FUkNIQU5UX1VSTE9LIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2NvbmZpcm1hdGlvbiIsIkRTX01FUkNIQU5UX1VSTEtPIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2ZhaWx1cmUifQ=='
      )
      expect(bizumSignature).toHaveValue(
        'nkd4d41E/d0Od+1fix5ZKH30pMcTVGWYqQ/EuyVn01E='
      )
    })
  })

  it('does not return the button', async () => {
    setup()
    const btn = screen.queryByTestId('bizum-payment-button')

    expect(btn).not.toBeInTheDocument()
  })
})
