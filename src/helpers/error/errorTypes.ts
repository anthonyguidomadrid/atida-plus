import { AxiosResponse } from 'axios'

export type ErrorWithMessage = {
  message: string
}

export type ErrorWithStack = {
  stack: string | null
}

export type ErrorWithName = {
  name: string | null
}

export type ErrorWithStatus = {
  status: number
}

export type ApiError<T = AxiosResponse> = {
  response: T
}

export type ContentfulError = Record<string, unknown> &
  Record<'sys', unknown> &
  Record<'details', unknown>

type ApiErrorDetail = {
  code?: string
  detail?: string
  message?: string
}

export interface ApiResponse extends AxiosResponse {
  data: {
    errors?: ApiErrorDetail[]
  }
}
