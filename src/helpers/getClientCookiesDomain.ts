export const getClientCookiesDomain = (
  hostname: string | undefined
): string | undefined => {
  switch (hostname) {
    case 'localhost':
      return 'localhost'
    case undefined:
      return undefined
    default:
      return `.${hostname}` // We add the dot to match the domains from cookies added from server side
  }
}
