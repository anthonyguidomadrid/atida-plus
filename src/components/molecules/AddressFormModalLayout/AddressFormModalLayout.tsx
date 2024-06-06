import type { FunctionComponent, LegacyRef } from 'react'
import React, { ComponentPropsWithoutRef, useEffect } from 'react'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { Button } from '~components/atoms/Button'
import { useSelector } from 'react-redux'
import { selectIsAnyAddressLoading } from '~domains/address'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export type AddressFormModalLayoutProps = {
  title: string
  children?: React.ReactNode
  isOpen: boolean
  setIsAddressModalOpen: (isAddressModalOpen: boolean) => void
  addressModal?: LegacyRef<HTMLDivElement>
}

export const AddressFormModalLayout: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & AddressFormModalLayoutProps
> = ({ title = '', isOpen, setIsAddressModalOpen, addressModal, children }) => {
  const isAddressLoading = useSelector(selectIsAnyAddressLoading)

  useEffect(() => {
    isOpen
      ? document.body.setAttribute('style', 'overflow: hidden')
      : document.body.setAttribute('style', 'overflow: visible')
  }, [isOpen])
  const { t } = useTranslation()

  return (
    <div
      data-testid="AddressFormModalLayout"
      style={isOpen ? { backgroundColor: 'rgba(26, 29, 50, 0.2)' } : {}}
      className={classNames('fixed top-0 w-full h-full z-50', {
        '-right-full': !isOpen,
        'right-0': isOpen
      })}
    >
      <div
        ref={addressModal}
        className={classNames(
          'fixed h-full w-full max-w-65 top-0 right-0 bg-primary-white transition-all duration-300 ease-in-out overflow-auto',
          { '-right-100 sm:-right-full': !isOpen }
        )}
      >
        <div className="flex sticky top-0 z-40 h-7 place-content-between items-center border-b border-ui-grey-light bg-primary-white sm:h-9">
          {title !== '' && <p className="font-semibold ml-3">{title}</p>}
          {setIsAddressModalOpen && (
            <Button
              data-testid="closeAddressFormModalLayout"
              onClick={() => !isAddressLoading && setIsAddressModalOpen(false)}
              icon={<Cross className="icon-24 text-primary-oxford-blue" />}
              className="z-50 no-border bg-primary-white hover:bg-primary-white mr-1 sm:mr-3"
              aria-label={t('shared.close-drawer')}
            />
          )}
        </div>
        <div className="p-2 sm:p-5">{children}</div>
      </div>
    </div>
  )
}
