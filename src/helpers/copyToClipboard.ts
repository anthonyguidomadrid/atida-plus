import { Dispatch, SetStateAction } from 'react'

export const copyToClipboard = (
  copiedContent: string | undefined,
  setIsCopiedState?: Dispatch<SetStateAction<string>>,
  timeout = 4000
) => {
  if (copiedContent) {
    navigator?.clipboard.writeText(copiedContent)
    setIsCopiedState && setIsCopiedState(copiedContent)
  }

  const copiedVoucherNotificationTimer = setTimeout(() => {
    setIsCopiedState && setIsCopiedState('')
  }, timeout)

  return () => {
    clearTimeout(copiedVoucherNotificationTimer)
  }
}
