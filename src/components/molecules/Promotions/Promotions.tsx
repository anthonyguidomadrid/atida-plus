import { FunctionComponent, memo } from 'react'
import { PromotionTeaser } from '~components/molecules/PromotionTeaser'
import { Promotion } from '~domains/contentful/normalizers/promotion'

export type PromotionsProps = {
  promotions?: Promotion[]
}

const PromotionsComponent: FunctionComponent<PromotionsProps> = ({
  promotions = []
}) => {
  return (
    <div
      key={`PromotionsWrapper-${Math.random().toString().substring(2)}`}
      data-testid="promotions"
      className="flex flex-wrap my-3 gap-2 sm:gap-3 md:gap-4 justify-between"
    >
      {promotions.map((promotion, index) => {
        return (
          <PromotionTeaser
            index={index}
            labels={promotion?.labels ?? []}
            id={promotion.id}
            shortDescription={promotion.teaserDescription}
            categoryColor={promotion.color}
            teaserImage={promotion.teaserImage}
            name={promotion.title}
            teaserType={promotion.isContentWithImage}
            url={promotion?.url}
            key={promotion.id}
            isSponsoredContent={promotion?.isSponsoredContent}
            sponsoredContentPosition={promotion?.sponsoredContentPosition}
          />
        )
      })}
    </div>
  )
}

export const Promotions = memo(PromotionsComponent)
