import {
  getPrescriptionNotificationProps,
  getPrescriptionDescriptionTitle,
  getPrescriptionDescriptionContent
} from '../prescription'

describe(getPrescriptionNotificationProps, () => {
  const tFunction = jest.fn()
  it('returns the correct object when uploadedPrescriptionLength is undefined', () => {
    expect(
      getPrescriptionNotificationProps({
        t: tFunction,
        isScanner: true,
        isPrescriptionAddedToBasket: false,
        uploadedPrescriptionLength: undefined,
        numberOfItemsAddedToBasket: undefined
      })
    ).toEqual({
      notificationClassName:
        'absolute sm:relative right-2 sm:right-0 left-2 sm:left-0 bottom-7.5 sm:bottom-0 sm:transform sm:-translate-y-14.5 md:translate-y-0 sm:mx-2 md:mx-0 md:mt-2 md:mb-3 lg:mb-4',
      notificationContent: 'prescription.scanner.info-notification',
      notificationType: 'info'
    })
  })
  it('returns the correct object when uploadedPrescriptionLength is 1', () => {
    expect(
      getPrescriptionNotificationProps({
        t: tFunction,
        isScanner: true,
        isPrescriptionAddedToBasket: false,
        uploadedPrescriptionLength: 1,
        numberOfItemsAddedToBasket: undefined
      })
    ).toEqual({
      notificationClassName: 'sm:my-3 md:mt-2 lg:mb-4 mx-2 sm:mx-0 mb-2',
      notificationContent: undefined,
      notificationType: 'success'
    })
  })
  it('returns the correct object when uploadedPrescriptionLength is greater than 1', () => {
    expect(
      getPrescriptionNotificationProps({
        t: tFunction,
        isScanner: true,
        isPrescriptionAddedToBasket: false,
        uploadedPrescriptionLength: 2,
        numberOfItemsAddedToBasket: undefined
      })
    ).toEqual({
      notificationClassName: 'sm:my-3 md:mt-2 lg:mb-4 mx-2 sm:mx-0 mb-2',
      notificationContent: undefined,
      notificationType: 'success'
    })
  })
  it('returns the correct object when item is added to basket', () => {
    expect(
      getPrescriptionNotificationProps({
        t: tFunction,
        isScanner: false,
        isPrescriptionAddedToBasket: true,
        uploadedPrescriptionLength: 0,
        numberOfItemsAddedToBasket: 1
      })
    ).toEqual({
      notificationClassName: 'sm:my-3 md:mt-2 lg:mb-4 mx-2 sm:mx-0 mb-2',
      notificationContent: undefined,
      notificationType: 'success'
    })
  })
  it('returns the correct object when 2 items is added to basket', () => {
    expect(
      getPrescriptionNotificationProps({
        t: tFunction,
        isScanner: false,
        isPrescriptionAddedToBasket: true,
        uploadedPrescriptionLength: 0,
        numberOfItemsAddedToBasket: 2
      })
    ).toEqual({
      notificationClassName: 'sm:my-3 md:mt-2 lg:mb-4 mx-2 sm:mx-0 mb-2',
      notificationContent: undefined,
      notificationType: 'success'
    })
  })
})

describe(getPrescriptionDescriptionTitle, () => {
  it('returns prescription.scanner-description.denial-title under certain conditions', () => {
    expect(
      getPrescriptionDescriptionTitle({
        isScanner: true,
        hasUploadedPrescription: false,
        isPermissionStepPassed: true,
        hasPermission: false
      })
    ).toEqual('prescription.scanner-description.denial-title')
  })
  it('returns prescription.scanner-description.start-title under certain conditions', () => {
    expect(
      getPrescriptionDescriptionTitle({
        isScanner: true,
        hasUploadedPrescription: false,
        isPermissionStepPassed: true,
        hasPermission: true
      })
    ).toEqual('prescription.scanner-description.start-title')
  })
  it('returns an empty string under certain conditions', () => {
    expect(
      getPrescriptionDescriptionTitle({
        isScanner: false,
        hasUploadedPrescription: false,
        isPermissionStepPassed: false,
        hasPermission: false
      })
    ).toEqual('')
  })
})

describe(getPrescriptionDescriptionContent, () => {
  it('returns prescription.scanner-description.success-content under certain conditions', () => {
    expect(
      getPrescriptionDescriptionContent({
        isScanner: true,
        hasUploadedPrescription: true,
        isPermissionStepPassed: true,
        hasPermission: false,
        isDesktop: true
      })
    ).toEqual('prescription.scanner-description.success-content')
  })
  it('returns prescription.scanner-description.denial-content under certain conditions', () => {
    expect(
      getPrescriptionDescriptionContent({
        isScanner: true,
        hasUploadedPrescription: false,
        isPermissionStepPassed: true,
        hasPermission: false,
        isDesktop: true
      })
    ).toEqual('prescription.scanner-description.denial-content')
  })
  it('returns prescription.scan-description.start under certain conditions', () => {
    expect(
      getPrescriptionDescriptionContent({
        isScanner: true,
        hasUploadedPrescription: false,
        isPermissionStepPassed: false,
        hasPermission: true,
        isDesktop: true
      })
    ).toEqual('prescription.scan-description.start')
  })
  it('returns prescription.upload-description.desktop.start under certain conditions', () => {
    expect(
      getPrescriptionDescriptionContent({
        isScanner: false,
        hasUploadedPrescription: false,
        isPermissionStepPassed: false,
        hasPermission: true,
        isDesktop: true
      })
    ).toEqual('prescription.upload-description.desktop.start')
  })
  it('returns prescription.upload-description.desktop.start under certain conditions', () => {
    expect(
      getPrescriptionDescriptionContent({
        isScanner: false,
        hasUploadedPrescription: true,
        isPermissionStepPassed: false,
        hasPermission: true,
        isDesktop: false
      })
    ).toEqual('prescription.upload-description.success')
  })
  it('returns prescription.upload-description.mobile.start under certain conditions', () => {
    expect(
      getPrescriptionDescriptionContent({
        isScanner: false,
        hasUploadedPrescription: false,
        isPermissionStepPassed: false,
        hasPermission: true,
        isDesktop: false
      })
    ).toEqual('prescription.upload-description.mobile.start')
  })
})
