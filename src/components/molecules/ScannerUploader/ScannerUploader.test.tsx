import { screen } from '@testing-library/react'
import { ScannerUploader, ScannerUploaderProps } from './ScannerUploader'
import { ReactComponent as Download } from '~assets/svg/navigation-24px/Download.svg'
import userEvent, { TargetElement } from '@testing-library/user-event'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { createRef } from 'react'
import { renderWithStore } from '~test-helpers'

describe(ScannerUploader, () => {
  const handleFileUpload = jest.fn()
  const handleScanError = jest.fn()
  const handleScanSuccess = jest.fn()
  const handleAddPrescriptionToBasket = jest.fn()
  const handleAllowPermission = jest.fn()
  const prescriptionMobileNavigationRef = createRef<HTMLDivElement>()
  const setup = (
    props: Partial<ScannerUploaderProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <ScannerUploader
        handleFileUpload={handleFileUpload}
        handleScanError={handleScanError}
        handleScanSuccess={handleScanSuccess}
        handleAddPrescriptionToBasket={handleAddPrescriptionToBasket}
        handleAllowPermission={handleAllowPermission}
        uploadedPrescription={['Task/2aef43b8c5e8f2d3d7aef64']}
        isScanner={true}
        isDesktop={true}
        isSmallScreen={true}
        isUploadError={false}
        isUploadLoading={false}
        isPrescriptionAddedToBasket={false}
        numberOfItemsAddedToBasket={0}
        icon={<Download className="absolute top-1.5 left-1.5 w-3" />}
        showUploaderButton={true}
        hasPermission
        isPermissionStepPassed
        prescriptionMobileNavigationRef={
          prescriptionMobileNavigationRef.current
        }
        {...props}
      />,
      {
        initialState: {
          client: {
            basket: {
              prescription: {
                isLoading: false,
                wasSuccess: false,
                wasError: false,
                token: []
              }
            }
          }
        }
      }
    )

    reset()
    return renderedComponent
  }
  it('renders the ScannerUploader component', () => {
    setup()
    expect(screen.getByTestId('scanner-uploader')).toBeInTheDocument()
  })

  it('renders the QR scanner if isScanner is true and isScannerLoading is false', () => {
    setup()
    expect(screen.getByTestId('html5qr-code-full-region')).toBeInTheDocument()
  })

  it('renders the scan and upload button if showUploaderButton is true and isScanner is false', () => {
    setup({ isScanner: false })
    expect(screen.getByTestId('scan-upload-btn')).toBeInTheDocument()
  })

  it('does not render the checkmark icon if the prescription is not uploaded', () => {
    setup({ isScanner: false, uploadedPrescription: [] })
    expect(screen.queryByTestId('checkmark-icon')).not.toBeInTheDocument()
  })

  it('renders the file upload link on mobile once a prescription is uploaded', () => {
    setup({ isScanner: false, isDesktop: false, uploadedPrescription: [] })
    expect(
      screen.queryByText('prescription.upload-description.tap-here')
    ).toBeInTheDocument()
  })

  it('renders a different text notification if the number of prescriptions scanned or uploaded is higher than one', () => {
    setup({
      uploadedPrescription: ['prescription1', 'prescription2'],
      isScanner: false
    })
    expect(
      screen.getByText(
        'prescription.upload-success.notification.multiple-items 2'
      )
    ).toBeInTheDocument()
  })

  it('calls a different method if it is a scanner or an uploader', () => {
    const handleFileUpload = jest.fn()
    setup({
      isScanner: false,
      isDesktop: false,
      handleFileUpload: handleFileUpload
    })
    expect(handleFileUpload).not.toHaveBeenCalled()
    const btn = screen.getByTestId('upload-scan-again-btn')
    userEvent.click(btn)
    expect(handleFileUpload).toHaveBeenCalledTimes(1)
  })

  it('renders the ScannerUploader component on large screen', () => {
    setup({ isSmallScreen: false }, true)
    expect(screen.getByTestId('scanner-uploader')).toBeInTheDocument()
  })

  it('adds the correct classes to scanner-uploader-div-child when hasPermission is false and isSmallScreen is false', () => {
    setup({ hasPermission: false, isSmallScreen: false })
    expect(screen.getByTestId('scanner-uploader-div-child')).toHaveClass(
      'min-h-[169px] w-[327px] mx-auto my-[177px] shadow grid grid-cols-[25%_75%] grid-rows-auto px-2 pb-2 items-start'
    )
  })

  it('renders the allow-scanner-button', () => {
    setup({
      isPermissionStepPassed: false,
      hasPermission: false,
      uploadedPrescription: []
    })
    expect(screen.getByTestId('allow-scanner-button')).toBeInTheDocument()
  })

  it('renders the notification', () => {
    setup({
      uploadedPrescription: []
    })
    expect(screen.getByTestId('notification')).toBeInTheDocument()
  })

  it('runs the useEffect ands add the event listeners', () => {
    document.body.innerHTML =
      '<div id="html5qr-code-full-region__dashboard_section_csr">' +
      '<span></span>' +
      '<span>' +
      '<button id="stop-scanning-button">Stop Scanning</button>' +
      '<button id="start-scanning-button">Start Scanning</button>' +
      '</span>' +
      '</div>'

    setup()
    const clickStopButton = jest.fn()
    const clickStartButton = jest.fn()
    const stopButton = document.getElementById(
      'stop-scanning-button'
    ) as TargetElement
    const startButton = document.getElementById(
      'start-scanning-button'
    ) as TargetElement

    stopButton.addEventListener('click', clickStopButton)
    startButton.addEventListener('click', clickStartButton)
    userEvent.click(stopButton)
    userEvent.click(startButton)

    expect(clickStopButton).toHaveBeenCalledTimes(1)
    expect(clickStartButton).toHaveBeenCalledTimes(1)

    document.body.innerHTML =
      '<div id="html5qr-code-full-region__dashboard_section_csr">' +
      '<span></span>' +
      '<span>' +
      '<button id="stop-scanning-button">Stop Scanning</button>' +
      '</span>' +
      '</div>'

    userEvent.click(stopButton)
    expect(clickStopButton).toHaveBeenCalledTimes(2)
  })
})
