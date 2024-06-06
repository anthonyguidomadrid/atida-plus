import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { ReactComponent as Spinner } from '~assets/svg/navigation-24px/Spinner.svg'

export const LoadingSpinner: FunctionComponent<
  ComponentPropsWithoutRef<'div'>
> = ({ className }) => {
  return (
    <div className={classNames('flex justify-center items-center', className)}>
      <Spinner data-testid="loadingSpinner" className="animate-spin h-6 w-6" />
    </div>
  )
}
