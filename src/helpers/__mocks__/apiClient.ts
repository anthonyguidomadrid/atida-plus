import axios from 'axios'

export const createClient = jest.fn().mockReturnValue(axios)

export const createRequestLoggingInterceptor = jest.fn()
export const createResponseLoggingInterceptor = jest.fn()

export const erroConfig = {
  url: '/balance',
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'pt-pt',
    Authorization:
      'Bearer OiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6Ijc3Y2FhMjY1NGIzN2I1N2ZhYTY0Yzc0OWU2MjY2NTNlZmQ0ZTcxZDE5MjZmNTc3ODM4NGMxODhkMjhkNjEwNTliNDc3NjNjZmEzZGEzNGQ1IiwiaWF0IjoxNjYwNTc4MTIwLjU0NjcxNSwibmJmIjoxNjYwNTc4MTIwLjU0NjcxNywiZXhwIjoxNjYwNTk2MTIwLjUzMjA5OCwic3ViIjoie1wiY3VzdG9tZXJfcmVmZXJlbmNlXCI6XCJQVC0tMTUwNjAzXCIsXCJpZF9jdXN0b21lclwiOm51bGwsXCJsYXN0X3VzZWRfcGF5bWVudF9jb2RlXCI6XCJicmFpbnRyZWVfcGF5cGFsXCIsXCJoYXNfcHJldmlvdXNfc3VjY2Vzc2Z1bF9vcmRlclwiOnRydWV9Iiwic2NvcGVzIjpbImN1c3RvbWVyIl19.jH5vDEWXXkkNAaPhzsokimQb0k7EFdV3llsnM6RjDluT44wQDgDUInXiRAWaIWSSosGKyzG40Cc-0dIAMM3S0xNGVtmVtv8G0NRqZ58vyihWI4LuD59mCnpNpszOL_BheCZjiw_B--HxVqz7TNt3_2Q2C-Ud8q1rDCtES8zvyWeeohCzLvxLZwIMHTOACRc6fqevzk_QNdkv0AdZdHVy6CdRH4saBIHITpLymHHm32qcHYshqrBQ0WSEnHmdZpJkpgJ5EZODo_0RYIa0AJi-97QOuOYUoURjZZXTSjIJdHq4IEupPGPh6IXVV_Q3Did-LqGIbRyEA_E5aBAX-wEung',
    'User-Agent': 'axios/0.21.4'
  },
  baseURL: 'https://ledger.dev.atida.com',
  timeout: 0,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },
  start: 1660578203510,
  data: undefined
}
