import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'

export type ActionProps = { testId: string }

export const Action: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & ActionProps
> = ({ testId, children, className }) => {
  return (
    <div data-testid={`action-${testId}`} className={classNames(className)}>
      {children}
    </div>
  )
}
