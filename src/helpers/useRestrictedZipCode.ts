// Check if Zip Code Destination valid for PT
export const useRestrictedZipCode = (
  zipCode: string,
  locale: string
): boolean => {
  const zipCodeStart = parseInt(zipCode.substring(0, 4))
  let isRestrictedZip = false

  // Check Locale and PT Restricted Zip Codes
  if (locale === 'pt-pt') {
    if (zipCodeStart >= 9000 && zipCodeStart <= 9999) {
      isRestrictedZip = true
    }
  }

  return isRestrictedZip
}
