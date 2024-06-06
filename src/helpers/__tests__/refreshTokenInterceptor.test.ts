import axios, { AxiosStatic } from 'axios'
import addResponseRefreshTokenInterceptor from '../refreshTokenInterceptor'
import Router from 'next/router'
import { erroConfig } from '~helpers/__mocks__/apiClient'
import { refreshTokenResponse } from '~domains/account/__mocks__/token'
import refreshTokenConsts from '../../config/constants/refresh-token'

const generateErrorResponse = (
  status: number,
  isGuest: boolean,
  isLogin?: boolean
) => ({
  response: {
    status,
    data: {
      details: {
        code: status.toString(),
        isGuest
      },
      isLogin
    }
  }
})

const generateError = (
  status: number,
  isGuest: boolean,
  _retry = false,
  isLogin?: boolean
) => ({
  ...generateErrorResponse(status, isGuest, isLogin),
  config: { ...erroConfig, _retry }
})

jest.mock('axios', () => {
  return Object.assign(
    jest.fn(() => Promise.resolve({ data: 'data' })),
    {
      create: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn(),
          eject: jest.fn()
        },
        response: {
          use: jest.fn(),
          eject: jest.fn()
        }
      },
      get: () => Promise.resolve({ data: 'data' }),
      post: jest.fn(),
      defaults: { headers: { common: { Authorization: 'somethign' } } }
    }
  )
})

jest.mock('next/router', () => ({
  reload: jest.fn(),
  push: async () => {
    jest.fn()
  },
  asPath: '/checkout'
}))

describe('addResponseInterceptor tests', () => {
  let axiosClient: AxiosStatic | null = null

  it('adds a response interceptor to the axios instance', () => {
    const axiosClient = Object.assign({}, axios)
    addResponseRefreshTokenInterceptor(axiosClient)
    expect(axiosClient.interceptors.response.use).toHaveBeenCalled()
  })

  beforeEach(() => {
    axiosClient = Object.assign({}, axios)
    jest.resetModules()
    refreshTokenConsts.isRefreshing = false
    addResponseRefreshTokenInterceptor(axiosClient as AxiosStatic)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('fails', () => {
    it('pushes to basket when an error occurs and user is not logged', async () => {
      const interceptorErrorHandler = (axiosClient?.interceptors.response
        .use as jest.Mock).mock.calls[0][1]
      const spyPush = jest.spyOn(Router, 'push')
      const generatedError = generateError(403, true)
      //@ts-ignore
      axiosClient.mockRejectedValue(generatedError)
      ;((axiosClient as AxiosStatic).post as jest.Mock).mockRejectedValue(
        generatedError
      )

      try {
        await interceptorErrorHandler(generatedError)

        expect(true).toBe(false)
      } catch (error) {
        expect(spyPush).toHaveBeenCalledWith('/basket')
      }
    })

    it('reloads page when an error occurs and user is not logged', async () => {
      const interceptorErrorHandler = (axiosClient?.interceptors.response
        .use as jest.Mock).mock.calls[0][1]

      Router.asPath = '/my-atida-cash'
      const spyReload = jest.spyOn(Router, 'push')
      const generatedError = generateError(403, false)
      //@ts-ignore
      axiosClient.mockRejectedValue(generatedError)
      ;((axiosClient as AxiosStatic).post as jest.Mock).mockRejectedValue(
        generatedError
      )
      try {
        await interceptorErrorHandler(generatedError)

        expect(true).toBe(false)
      } catch (error) {
        expect(spyReload).toHaveBeenCalled()
      }
    })

    it('rejects with the error at the end of the interceptor', async () => {
      const interceptorErrorHandler = (axiosClient?.interceptors.response
        .use as jest.Mock).mock.calls[0][1]
      const generatedError = generateError(403, true, true)
      //@ts-ignore
      ;(axiosClient as AxiosStatic).mockResolvedValue(generatedError)
      ;((axiosClient as AxiosStatic).post as jest.Mock).mockResolvedValue(
        refreshTokenResponse
      )

      await expect(interceptorErrorHandler(generatedError)).rejects.toBe(
        generatedError
      )
    })

    it('rejects with the error at the end of the interceptor', async () => {
      const interceptorErrorHandler = (axiosClient?.interceptors.response
        .use as jest.Mock).mock.calls[0][1]

      const generatedError = generateError(403, true, true, true)
      //@ts-ignore
      ;(axiosClient as AxiosStatic).mockResolvedValue(generatedError)
      ;((axiosClient as AxiosStatic).post as jest.Mock).mockResolvedValue(
        refreshTokenResponse
      )

      await expect(interceptorErrorHandler(generatedError)).rejects.toBe(
        generatedError
      )
    })
  })

  describe('success', () => {
    it('resolves with refreshed token', async () => {
      const interceptorErrorHandler = (axiosClient?.interceptors.response
        .use as jest.Mock).mock.calls[0][1]
      const generatedError = generateError(403, true)
      //@ts-ignore
      ;(axiosClient as AxiosStatic).mockResolvedValue(generatedError)
      ;((axiosClient as AxiosStatic).post as jest.Mock).mockResolvedValue(
        refreshTokenResponse
      )

      await expect(
        interceptorErrorHandler(generatedError)
      ).resolves.not.toThrow()
    })
  })

  describe('pending', () => {
    it('pending within if statement', async () => {
      refreshTokenConsts.isRefreshing = true
      const interceptorErrorHandler = (axiosClient?.interceptors.response
        .use as jest.Mock).mock.calls[0][1]
      const generatedError = generateError(403, true)
      //@ts-ignore
      ;(axiosClient as AxiosStatic).mockResolvedValue(generatedError)
      ;((axiosClient as AxiosStatic).post as jest.Mock).mockResolvedValue(
        refreshTokenResponse
      )

      const result = interceptorErrorHandler(generatedError)
      expect(result).resolves.toEqual(expect.any(Object))
    })
  })
})
