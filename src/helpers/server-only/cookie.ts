import { serialize, CookieSerializeOptions } from 'cookie'
import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

const defaultOptions: CookieSerializeOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV !== 'development',
  path: '/'
}

export type Cookie = {
  name: string
  value?: string | number | Record<string, unknown>
  options?: CookieSerializeOptions
}

const getString = (value: unknown) =>
  typeof value === 'object' ? JSON.stringify(value) : `${value}`

export function setCookies(
  res: NextApiResponse | ServerResponse,
  items: Cookie[],
  options: CookieSerializeOptions = {}
): void {
  const serializedItems = items.map(item =>
    serialize(item.name, getString(item.value), {
      ...defaultOptions,
      ...options,
      ...item.options
    })
  )
  res.setHeader('Set-Cookie', serializedItems)
}

export function clearCookies(
  res: NextApiResponse,
  names: string[],
  options: CookieSerializeOptions = {}
): void {
  const serializedItems = names.map(name =>
    serialize(name, '', { ...defaultOptions, maxAge: -1, ...options })
  )

  res.setHeader('Set-Cookie', serializedItems)
}

export function getCookie(
  req:
    | NextApiRequest
    | (IncomingMessage & {
        cookies: Partial<{
          [key: string]: string
        }>
      }),
  name: string
): string {
  return req.cookies[name] ?? ''
}
