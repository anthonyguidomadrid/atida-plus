import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ReactComponent as ExpertIcon } from '~assets/svg/navigation-24px/Expert.svg'
import { Image } from '~components/atoms/Image'
import { selectExpert } from '~domains/expert-signature/selectors/expert-signature'
import { selectProductMainCategory } from '~domains/product'

export const ExpertSignature = () => {
  const { t } = useTranslation()

  const productCategory = useSelector(selectProductMainCategory)
  const expert = useSelector(selectExpert)

  if (!expert || expert.categories.id !== productCategory) return null
  return (
    <section className="flex flex-col mt-5 mb-8" data-testid="expertSignature">
      <p className="mb-3 font-bold">{t('PDP.expert-signature-title')}</p>
      <div className="w-full flex items-center space-x-2">
        <div className="max-w-11.5 max-h-11.5 rounded-full overflow-hidden">
          {expert.image && (
            <Image
              src={expert.image.url}
              alt={expert.image.title}
              platform="contentful"
              width={{ xs: 120, sm: 120, md: 120, lg: 120 }}
              height={{ xs: 120, sm: 120, md: 120, lg: 120 }}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <div>
          <p className="font-semibold mb-0.5 mb-0.6">{expert.name}</p>
          <p className="flex items-center">
            <ExpertIcon
              className="icon-24 mr-1"
              data-testid="expertSignatureIcon"
            />
            <span className="font-body text-sm">{expert.jobTitle}</span>
          </p>
          <p className="font-body text-ui-grey-dark">{expert.jobDescription}</p>
        </div>
      </div>
    </section>
  )
}
