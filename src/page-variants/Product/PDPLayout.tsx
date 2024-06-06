import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Button } from '~components/atoms/Button'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'

export const PDPLayout = ({ children }: { children: ReactNode }) => {
  const { back } = useRouter()
  const { t } = useTranslation()

  return (
    <>
      <div
        className={classNames(
          'w-full container-fixed mx-auto mt-2 mb-1 sm:mt-3 sm:mb-2 px-2',
          'sm:px-5',
          'md:px-8'
        )}
      >
        <Button
          variant="back"
          icon={<ChevronLeft role="presentation" className="icon-16" />}
          onClick={back}
          data-testid="pdpBackButton"
        >
          {t('shared.back')}
        </Button>
      </div>
      <main
        className={classNames(
          'w-full container-fixed mx-auto grid grid-cols-12 px-2 sm:px-5 md:px-8 sm:gap-x-4 pb-5'
        )}
        data-testid="pdpLayout"
      >
        {children}
      </main>
    </>
  )
}
