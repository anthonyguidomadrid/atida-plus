import { ComponentPropsWithRef, FunctionComponent, memo } from 'react'
import classNames from 'classnames'
import { ReactComponent as Back } from '~assets/svg/navigation-24px/Back.svg'
import { Button } from '~components/atoms/Button'
import { Image } from '~components/atoms/Image'
import { Asset } from '~domains/contentful'
import {
  NavigationBreadcrumbs,
  NavigationBreadcrumb
} from '../NavigationBreadcrumbs'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useBreakpoint } from '~domains/breakpoints'
import { breakpoints } from '~domains/breakpoints/config'

export type SimpleHeaderProps = {
  backFunction: () => void
  image?: Asset
  title?: string
  isFavourites?: boolean
  breadcrumbs?: NavigationBreadcrumb[]
}

const SimpleHeaderComponent: FunctionComponent<
  ComponentPropsWithRef<'div'> & SimpleHeaderProps
> = ({ image, backFunction, title, isFavourites, breadcrumbs }) => {
  const isDesktop = useBreakpoint(breakpoints.sm)

  const isBreadcrumbsEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_BREADCRUMBS_ON_POP_AND_COP
  )

  return (
    <div
      className={classNames('flex flex-col sm:flex-row justify-between', {
        'h-full': isFavourites,
        'h-full sm:h-22.5 md:h-24.5 lg:h-28.5': !isFavourites
      })}
      data-testid="simpleHeader"
    >
      <div
        className={classNames({
          'sm:pr-3': image?.url,
          'sm:w-full': !image?.url
        })}
      >
        <div className="flex pt-2 sm:pt-3 sm:absolute z-10">
          <Button
            variant="back"
            icon={
              <Back role="presentation" className="icon-16 align-middle mr-0" />
            }
            onClick={backFunction}
            data-testid="popBackButton"
            className={classNames('w-fit h-fit pt-3px mr-0', {
              hidden: isDesktop
            })}
          />
          {isBreadcrumbsEnabled && (
            <NavigationBreadcrumbs
              breadcrumbs={breadcrumbs ?? []}
              showOnMobile={true}
            />
          )}
        </div>
        <h1
          className={classNames('text-6xl lg:text-8xl line-clamp-2', {
            'mb-3 mt-2 sm:mt-9': isFavourites,
            'my-2 sm:my-4 lg:mt-5 sm:absolute z-10 sm:top-5.5 ': !isFavourites
          })}
        >
          {title}
        </h1>
      </div>
      {image?.url && (
        <div className=" xs-only:max-h-32.5 w-full sm:w-6/10 sm:min-w-6/10 sm:h-full lg:w-1/2 lg:min-w-1/2">
          <Image
            className="w-full h-full object-cover sm:relative"
            src={image.url}
            alt={image.title}
            loading="eager"
            preload={true}
            aria-hidden={!image.title?.length}
          />
        </div>
      )}
    </div>
  )
}

export const SimpleHeader = memo(SimpleHeaderComponent)
