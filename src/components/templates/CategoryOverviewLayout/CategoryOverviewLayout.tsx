import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import NextLink from 'next/link'

import { ReactComponent as NavAdd } from '~assets/svg/navigation-16px/NavAdd.svg'
import { Button } from '~components/atoms/Button'
import { Tag } from '~components/atoms/Tag'
import { Link } from '~components/atoms/Link'
import { ContentBlock } from '~domains/page'
import { Promotion } from '~domains/contentful/normalizers/promotion'
import { PromotionTeaser } from '~components/molecules/PromotionTeaser'
import { Category, LinkBlock as LinkBlockType } from '~domains/contentful'
import { CmsContentTypes } from '~config/content-types'
import { LinkBlock } from '~components/atoms/LinkBlock'
import classNames from 'classnames'
import { getCanonicalLink } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { ContentBlocksLayout } from '~components/templates/ContentBlocksLayout'

export type CategoryDetails = Pick<
  Category,
  'title' | 'subcategories' | 'id'
> & {
  url?: string
}

type PromotionDetails = {
  promotions: Promotion[]
  totalNumPromotions?: number
}

type CategoryOverviewLayoutProps = {
  contentBlocks: ContentBlock[]
  promotionDetails: PromotionDetails
  categoryDetails: CategoryDetails
}

/**
 * Category overview page
 * @param contentBlocks - different content types coming from Contentful
 * @param promotions - promotions to be shown for this category
 * @param totalNumPromotions - total number of promotions linked to this category
 * @param title - category title
 * @param subcategories
 * @param url - category page URL
 * @param id - category ID to fetch recommendations
 */
export const CategoryOverviewLayout: FunctionComponent<CategoryOverviewLayoutProps> = ({
  contentBlocks = [],
  promotionDetails: { promotions = [], totalNumPromotions },
  categoryDetails: { title, subcategories, url, id }
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  // find the promotions CTA link block...
  const promotionsLinkBlock = contentBlocks.find(
    block => block.contentType === CmsContentTypes.LINK_BLOCK
  )
  // ...remove it from the list of other content blocks
  const remainingContentBlocks = contentBlocks.filter(
    block => !Object.is(block, promotionsLinkBlock)
  )
  const hasLinkBlock = !!promotionsLinkBlock

  return (
    <section className="py-4 xs:pt-4 sm:pt-6 md:pt-7 lg:pt-9">
      <div className="container container-fixed mx-auto grid grid-cols-12 col-span-12">
        {/*Shop by category*/}
        <aside className="col-span-12 md:col-start-1 md:col-span-3">
          <h4>{t('category.shop-by-category')}</h4>
          {/*Display subcategories as TagList on small screens*/}
          <div className="xs:w-full md:hidden inline-flex flex-wrap gap-1 mb-3">
            {subcategories?.map(subcategory => (
              <Tag
                key={subcategory.id}
                href={subcategory.url ?? ''}
                className="mb-0.5"
              >
                {subcategory.title}
              </Tag>
            ))}
          </div>
          {/*Display subcategories as a list starting from md screen size*/}
          <ul className="hidden md:block">
            {subcategories?.map(subcategory => (
              <li
                key={subcategory.id}
                className="body cursor-pointer mb-3"
                data-testid="copSubcategory"
              >
                <NextLink href={subcategory.url ?? ''} passHref>
                  <Link className="no-underline hover:underline">
                    {subcategory.title}
                  </Link>
                </NextLink>
              </li>
            ))}
          </ul>
        </aside>
        {/*Promotion teasers*/}
        <aside
          className={classNames(
            'grid grid-cols-12 col-start-1 md:col-start-4 col-end-13 mb-auto w-full'
          )}
        >
          {title && (
            <div className="col-span-12 text-lg lg:text-2xl">
              {t('promotion.num-promotions', { num: totalNumPromotions })}{' '}
              <span className="inline font-normal">{title}</span>
            </div>
          )}
          <div className="col-span-12 flex flex-wrap mx-auto justify-between gap-2 sm:gap-3 lg:gap-4 w-full mb-4 md:mb-5 mt-3 lg:mt-4">
            {promotions.map(
              ({
                id,
                title,
                labels,
                teaserDescription,
                teaserImage,
                color,
                url,
                isSponsoredContent,
                sponsoredContentPosition
              }) => (
                <PromotionTeaser
                  key={id}
                  name={title}
                  labels={labels ?? []}
                  id={id}
                  shortDescription={teaserDescription}
                  categoryColor={color}
                  teaserImage={teaserImage}
                  teaserType={true}
                  url={url}
                  isSponsoredContent={isSponsoredContent}
                  sponsoredContentPosition={sponsoredContentPosition}
                />
              )
            )}
          </div>
          {promotions.length > 0 && (
            <div
              className={classNames('col-span-12 flex justify-center', {
                'mt-2 md:mt-5': !hasLinkBlock
              })}
            >
              {hasLinkBlock ? (
                <LinkBlock {...(promotionsLinkBlock as LinkBlockType)} />
              ) : (
                <NextLink
                  href={getCanonicalLink('promotions', locale) as string}
                  prefetch={false}
                >
                  <Button
                    variant="tertiary"
                    icon={<NavAdd className="icon-16" />}
                  >
                    {t('promotions.view-all')}
                  </Button>
                </NextLink>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Content blocks */}
      {remainingContentBlocks?.length > 0 && (
        <aside className="col-span-12 mt-4 sm:mt-5 md:mt-7 lg:mt-9">
          <ContentBlocksLayout
            contentBlocks={remainingContentBlocks}
            category={{ id, url, title }}
          />
        </aside>
      )}
    </section>
  )
}
