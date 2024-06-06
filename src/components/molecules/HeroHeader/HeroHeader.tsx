import { ComponentPropsWithoutRef, FunctionComponent, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { ContentBlocksLayout } from '~components/templates/ContentBlocksLayout'
import { CampaignHeroBanner, HeroBanner } from '~domains/contentful'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { Button } from '~components/atoms/Button'

export type HeroHeaderProps = {
  contentBlock: HeroBanner | CampaignHeroBanner
  backFunction: () => void
}

const HeroHeaderComponent: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & HeroHeaderProps
> = ({ contentBlock, backFunction }) => {
  const { t } = useTranslation()

  return (
    <div className="relative" data-testid="heroHeader">
      <Button
        variant="back"
        icon={<ChevronLeft role="presentation" className="icon-16" />}
        onClick={backFunction}
        data-testid="popBackButton"
        className="absolute z-2 ml-3 sm:ml-6 lg:ml-8 top-2 sm:top-3"
      >
        {t('shared.back')}
      </Button>

      <ContentBlocksLayout
        contentBlocks={[contentBlock]}
        isContainer={false}
        isLcp={true}
      />
    </div>
  )
}

export const HeroHeader = memo(HeroHeaderComponent)
