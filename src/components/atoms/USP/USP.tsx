import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { ReactComponent as NavCheckmarkSmall } from '~assets/svg/navigation-16px/NavCheckmarkSmall.svg'

const items = ['shared.USP-1', 'shared.USP-2', 'shared.USP-3']

type USPProps = {
  exclude?: number
  hideBorder?: boolean
}

export const USP: FunctionComponent<USPProps> = ({ exclude, hideBorder }) => {
  const { t } = useTranslation()

  return (
    <div
      className={classNames('border-ui-grey-light space-y-1.5', {
        'border-t py-3': !hideBorder
      })}
      data-testid="usp-old-layout"
    >
      {items.map((item, idx) => {
        if (exclude && exclude - 1 === idx) return null
        return (
          <div
            className="flex space-x-1.5"
            key={item}
            data-testid={`usp${idx + 1}`}
          >
            <NavCheckmarkSmall className="icon-24 inline-block text-primary-caribbean-green" />
            <div>{t(item)}</div>
          </div>
        )
      })}
    </div>
  )
}
