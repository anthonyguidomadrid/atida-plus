import classNames from 'classnames'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Download } from '~assets/svg/navigation-24px/Download.svg'
import { Button } from '~components/atoms/Button'

export type PDPInfoDescriptionProps = {
  children?: React.ReactNode
  certificateButtonsData?: {
    type: string
    url: string
  }[]
}
export const PDPInfoDescription = ({
  children,
  certificateButtonsData
}: PDPInfoDescriptionProps) => {
  const { t } = useTranslation()

  const handleDownload = useCallback((url: string) => {
    window.open(url, '_blank')
  }, [])

  return (
    <div
      className="border-b pb-3 lg:pb-4 border-b-ui-grey-lightest"
      data-testid="PDPInfoDescription"
    >
      <h5 className="mb-1">{t('pdp.important-info-title')}</h5>
      {children}
      {certificateButtonsData &&
        certificateButtonsData.map((certificateButton, index) => (
          <Button
            key={`certificate-${certificateButton.type}-${index}`}
            variant="tertiary"
            icon={<Download role="presentation" className="icon-24" />}
            onClick={() => handleDownload(certificateButton.url)}
            data-testid="certificateButton"
            className={classNames('cursor-pointer xs-only:w-full mt-1', {
              'mr-2': index < certificateButtonsData.length - 1
            })}
          >
            {certificateButton.type}
          </Button>
        ))}
    </div>
  )
}
