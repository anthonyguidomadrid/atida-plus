import { FunctionComponent } from 'react'
import { Trans } from 'react-i18next'
import { Modal, useModalState } from '~components/atoms/Modal'
import { ContentBlock } from '~domains/page'

export type TermsAndConditionsProps = {
  contentBlocks?: ContentBlock[]
  translation?: string
}

export const TermsAndConditions: FunctionComponent<TermsAndConditionsProps> = ({
  contentBlocks,
  translation
}) => {
  const [isModalVisible, setIsModalVisible] = useModalState()

  return (
    <div className="sm:mb-4 mb-3 lg:mb-0">
      <Modal
        data-testid="termsAndConditionsModal"
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        headerText="Terms and Conditions"
        headerTextStyle="font-heading text-xl"
        // 'content' does not exist on type HeroBanner.
        // Possibly a problem with the ContentBlock type itself
        // @ts-ignore
        bodyHtml={contentBlocks?.[0].content}
        modalStyle="sm:absolute sm:right-0 sm:h-full sm:w-72.5"
      />
      <span className="text-sm" data-testid="termsAndConditionsTextVariant2">
        <Trans i18nKey={translation}>
          <button
            className="underline"
            onClick={() => setIsModalVisible(true)}
          />
        </Trans>
      </span>
    </div>
  )
}
