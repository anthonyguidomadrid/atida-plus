import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios'

import { StorageMechanism } from '~types/StorageMechanism'
import { v4 as uuid } from 'uuid'
import { defaultStorageMechanism } from './storage'
import { logger } from './logger'
import { getUUIDName } from '~domains/account'
import { IAxiosCacheAdapterOptions } from 'axios-cache-adapter'
import {
  ApiError,
  ApiResponse,
  getErrorMessage,
  getErrorStack
} from '~helpers/error'
import addResponseRefreshTokenInterceptor from './refreshTokenInterceptor'

interface RequestConfig extends AxiosRequestConfig {
  start: number
  excludeAcceptLanguage?: boolean
}

type ClientOptions = {
  options?: AxiosRequestConfig
  locale?: string
  addAnonymousCustomerUniqueId?: boolean | string
  storageMechanism?: StorageMechanism
  interceptorOptions?: InterceptorOptions
}

type InterceptorOptions = {
  includeParams?: boolean
  mode?: 'contentful' | 'contentful-graphql' // could add others here like elastic search if needed
}

export const createRequestLoggingInterceptor = ({
  includeParams = false,
  mode
}: InterceptorOptions = {}) => (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const newConfig = config as RequestConfig
  let base = config.baseURL ?? ''
  if (base.length && !base.endsWith('/')) {
    base = `${base}/`
  }
  const url = base + config.url?.replace(base, '')

  logger.debug(
    {
      url,
      locale:
        config.headers['Accept-Language'] ??
        'accept-language header not present',
      params: includeParams ? config.params : undefined,
      ...(mode === 'contentful-graphql'
        ? { variables: config.data?.variables, query: config.data?.query }
        : {})
    },
    `sending API request to ${url}`
  )

  newConfig.start = new Date().getTime()

  return newConfig
}

export const createResponseLoggingInterceptor = ({
  includeParams = false,
  mode
}: InterceptorOptions = {}) => (response: AxiosResponse): AxiosResponse => {
  const cfg = (response?.config ?? {}) as RequestConfig
  const now = new Date().getTime()
  let base = cfg.baseURL ?? ''
  if (base.length && !base.endsWith('/')) {
    base = `${base}/`
  }
  const url = base + cfg.url?.replace(base, '')

  let graphqlBody = {}

  const logPayload = {
    url,
    response_code: response.status,
    time_in_ms: now - cfg.start,
    locale:
      cfg.headers['Accept-Language'] ?? 'accept-language header not present',
    from_cache: response.request?.fromCache ?? false,
    params: includeParams ? cfg.params : undefined,
    ...(mode === 'contentful' || mode === 'contentful-graphql'
      ? {
          x_contentful_request_id: response.headers?.['x-contentful-request-id']
        }
      : {})
  }

  if (mode === 'contentful-graphql') {
    try {
      graphqlBody = JSON.parse(response.config.data)
    } catch (err) {
      logger.error(
        {
          ...logPayload,
          data: response.config.data,
          error: getErrorMessage(err),
          stack: getErrorStack(err)
        },
        `Error while parsing GraphQL request data`
      )
    }
  }

  logger.debug(
    { ...logPayload, ...graphqlBody },
    `received API response from ${url}`
  )

  return response
}

export const createErrorLoggingInterceptor = ({
  includeParams = false
}: InterceptorOptions = {}) => (error: AxiosError): Promise<never> => {
  const { response } = error as ApiError<ApiResponse>
  const now = new Date().getTime()

  if (!response) {
    const cfg = error?.config ?? {}
    const base = cfg.baseURL ?? ''
    const url = base + cfg.url?.replace(base, '')

    logger.error(
      {
        url,
        urlFromErrorConfig: error?.config?.url,
        error: error.message,
        stack: error.stack,
        locale:
          cfg.headers['Accept-Language'] ?? 'accept-language header not present'
      },
      `Error while making API request`
    )

    return Promise.reject(error)
  }

  const cfg = (response?.config ?? {}) as RequestConfig
  const base = cfg.baseURL ?? ''
  const url = base + cfg.url?.replace(base, '')

  const logPayload = {
    url,
    response_code: response?.status,
    time_in_ms: now - cfg.start,
    locale:
      cfg.headers['Accept-Language'] ?? 'accept-language header not present',
    params: includeParams ? cfg.params : undefined,
    errors: Array.isArray(response?.data?.errors)
      ? JSON.stringify(
          response.data.errors.map(({ detail, message }) => detail || message)
        )
      : `${response?.data?.errors}`
  }

  const logMessage = `received unexpected API response from ${url}`

  if (response?.status === 404) {
    logger.info(logPayload, logMessage)
  } else {
    logger.error(logPayload, logMessage)
  }

  return Promise.reject(error)
}

export const createClient = ({
  options = {},
  locale,
  addAnonymousCustomerUniqueId = false,
  // TODO: need default local storage storage mechanism
  storageMechanism = defaultStorageMechanism(),
  interceptorOptions
}: ClientOptions): AxiosInstance => {
  const UUID_NAME = getUUIDName(locale)
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale
  }

  const defaultOptions = {
    baseURL: '/',
    withCredentials: true,
    headers,
    cache:
      interceptorOptions?.mode === 'contentful-graphql'
        ? {
            exclude: {
              // make sure not to exclude POST requests because GraphQL requests are POST requests
              methods: ['put', 'patch', 'delete']
            } as IAxiosCacheAdapterOptions['exclude']
          }
        : undefined
  }

  const getUuid = (): string => {
    let id = storageMechanism?.get(UUID_NAME)

    if (id) {
      return id
    }

    id = uuid()
    storageMechanism?.set(UUID_NAME, id)
    return id
  }

  const client = axios.create({
    ...defaultOptions,
    ...options,
    headers: { ...(defaultOptions.headers ?? {}), ...(options.headers ?? {}) }
  })

  client.interceptors.request.use((config: AxiosRequestConfig) => {
    const newConfig = { ...config }

    if (addAnonymousCustomerUniqueId === true) {
      newConfig.headers['X-Anonymous-Customer-Unique-Id'] = getUuid()
    }

    if (typeof addAnonymousCustomerUniqueId === 'string') {
      newConfig.headers[
        'X-Anonymous-Customer-Unique-Id'
      ] = addAnonymousCustomerUniqueId
    }

    return newConfig
  })

  client.interceptors.request.use(
    createRequestLoggingInterceptor(interceptorOptions)
  )

  client.interceptors.response.use(
    createResponseLoggingInterceptor(interceptorOptions),
    createErrorLoggingInterceptor(interceptorOptions)
  )

  addResponseRefreshTokenInterceptor(client)

  return client
}
