import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '~components/atoms/Button'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { ProductLabels } from '~components/molecules/ProductLabels'
import { ProductLabelWrapper } from '~domains/product'
import { parseHtml } from '~helpers'
import { Asset } from '~domains/contentful'
import { Image } from '~components/atoms/Image'

export type PromotionHeaderProps = {
  title?: string
  description?: string
  image?: Asset
  labels?: ProductLabelWrapper[]
  backFunction: () => void
}

export const PromotionHeader: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & PromotionHeaderProps
> = ({ title, description, image, labels, backFunction }) => {
  const { t } = useTranslation()

  return (
    <div
      className="flex flex-col sm:flex-row justify-between h-full"
      data-testid="promotionHeader"
    >
      <div className="w-full sm:col-start-1 sm:col-end-6 md:col-end-7 py-2 sm:py-3">
        <Button
          variant="back"
          icon={<ChevronLeft role="presentation" className="icon-16" />}
          onClick={backFunction}
          data-testid="promotionBackButton"
          className="mb-3 md:mb-4"
        >
          {t('shared.back')}
        </Button>
        {labels && (
          <ProductLabels
            labels={labels}
            className="flex pb-2 w-fit"
            listItemClassName="mr-1"
          />
        )}
        {title && <h1 className="text-6xl lg:text-8xl mb-1">{title}</h1>}
        {description && (
          <div>
            {parseHtml(description, {
              ul: {
                className: 'list-disc my-2 mr-2'
              },
              li: {
                className: 'ml-2'
              },
              ol: {
                className: 'list-decimal my-2 mr-2'
              }
            })}
          </div>
        )}
      </div>
      {image?.url && (
        <Image
          className="w-full h-full object-cover sm:relative"
          src={image.url}
          alt={image.title}
          loading="eager"
          aria-hidden={!image.title?.length}
        />
      )}
    </div>
  )
}
