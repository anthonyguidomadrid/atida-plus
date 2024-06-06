import React, { FunctionComponent } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { selectFooter } from '~domains/page'
import { mapIconReferenceToIconComponent } from '~domains/contentful'

import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'
import { ReactComponent as Lock } from '~assets/svg/navigation-24px/Lock.svg'
import { ReactComponent as Box } from '~assets/svg/navigation-24px/Box.svg'

const items = [
  {
    icon: Delivery,
    copy: 'shared.USP-6'
  },
  {
    icon: Box,
    copy: 'shared.USP-7'
  },
  {
    icon: Lock,
    copy: 'shared.USP-8'
  }
]

export const ProductUSP: FunctionComponent = () => {
  const { t } = useTranslation()
  const footer = useSelector(selectFooter)

  const icons = footer?.providerBlocks?.[0]?.icons

  return (
    <div
      className="bg-primary-white border border-ui-grey-light rounded-md divide-y divide-ui-grey-lightest overflow-hidden"
      data-testid="usp-new-layout"
    >
      <div className="p-3 space-y-2">
        {items.map((item, idx) => (
          <div className="flex items-center space-x-2.5" key={idx}>
            <item.icon className="h-3.25 text-primary-caribbean-green-dark" />
            <div className="flex-1 text-base">
              <Trans
                i18nKey={item.copy}
                values={{ sub: t(`${item.copy}.sub`) }}
                components={{
                  b: <b />
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {icons && (
        <div
          className="px-2 flex items-center justify-start h-9 space-x-1"
          data-testid="usp-payment-methods-variant"
        >
          {icons?.map((icon, idx) => {
            const Icon = mapIconReferenceToIconComponent(icon)
            return (
              <Icon
                className="icon-68-48"
                key={idx}
                data-testid="usp-payment-method-icon-variant"
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
