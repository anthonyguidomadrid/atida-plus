import {
  Html5QrcodeScanner,
  Html5QrcodeScanType,
  Html5QrcodeSupportedFormats
} from 'html5-qrcode'
import { FunctionComponent, useEffect } from 'react'

export type QrDimensions = {
  width: number
  height: number
}
export declare type QrDimensionFunction = (
  viewfinderWidth: number,
  viewfinderHeight: number
) => QrDimensions

export type DecodedSuccessResult = {
  decodedText: string
  result: { format?: { format: number; formatName: string }; text: string }
}

export type QRCodeScannerProps = {
  className?: string
  config?: {
    fps: number
    qrbox?: number | QrDimensions | QrDimensionFunction | undefined
    aspectRatio?: number | undefined
    disableFlip?: boolean | undefined
    rememberLastUsedCamera?: boolean | undefined
    supportedScanTypes: Array<Html5QrcodeScanType> | []
    formatsToSupport: Array<Html5QrcodeSupportedFormats> | []
    showTorchButtonIfSupported?: boolean | undefined
  }
  onScanSuccess: (
    decodedText: string,
    decodedResult: DecodedSuccessResult
  ) => void
  onScanFailure: () => void
}

export const QRCodeScanner: FunctionComponent<QRCodeScannerProps> = ({
  className,
  config = {
    fps: 10,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    formatsToSupport: [Html5QrcodeSupportedFormats.DATA_MATRIX]
  },
  onScanSuccess,
  onScanFailure,
  ...props
}) => {
  const QR_CODE_REGION_ID = 'html5qr-code-full-region'

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      QR_CODE_REGION_ID,
      config,
      /* verbose= */ true
    )
    scanner.render(onScanSuccess, onScanFailure)
    return () => {
      scanner.clear()
    }
  }, [config, onScanFailure, onScanSuccess])

  return (
    <div
      id={QR_CODE_REGION_ID}
      className={className}
      data-testid="html5qr-code-full-region"
      {...props}
    />
  )
}
