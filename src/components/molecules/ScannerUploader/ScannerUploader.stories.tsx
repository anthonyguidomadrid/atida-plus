import { ScannerUploader, ScannerUploaderProps } from './ScannerUploader'
import { ReactComponent as Download } from '~assets/svg/navigation-24px/Download.svg'

export default {
  component: ScannerUploader,
  title: 'molecules/OrderSummary',
  args: {
    uploadedPrescription: ['Task/2aef43b8c5e8f2d3d7aef64'],
    isScanner: true,
    isDesktop: true,
    isSmallScreen: true,
    icon: <Download className="absolute top-1.5 left-1.5 w-3" />,
    showUploaderButton: true,
    hasPermission: true,
    isPermissionStepPassed: true,
    storedCardsComponentRef: null
  }
}

export const withContentFromDesign = (
  args: ScannerUploaderProps
): JSX.Element => <ScannerUploader {...args} />
