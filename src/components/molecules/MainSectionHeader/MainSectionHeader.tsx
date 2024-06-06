import type { ReactNode } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import type { ComponentPropsWithoutRefAndChildren } from '~helpers/typeHelpers'
import { SimpleHeaderProps } from '~components/molecules/SimpleHeader/SimpleHeader'
import { PromotionHeaderProps } from '~components/molecules/PromotionHeader'
import { HeroHeaderProps } from '~components/molecules/HeroHeader'

export type ValidHeaderComponents =
  | SimpleHeaderProps
  | PromotionHeaderProps
  | HeroHeaderProps

// got this solution from: https://github.com/facebook/react/issues/24604#issuecomment-1135225491
export type MainSectionHeaderProps = ComponentPropsWithoutRefAndChildren<'header'> & {
  children?: ReactNode | ((obj: ValidHeaderComponents) => ReactNode)
  backgroundColor?: string
}

export const MainSectionHeader = ({
  backgroundColor,
  children,
  className
}: MainSectionHeaderProps) => {
  const { back } = useRouter()

  return (
    <header
      data-testid="mainSectionHeader"
      className={classNames(className, {
        [`bg-${backgroundColor}`]: !!backgroundColor
      })}
    >
      <div className="container container-fixed mx-auto sm:relative">
        {children &&
          typeof children === 'function' &&
          children({
            backFunction: back
          })}
      </div>
    </header>
  )
}
