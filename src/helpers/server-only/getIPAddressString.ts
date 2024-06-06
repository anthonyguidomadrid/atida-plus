export const getIPAddressString = (
  ipAddressHeader: string | string[] | undefined
): string | undefined => {
  return (Array.isArray(ipAddressHeader)
    ? ipAddressHeader[0]
    : ipAddressHeader
  )?.split(':')[0]
}
