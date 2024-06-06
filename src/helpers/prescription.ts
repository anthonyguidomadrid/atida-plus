import type { TFunction } from 'i18next'
import classNames from 'classnames'

export const getPrescriptionNotificationProps = ({
  t,
  isScanner,
  isPrescriptionAddedToBasket,
  uploadedPrescriptionLength,
  numberOfItemsAddedToBasket
}: {
  t: TFunction
  isScanner: boolean
  isPrescriptionAddedToBasket: boolean
  uploadedPrescriptionLength?: number
  numberOfItemsAddedToBasket?: number
}) => {
  let notificationType = 'success',
    notificationContent = 'prescription.scanner.info-notification',
    notificationClassName = classNames({
      'absolute sm:relative right-2 sm:right-0 left-2 sm:left-0': !uploadedPrescriptionLength,
      'bottom-7.5 sm:bottom-0 sm:transform sm:-translate-y-14.5 md:translate-y-0': !uploadedPrescriptionLength,
      'sm:mx-2 md:mx-0 md:mt-2 md:mb-3 lg:mb-4': !uploadedPrescriptionLength
    })
  if (!isScanner || uploadedPrescriptionLength) {
    notificationClassName = 'sm:my-3 md:mt-2 lg:mb-4 mx-2 sm:mx-0 mb-2'
  }
  if (
    isPrescriptionAddedToBasket &&
    numberOfItemsAddedToBasket &&
    numberOfItemsAddedToBasket > 1
  ) {
    notificationContent = t(
      'prescription.upload-success.notification.multiple-items.add-to-cart',
      {
        count: numberOfItemsAddedToBasket
      }
    )
  }
  if (isScanner && !uploadedPrescriptionLength) {
    notificationType = 'info'
  }
  if (uploadedPrescriptionLength && uploadedPrescriptionLength === 1) {
    notificationContent = t(
      'prescription.upload-success.notification.single-item'
    )
  }
  if (uploadedPrescriptionLength && uploadedPrescriptionLength > 1) {
    notificationContent = t(
      'prescription.upload-success.notification.multiple-items',
      {
        count: uploadedPrescriptionLength
      }
    )
  }
  if (isPrescriptionAddedToBasket && numberOfItemsAddedToBasket === 1) {
    notificationContent = t(
      'prescription.upload-success.notification.single-item.add-to-cart'
    )
  }
  return { notificationClassName, notificationType, notificationContent }
}

export const getPrescriptionDescriptionTitle = ({
  isScanner,
  hasUploadedPrescription,
  isPermissionStepPassed,
  hasPermission
}: {
  isScanner: boolean
  hasUploadedPrescription: boolean
  isPermissionStepPassed: boolean
  hasPermission: boolean
}) => {
  if (isScanner && !hasUploadedPrescription) {
    if (isPermissionStepPassed && !hasPermission) {
      return 'prescription.scanner-description.denial-title'
    }
    return 'prescription.scanner-description.start-title'
  }
  return ''
}

export const getPrescriptionDescriptionContent = ({
  isScanner,
  hasUploadedPrescription,
  isPermissionStepPassed,
  hasPermission,
  isDesktop
}: {
  isScanner: boolean
  hasUploadedPrescription: boolean
  isPermissionStepPassed: boolean
  hasPermission: boolean
  isDesktop: boolean
}) => {
  if (isScanner) {
    if (hasUploadedPrescription) {
      return 'prescription.scanner-description.success-content'
    }
    if (isPermissionStepPassed && !hasPermission) {
      return 'prescription.scanner-description.denial-content'
    }
    return 'prescription.scan-description.start'
  }
  if (isDesktop && !hasUploadedPrescription) {
    return 'prescription.upload-description.desktop.start'
  }
  if (hasUploadedPrescription) {
    return 'prescription.upload-description.success'
  }
  return 'prescription.upload-description.mobile.start'
}
