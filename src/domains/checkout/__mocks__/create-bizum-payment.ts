import { customerData } from './checkout'

export const createBizumPaymentData = {
  amount: 2129,
  invoice_ref: 'ES--9003',
  customer: customerData,
  success_url: `somehost.com/confirmation`,
  failure_url: `somehost.com/unsuccessful`
}

export const createBizumPaymentResponseData = {
  form_url: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  internal_ref: '722cd524-95bc-4517-a345-c0e843ff7ddb',
  merchant_params:
    'eyJEU19NRVJDSEFOVF9QQVlNRVRIT0RTIjoieiIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiIzNTI0NTgzNDMiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9BTU9VTlQiOiIyMTI5IiwiRFNfTUVSQ0hBTlRfT1JERVIiOiIxNjMzNjAxNzUxIiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVFVSTCI6IiIsIkRTX01FUkNIQU5UX1VSTE9LIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2NvbmZpcm1hdGlvbiIsIkRTX01FUkNIQU5UX1VSTEtPIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2ZhaWx1cmUifQ==',
  signature: 'nkd4d41E/d0Od+1fix5ZKH30pMcTVGWYqQ/EuyVn01E=',
  signature_version: 'HMAC_SHA256_V1'
}
