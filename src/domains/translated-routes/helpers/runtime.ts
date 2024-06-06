import getConfig from 'next/config'
import {
  fallbackLocale,
  fallbackEnabledLocales,
  fallbackAvailableLocales,
  fallbackForeignRedirectionLocales,
  fallbackAllAvailableLocales,
  fallbackAllEnabledLocales
} from '../config/constants'

export const getDefaultLocale = (): string =>
  getConfig()?.publicRuntimeConfig?.defaultLocale ?? fallbackLocale

export const getAvailableLocales = (): string[] =>
  getConfig()?.publicRuntimeConfig?.availableLocales ?? fallbackAvailableLocales

export const getAllAvailableLocales = (): string[] =>
  getConfig()?.publicRuntimeConfig?.allAvailableLocales ??
  fallbackAllAvailableLocales

export const getEnabledLocales = (): string[] =>
  getConfig()?.publicRuntimeConfig?.enabledLocales ?? fallbackEnabledLocales

export const getAllEnabledLocales = (): string[] =>
  getConfig()?.publicRuntimeConfig?.allEnabledLocales ??
  fallbackAllEnabledLocales

export const getForeignRedirectionLocales = (): string[] =>
  getConfig()?.publicRuntimeConfig?.foreignRedirectionLocales ??
  fallbackForeignRedirectionLocales

export const getLocaleKey = (locale?: string) => {
  const sanitizedLocale = locale?.replace('-', '_').toLowerCase()

  if (
    sanitizedLocale === getDefaultLocale().replace('-', '_').toLowerCase() ||
    sanitizedLocale === undefined ||
    sanitizedLocale === null ||
    sanitizedLocale === ''
  ) {
    return getEnabledLocales()[0].replace('-', '_').toLowerCase()
  }

  return sanitizedLocale
}
