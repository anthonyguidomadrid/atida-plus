import { getBrowser } from './getBrowser'
import axios, { AxiosError, AxiosInstance } from 'axios'
import Router from 'next/router'
import { UpdatedJWTAndRefreshTokens } from '~domains/account/types'
import refreshTokenConsts from './../config/constants/refresh-token'
const processQueue = (error: Error | null, token: string | null = null) => {
  refreshTokenConsts.failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  refreshTokenConsts.failedQueue = []
}

const refreshToken = (error: AxiosError) => {
  const originalRequest: AxiosError['config'] & { _retry?: boolean } =
    error.config
  if (error?.response?.data?.isLogin) {
    return Promise.reject(error)
  }

  if (
    (error?.response?.status === 401 ||
      error?.response?.status === 403 ||
      error?.response?.status === 500) &&
    !originalRequest?._retry
  ) {
    if (refreshTokenConsts.isRefreshing) {
      return new Promise(function (resolve, reject) {
        refreshTokenConsts.failedQueue.push({ resolve, reject })
      })
        .then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token

          return axios(originalRequest)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }

    Object.assign(originalRequest, { _retry: true })

    refreshTokenConsts.isRefreshing = true

    return new Promise(function (resolve, reject) {
      axios
        .post<void, UpdatedJWTAndRefreshTokens>('/api/account/authentication', {
          withCredentials: true,
          headers: originalRequest.headers
        })
        .then(({ JWT }) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + JWT
          originalRequest.headers['Authorization'] = 'Bearer ' + JWT
          processQueue(null, JWT)
          resolve(axios(originalRequest))
        })
        .catch(err => {
          processQueue(err, null)
          reject(err)
          if (
            err?.response?.data?.details?.code === '404' ||
            err?.response?.data?.details?.message ===
              'account.update-tokens.unauthorized-request'
          ) {
            return
          }
          if (
            typeof window !== 'undefined' &&
            (err?.response?.data?.details?.code === '406' ||
              err?.response?.data?.details?.code === '403' ||
              err?.response?.data?.details?.code === '440')
          ) {
            if (err?.response?.data?.details?.isGuest) {
              Router.asPath === '/checkout'
                ? Router.push('/basket')
                : Router.reload()
            } else if (!err?.response?.data?.details?.isGuest) {
              const location = Router.asPath
              const browser = (getBrowser() ?? '').toLowerCase()
              if (browser?.includes('safari')) {
                Router.push('/logout').then(() => {
                  Router.push(`/login${location}`)
                })
              } else {
                Router.push(`/login${location}`).then(() => {
                  Router.reload()
                })
              }
            }
          }
        })
        .finally(() => {
          refreshTokenConsts.isRefreshing = false
        })
    })
  }

  return Promise.reject(error)
}

const addResponseRefreshTokenInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(response => response, refreshToken)
}

export default addResponseRefreshTokenInterceptor
