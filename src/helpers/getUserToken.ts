import { cookieStorageMechanism } from './storage'

export const getUserToken = (): string | undefined => {
  const userId = cookieStorageMechanism().get('ajs_user_id')
  const anonymousId = cookieStorageMechanism().get('ajs_anonymous_id')
  const userToken = userId ? userId : anonymousId
  return userToken?.toString()?.replaceAll('"', '')
}
