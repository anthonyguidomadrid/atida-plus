import type { FunctionComponent } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Button } from '~components/atoms/Button'
import { useSelector } from 'react-redux'
import { selectContentLoading, selectContent } from '~domains/page'
import { CmsContentTypes } from '~config/content-types'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { parseHtml } from '~helpers'
import classNames from 'classnames'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type NewCustomerNotificationProps = {
  url?: string
  hasGuestCheckoutButton?: boolean
  isTablet?: boolean
  handleGuestCheckoutOnClick?: () => void
}

type NewCustomerNotificationType = {
  content: string
  contentType: CmsContentTypes.STATIC_CONTENT_BLOCK
  tite: string
}

export const NewCustomerNotification: FunctionComponent<NewCustomerNotificationProps> = ({
  url = '',
  hasGuestCheckoutButton,
  isTablet,
  handleGuestCheckoutOnClick
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const content = useSelector(selectContent)
  const isLoading = useSelector(selectContentLoading)

  const isTwoColumnLoginAndSignupEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_TWO_COLUMN_LOGIN_AND_SIGNUP
  )

  const modifiedContentBlocks = content?.contentBlocks
    ? content.contentBlocks.map(block => {
        const contentWithCheckmark = (block as NewCustomerNotificationType)
          ?.content
          ? (block as NewCustomerNotificationType).content.replace(
              /<li>(.*?)<\/li>/g,
              !isTwoColumnLoginAndSignupEnabled
                ? '<li><div><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-16 inline-block text-primary-caribbean-green mr-1 -mt-0.5"><g clip-path="url(#NavCheckmarkSmall_svg__clip0)"><path d="M6.267 12a.596.596 0 01-.467-.207L2.867 8.827a.683.683 0 010-.965.63.63 0 01.933 0l2.467 2.552L12.2 4.276a.63.63 0 01.933 0 .683.683 0 010 .965l-6.4 6.621C6.6 11.931 6.4 12 6.267 12z" fill="currentColor"></path></g><defs><clipPath id="NavCheckmarkSmall_svg__clip0"><path fill="currentColor" transform="translate(2.667 4)" d="M0 0h10.667v8H0z"></path></clipPath></defs></svg></div>$1</li>'
                : '<li><div><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-24 inline-block text-primary-caribbean-green mr-1"><g clip-path="url(#NavCheckmarkSmall_svg__clip0)"><path d="M6.267 12a.596.596 0 01-.467-.207L2.867 8.827a.683.683 0 010-.965.63.63 0 01.933 0l2.467 2.552L12.2 4.276a.63.63 0 01.933 0 .683.683 0 010 .965l-6.4 6.621C6.6 11.931 6.4 12 6.267 12z" fill="currentColor"></path></g><defs><clipPath id="NavCheckmarkSmall_svg__clip0"><path fill="currentColor" transform="translate(2.667 4)" d="M0 0h10.667v8H0z"></path></clipPath></defs></svg></div>$1</li>'
            )
          : ''

        return {
          ...block,
          content: contentWithCheckmark
        }
      })
    : undefined

  const customerNotificationBlock = modifiedContentBlocks?.find(block => {
    return block?.contentType === CmsContentTypes.STATIC_CONTENT_BLOCK
  })

  const handleOnClick = () => {
    url && router.push(url)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (customerNotificationBlock?.content) {
    return (
      <div
        data-testid="newCustomerNotificationStaticContentBlock"
        className={classNames('w-full', {
          'sm:max-w-38 md:max-w-48 lg:max-w-50 h-full flex flex-col justify-start bg-ui-guyabano sm:pt-9': isTwoColumnLoginAndSignupEnabled,
          'sm:w-42 md:w-54 p-3 mt-1 sm:p-5 bg-ui-carribean-green-lightest': !isTwoColumnLoginAndSignupEnabled
        })}
      >
        <div
          className={classNames('w-full flex flex-col justify-between', {
            'sm:h-34.5': !hasGuestCheckoutButton,
            'sm:h-26.5': hasGuestCheckoutButton
          })}
        >
          {parseHtml(customerNotificationBlock?.content, {
            h2: {
              className: classNames(
                'font-normal text-xl font-body mb-1 sm:mb-0'
              )
            },
            ul: {
              className: classNames(
                'my-1 sm:my-0 flex flex-col justify-evenly gap-1',
                {
                  'sm:py-2': !hasGuestCheckoutButton
                }
              )
            },
            li: {
              className: classNames('flex text-sm', {
                'items-center': isTwoColumnLoginAndSignupEnabled
              })
            },
            p: {
              className: 'inline-block'
            }
          })}
        </div>
        {url && (
          <Button
            data-testid="newCustomerNotificationStaticContentBlockButton"
            variant="tertiary"
            className={classNames('w-full', {
              'mt-0.25': !hasGuestCheckoutButton
            })}
            aria-label={t('account.create-account.notification.button')}
            onClick={handleOnClick}
          >
            {t('account.create-account.notification.button')}
          </Button>
        )}
        {isTwoColumnLoginAndSignupEnabled &&
          hasGuestCheckoutButton &&
          isTablet && (
            <Button
              data-testid="continueAsGuestStaticContentBlockButton"
              variant="primary"
              className="w-full mt-2"
              aria-label={t('login.continue-as-guest.cta')}
              onClick={handleGuestCheckoutOnClick}
            >
              {t('login.continue-as-guest.cta')}
            </Button>
          )}
      </div>
    )
  }

  return null
}
