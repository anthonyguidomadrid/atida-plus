import { useTranslation } from 'react-i18next'
import { Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { Button } from '~components/atoms/Button'
import { Notification } from '~components/atoms/Notification'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { DecodedSuccessResult, QRCodeScanner } from '../QRCodeScanner'
import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  FunctionComponentElement,
  SVGAttributes,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'
import { useSize } from '~helpers/useSize'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import {
  getPrescriptionNotificationProps,
  getPrescriptionDescriptionTitle,
  getPrescriptionDescriptionContent
} from '~helpers/prescription'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { useSelector } from 'react-redux'
import { selectPrescriptionErrorMessage } from '~domains/basket/selectors/prescription'

const uploaderConfig = {
  fps: 24,
  qrbox: 250,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_FILE],
  formatsToSupport: [Html5QrcodeSupportedFormats.DATA_MATRIX]
}

export type ScannerUploaderProps = ComponentPropsWithoutRef<'div'> & {
  handleFileUpload: () => void
  handleScanError: () => void
  handleScanSuccess: (
    _decodedText: string,
    decodedResult: DecodedSuccessResult
  ) => void
  handleAddPrescriptionToBasket: () => void
  handleAllowPermission: () => void
  uploadedPrescription: string[]
  isScanner: boolean
  isDesktop: boolean
  isSmallScreen: boolean
  isUploadLoading: boolean
  isUploadError: boolean
  isPrescriptionAddedToBasket: boolean
  numberOfItemsAddedToBasket: number
  icon: FunctionComponentElement<SVGAttributes<'svg'>>
  showUploaderButton: boolean
  hasPermission: boolean
  isPermissionStepPassed: boolean
  prescriptionMobileNavigationRef: HTMLDivElement | null
}

export const ScannerUploader: FunctionComponent<ScannerUploaderProps> = ({
  handleFileUpload,
  handleScanError,
  handleScanSuccess,
  handleAddPrescriptionToBasket,
  handleAllowPermission,
  uploadedPrescription,
  isScanner,
  isDesktop,
  isSmallScreen,
  isUploadLoading,
  isUploadError,
  isPrescriptionAddedToBasket,
  numberOfItemsAddedToBasket,
  icon,
  showUploaderButton,
  hasPermission,
  isPermissionStepPassed,
  prescriptionMobileNavigationRef
}) => {
  const { t } = useTranslation()
  const { width, height } = useSize()
  const isLargeScreen = useBreakpoint(breakpoints.lg)

  const [isStoppedScanning, setIsStoppedScanning] = useState(false)
  const isStartButtonEventHandlerAdded = useRef(false)

  const scannerConfig = useMemo(() => {
    const topHeaderHeight =
      document.getElementById('top-header')?.offsetHeight ?? 0

    const headerHeight = document.getElementById('header')?.offsetHeight ?? 0

    const prescriptionMobileNavigationHeight =
      prescriptionMobileNavigationRef?.offsetHeight ?? 0

    const prescriptionMobileNavigationMarginTop = prescriptionMobileNavigationRef
      ? parseInt(getComputedStyle(prescriptionMobileNavigationRef).marginTop)
      : 24

    const prescriptionMobileNavigationMarginBottom = prescriptionMobileNavigationRef
      ? parseInt(getComputedStyle(prescriptionMobileNavigationRef).marginBottom)
      : 24
    return {
      fps: 24,
      qrbox: 250,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      formatsToSupport: [Html5QrcodeSupportedFormats.DATA_MATRIX],
      disableFlip: true,
      ...(!isDesktop && isSmallScreen && { aspectRatio: 0.69 }),
      //For extra small screen we set the ratio to be width divided by height minus the height of everything above and below the scanner
      //This includes the topHeader, the header, one div above the scanner, including its margin and the div with the Stop/Start Scanning buttons below the scanner
      ...(!isSmallScreen && {
        aspectRatio: (width && height
          ? width /
            (height -
              topHeaderHeight -
              headerHeight -
              prescriptionMobileNavigationHeight -
              prescriptionMobileNavigationMarginTop -
              prescriptionMobileNavigationMarginBottom -
              //45px is the Height of the div with thee Stop/Start Scanning buttons and one pixel buffer
              45)
          : 0.69
        ).toFixed(2)
      }),
      ...(isLargeScreen && { aspectRatio: 1.777778 })
    }
  }, [
    isDesktop,
    isSmallScreen,
    isLargeScreen,
    width,
    height,
    prescriptionMobileNavigationRef
  ])

  const isScannerDenied = isScanner && isPermissionStepPassed && !hasPermission
  const isScannerDeniedOnMobile = isScannerDenied && !isSmallScreen

  const {
    notificationClassName,
    notificationType,
    notificationContent
  } = getPrescriptionNotificationProps({
    t,
    isScanner,
    isPrescriptionAddedToBasket,
    uploadedPrescriptionLength: uploadedPrescription.length,
    numberOfItemsAddedToBasket
  })
  const descriptionTitle = getPrescriptionDescriptionTitle({
    isScanner,
    hasUploadedPrescription: !!uploadedPrescription.length,
    isPermissionStepPassed,
    hasPermission
  })
  const descriptionContent = getPrescriptionDescriptionContent({
    isScanner,
    hasUploadedPrescription: !!uploadedPrescription.length,
    isPermissionStepPassed,
    hasPermission,
    isDesktop
  })

  useEffect(() => {
    if (hasPermission && isPermissionStepPassed && isScanner) {
      document
        .getElementById('html5qr-code-full-region')
        ?.classList.add('html5qr-code-full-region')

      let startButton: undefined | HTMLElement
      const scannerButtonsArray = Array.from(
        document
          .getElementById('html5qr-code-full-region__dashboard_section_csr')
          ?.getElementsByTagName('span')?.[1]
          ?.getElementsByTagName('button') || []
      )

      const handleStartButtonClick = () => {
        setIsStoppedScanning(false)
      }

      const handleStopButtonClick = () => {
        setIsStoppedScanning(true)

        startButton = scannerButtonsArray.find(
          button => button.innerHTML === 'Start Scanning'
        )

        if (startButton && !isStartButtonEventHandlerAdded.current) {
          startButton?.addEventListener('click', handleStartButtonClick)
          isStartButtonEventHandlerAdded.current = true
        }
      }

      const stopButton = scannerButtonsArray.find(
        button => button.innerHTML === 'Stop Scanning'
      )

      if (stopButton) {
        stopButton?.addEventListener('click', handleStopButtonClick)
      }

      return () => {
        if (stopButton) {
          stopButton?.removeEventListener('click', handleStopButtonClick)
        }
        if (startButton) {
          startButton?.removeEventListener('click', handleStartButtonClick)
        }
      }
    }
  }, [hasPermission, isScanner, isPermissionStepPassed])

  const uploadAddToBasketErrorMessage = useSelector(
    selectPrescriptionErrorMessage
  )

  return !isUploadLoading ? (
    <div
      data-testid="scanner-uploader"
      className={classNames({
        'sm:w-[480px] md:w-[392px] lg:w-[592px] mx-auto': !isDesktop
      })}
    >
      {(!isScanner || hasPermission) && (
        <QRCodeScanner
          className={classNames('sm:min-w-[480px] md:min-w-0', {
            'hidden absolute': !isScanner,
            invisible: isScanner && hasPermission && !isPermissionStepPassed
          })}
          onScanFailure={handleScanError}
          onScanSuccess={handleScanSuccess}
          config={isScanner ? scannerConfig : uploaderConfig}
        />
      )}
      {(!isScanner || !hasPermission) && (
        <div
          data-testid="scanner-uploader-div-child"
          className={classNames('sm:my-0 w-full flex bg-primary-white', {
            'py-7': !isScanner || uploadedPrescription.length,
            'sm:min-h-[282px] md:min-h-[332px] lg:min-h-[299px]':
              !uploadedPrescription.length && !isScanner,
            '-mb-2.25 sm:min-h-[287px] md:h-[288px] lg:h-[273px] lg:min-h-0':
              uploadedPrescription.length,
            'sm:h-[542px] md:min-h-[332px] md:h-auto lg:min-h-[292px] md:py-7.5':
              isScanner && !uploadedPrescription.length,
            'py-[150px] lg:py-4.25':
              isScanner && !uploadedPrescription.length && !isScannerDenied,
            'py-[137px] lg:py-8': isScannerDenied && !isScannerDeniedOnMobile,
            'flex-col my-7 items-center': !isScannerDeniedOnMobile,
            'min-h-[169px] w-[327px] mx-auto my-[177px] shadow grid grid-cols-[25%_75%] grid-rows-auto px-2 pb-2 items-start': isScannerDeniedOnMobile
          })}
        >
          <div
            className={classNames(
              'bg-ui-guyabano rounded-full relative text-primary-oxford-blue',
              {
                'w-6 h-6 min-h-6': !isScanner || uploadedPrescription.length,
                'w-8 h-8 min-h-8 min-w-8 md:w-6 md:h-6 md:min-h-6 md:min-w-0 lg:w-8 lg:h-8 lg:min-h-8':
                  isScanner && !uploadedPrescription.length,
                'mt-2 row-start-1': isScannerDeniedOnMobile
              }
            )}
          >
            {uploadedPrescription.length && !isUploadError ? (
              <Checkmark
                data-testid="checkmark-icon"
                className={classNames('absolute w-3', {
                  'top-1.5 left-1.5': !isScanner || uploadedPrescription.length,
                  'top-2.5 left-2.5 md:top-1.5 md:left-1.5 lg:top-2.5 lg:left-2.5':
                    isScanner && !uploadedPrescription.length
                })}
              />
            ) : (
              icon
            )}
          </div>
          <div>
            {descriptionTitle && (
              <h5
                className={classNames('md:mt-2 lg:mt-3', {
                  'text-center mt-3': !isScannerDeniedOnMobile,
                  'text-left mt-2 text-sm leading-[22px]': isScannerDeniedOnMobile
                })}
              >
                {t(descriptionTitle)}
              </h5>
            )}
            <p
              className={classNames('min-h-10 sm:min-h-fit', {
                'text-center w-[310px] sm:w-[402px] md:w-[285px] lg:w-[385px] my-2.25': !isScanner,
                'sm:w-[352px] md:w-[279px] lg:w-[464px] text-center mx-auto':
                  isScanner && !isScannerDeniedOnMobile,
                'mt-1': isScanner && !uploadedPrescription.length,
                'my-2.25': isScanner && uploadedPrescription.length,
                'w-[215px] text-left text-sm leading-[22px]': isScannerDeniedOnMobile
              })}
            >
              {!isScanner &&
                !isDesktop &&
                (!uploadedPrescription.length || isUploadError) && (
                  <button
                    className="font-semibold sm:font-light underline"
                    onClick={handleFileUpload}
                  >
                    {t('prescription.upload-description.tap-here')}
                  </button>
                )}
              {!isScanner &&
                !!uploadedPrescription.length &&
                !isUploadError && (
                  <span className="font-semibold">
                    {t('prescription.upload-success.file')}
                  </span>
                )}
              {t(descriptionContent)}
            </p>
          </div>
          {showUploaderButton && (
            <Button
              onClick={handleFileUpload}
              data-testid="scan-upload-btn"
              variant={uploadedPrescription.length ? 'tertiary' : 'secondary'}
              className={classNames('h-6 -mt-0.5 lg:mt-0.5', {
                'w-[150px]': uploadedPrescription.length,
                'w-[100px] md:w-[210px] lg:w-[100px]': !uploadedPrescription.length
              })}
            >
              {uploadedPrescription.length
                ? t('prescription.upload-button.upload-again')
                : t('prescription.upload-button')}
            </Button>
          )}
          {isScanner && !uploadedPrescription.length && (
            <Button
              data-testid="allow-scanner-button"
              onClick={handleAllowPermission}
              variant="secondary"
              className={classNames(
                'h-6 md:w-[212px] lg:w-[464px] mt-2 sm:mt-4 md:mt-3 lg:mt-4',
                {
                  'w-[352px]': !isScannerDeniedOnMobile,
                  'w-fll col-start-1 col-end-3': isScannerDeniedOnMobile
                }
              )}
            >
              {t('prescription.scanner.allow')}
            </Button>
          )}
        </div>
      )}
      {(((!!uploadedPrescription.length ||
        (isScanner && hasPermission && isPermissionStepPassed)) &&
        !isStoppedScanning) ||
        isPrescriptionAddedToBasket) &&
        !isUploadError && (
          <Notification
            className={notificationClassName}
            closeIcon={false}
            type={notificationType as 'success' | 'info'}
            title=""
            content={notificationContent}
          />
        )}
      {(isUploadError || uploadAddToBasketErrorMessage) &&
        (!!uploadedPrescription.length || !uploadedPrescription.length) && (
          <Notification
            className="sm:my-3 md:mt-2 mx-2 sm:mx-0 mb-2"
            closeIcon={false}
            type={
              uploadAddToBasketErrorMessage ===
              'basket.add-prescription.token-already-in-cart'
                ? 'warning'
                : 'error'
            }
            title={
              uploadAddToBasketErrorMessage ===
              'basket.add-prescription.token-already-in-cart'
                ? t(`${uploadAddToBasketErrorMessage}.title`)
                : !isUploadError
                ? t(`${uploadAddToBasketErrorMessage}`)
                : ''
            }
            content={
              uploadAddToBasketErrorMessage
                ? t(`${uploadAddToBasketErrorMessage}.content`)
                : t('prescription.upload-error.notification')
            }
          />
        )}
      {(!!uploadedPrescription.length || (!isScanner && !isSmallScreen)) && (
        <div
          className={classNames(
            'mb-0 flex p-2 md:p-0 gap-1 sm:bg-primary-white md:bg-ui-guyabano',
            {
              'border-t md:border-none border-ui-grey-light': !isScanner,
              'justify-between': !isDesktop && !isScanner,
              'md:gap-2.25': isScanner && uploadedPrescription.length
            }
          )}
        >
          {(isScanner || !isDesktop || (!isScanner && !isSmallScreen)) && (
            <Button
              data-testid="upload-scan-again-btn"
              className={classNames('truncate h-5.75 md:h-6', {
                'w-full ': !isDesktop,
                'md:w-[148px]': isScanner
              })}
              variant={uploadedPrescription.length ? 'tertiary' : 'secondary'}
              onClick={isScanner ? handleAllowPermission : handleFileUpload}
            >
              {isScanner
                ? t('prescription.scan-button.scan-again')
                : uploadedPrescription.length
                ? t('prescription.upload-button.upload-again')
                : t('prescription.upload-button.upload-prescription')}
            </Button>
          )}
          {!!uploadedPrescription.length && (
            <Button
              className="w-full truncate md:w-[148px] h-5.75 md:h-6"
              variant="secondary"
              onClick={handleAddPrescriptionToBasket}
            >
              {t('prescription.button.add-to-basket')}
            </Button>
          )}
        </div>
      )}
    </div>
  ) : (
    <LoadingSpinner />
  )
}
