import Cookies, { CookieAttributes } from 'js-cookie'
import { StorageMechanism } from '~types/StorageMechanism'

export const defaultStorageMechanism = (): StorageMechanism | undefined =>
  typeof window !== 'undefined'
    ? {
        get: name => localStorage.getItem(name),
        set: (name, value) => localStorage.setItem(name, value),
        remove: name => localStorage.removeItem(name)
      }
    : undefined

export const cookieStorageMechanism = (): StorageMechanism => ({
  get: name => Cookies.get(name),
  set: (name, value, options) =>
    Cookies.set(name, value, options as CookieAttributes),
  remove: (name, options) => Cookies.remove(name, options as CookieAttributes)
})
