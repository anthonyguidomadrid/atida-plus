import { render, screen } from '@testing-library/react'

import { QRCodeScanner, QRCodeScannerProps } from './QRCodeScanner'

describe(QRCodeScanner, () => {
  const onScanSuccess = jest.fn()
  const onScanFailure = jest.fn()
  const setup = (props: Partial<QRCodeScannerProps> = {}) =>
    render(
      <QRCodeScanner
        onScanSuccess={onScanSuccess}
        onScanFailure={onScanFailure}
        {...props}
      />
    )

  it('should render the QR code', () => {
    setup()
    expect(screen.getByTestId('html5qr-code-full-region')).toBeInTheDocument()
  })

  it('should render the QR code with the given className', () => {
    setup({ className: 'my-class' })
    expect(screen.getByTestId('html5qr-code-full-region')).toHaveClass(
      'my-class'
    )
  })

  it('should render the QR code with the given id', () => {
    setup()
    expect(screen.getByTestId('html5qr-code-full-region')).toHaveAttribute(
      'id',
      'html5qr-code-full-region'
    )
  })
})
