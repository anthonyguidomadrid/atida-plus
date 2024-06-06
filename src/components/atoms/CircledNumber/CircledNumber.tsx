import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import React from 'react'

export type CircledNumberProps = {
  badge: number
  hasMissingDiv?: boolean
  className?: string
}

export const CircledNumber: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & CircledNumberProps
> = ({ badge, hasMissingDiv, className }) => {
  return (
    <div
      data-testid="circledNumber"
      className={classNames(
        'mr-0.5 text-center rounded-full text-xs',
        className
      )}
    >
      {!hasMissingDiv ? (
        <div
          data-testid="number"
          className="relative -top-1.25 h-0 py-1/2 px-1.5px font-semibold"
          id="basketItems"
        >
          {badge}
        </div>
      ) : (
        badge
      )}
    </div>
  )
}
