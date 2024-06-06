import React, { ReactNode, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  selectCustomerShowNotification,
  selectTrimmedCustomerFirstName
} from '~domains/account/selectors/customer'

import { useRouter } from 'next/router'
import { breakpoints } from '~domains/breakpoints/config'
import { useBreakpoint } from '~domains/breakpoints'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

import dynamic from 'next/dynamic'

import { NotificationModalLayoutProps } from '~components/molecules/NotificationModalLayout'
import { InteractivePencilBannerProps } from '~components/molecules/InteractivePencilBanner'
import { PageLayoutHeaderProps } from './PageLayoutHeader'
import { triggerHideCustomerNotification } from '~domains/account/slices'
import { useDetectOutsideClick } from '~helpers/useDetectOutsideClick'

const TrustedShopsBadge = dynamic<unknown>(() =>
  import('./TrustedShopsBadge').then(c => c.TrustedShopsBadge)
)
const PageLayoutFooter = dynamic<unknown>(() =>
  import('./PageLayoutFooter').then(c => c.PageLayoutFooter)
)
const PageLayoutHeader = dynamic<PageLayoutHeaderProps>(() =>
  import('./PageLayoutHeader').then(c => c.PageLayoutHeader)
)
const InteractivePencilBanner = dynamic<InteractivePencilBannerProps>(() =>
  import('~components/molecules/InteractivePencilBanner').then(
    c => c.InteractivePencilBanner
  )
)
const NotificationModalLayout = dynamic<NotificationModalLayoutProps>(() =>
  import('~components/molecules/NotificationModalLayout').then(
    c => c.NotificationModalLayout
  )
)

export type PageLayoutProps = {
  isFrontPage?: boolean
  children?: ReactNode
}

export const PageLayout = ({ isFrontPage, children }: PageLayoutProps) => {
  const firstName = useSelector(selectTrimmedCustomerFirstName)

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const isSmallScreen = useBreakpoint(breakpoints.sm)
  const modalRef = useRef<HTMLDivElement>(null)
  const showNotification =
    useSelector(selectCustomerShowNotification) &&
    !asPath.includes('/account/my-atida-cash')
  const [
    notificationModalOpen,
    setNotificationModalOpen
  ] = useDetectOutsideClick(modalRef, showNotification)

  const isInteractivePencilBannerEnabled = useFeatureFlag(
    FeatureFlag.INTERACTIVE_PENCIL_BANNER
  )

  const handleNotificationModalConfirm = () => {
    setNotificationModalOpen(false)
  }

  const notificationModalTitle = t(
    'account.create-account.success-notification.title',
    {
      firstName
    }
  )

  useEffect(() => {
    if (!notificationModalOpen) {
      dispatch(triggerHideCustomerNotification())
    }
  }, [dispatch, notificationModalOpen])

  return (
    <div className="flex flex-col overflow-visible" data-testid="pageWrapper">
      <PageLayoutHeader
        isFrontPage={isFrontPage}
        data-testid="page-layout-header"
      />
      {isInteractivePencilBannerEnabled && (
        <InteractivePencilBanner closeIcon={true} />
      )}
      <div
        id="page-layout-min-height-div"
        className="flex-1 overflow-x-hidden min-h-screen"
      >
        {children}
      </div>
      <NotificationModalLayout
        data-testid="notificationModalLayout"
        modalRef={modalRef}
        isOpen={notificationModalOpen}
        variant={isSmallScreen ? 'center' : 'bottom'}
        maxWidth={!isSmallScreen}
        isFixedPosition
        icon={
          <Checkmark className="icon-24 bg-transparent text-primary-oxford-blue" />
        }
        iconPosition="left-mobile"
        handleConfirm={handleNotificationModalConfirm}
        confirmButtonLabel={t(
          'account.create-account.success-notification.button'
        )}
        children={
          <div className="text-left sm:text-center text-sm xs:text-base">
            <p className="mb-0.5">
              <b>{notificationModalTitle}</b>
            </p>
            <p className="xs:mb-2">
              {t('account.create-account.success-notification.content')}
            </p>
          </div>
        }
      />
      <PageLayoutFooter data-testid="page-layout-footer" />
      <TrustedShopsBadge />
    </div>
  )
}
