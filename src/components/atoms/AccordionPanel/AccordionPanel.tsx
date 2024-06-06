import {
  cloneElement,
  ComponentPropsWithoutRef,
  FunctionComponent,
  FunctionComponentElement,
  LegacyRef,
  SVGAttributes,
  useEffect,
  useState
} from 'react'
import classNames from 'classnames'
import { ReactComponent as ChevronDown } from '~assets/svg/navigation-16px/ChevronDown.svg'
import { ReactComponent as ChevronUp } from '~assets/svg/navigation-16px/ChevronUp.svg'
import { CircledNumber } from '~components/atoms/CircledNumber'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type AccordionPanelProps = ComponentPropsWithoutRef<'details'> & {
  heading?: JSX.Element | string
  icon?: FunctionComponentElement<SVGAttributes<'svg'>>
  badge?: number
  isBadge?: boolean
  couponAccordionRef?: LegacyRef<HTMLDetailsElement> | undefined
  isUsedForCoupon?: boolean
  isBold?: boolean
  id?: string
}

export const AccordionPanel: FunctionComponent<AccordionPanelProps> = ({
  heading,
  children,
  className,
  open,
  icon,
  onClick,
  badge,
  isBadge = false,
  couponAccordionRef,
  isUsedForCoupon,
  isBold = true,
  id,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open)

  const isMobileAccordeonRefinementListEnabled = useFeatureFlag(
    FeatureFlag.MOBILE_ACCORDEON_REFINEMENT_LIST
  )

  useEffect(() => {
    if (!isUsedForCoupon) {
      setIsOpen(open)
    }
  }, [open, isUsedForCoupon])

  const refinementList =
    typeof document !== 'undefined'
      ? document.querySelectorAll(`#${id} .ais-Panel--noRefinement`)
      : []

  const displayChevronDown = isUsedForCoupon ? (
    <div className="flex items-center">
      {!!badge && (
        <CircledNumber
          badge={badge}
          className="box-content border md:border-none border-transparent bg-primary-oxford-blue text-primary-white w-2.5 h-2.5"
        />
      )}
      <ChevronDown className="icon-16" />
    </div>
  ) : (
    <ChevronDown className="icon-16" />
  )

  return (
    <details
      id={id}
      data-testid="dropdownWithContent"
      className={classNames('duration-150 transition-all ease-out', className, {
        hidden:
          id &&
          isMobileAccordeonRefinementListEnabled &&
          refinementList.length > 0
      })}
      onToggle={() => setIsOpen(current => !current)}
      ref={couponAccordionRef}
      open={open}
      {...props}
    >
      <summary
        className={classNames('relative cursor-pointer', {
          'font-semibold': isBold
        })}
        onClick={onClick}
      >
        <div className="flex w-full pr-2.5">
          {icon &&
            cloneElement(icon, {
              ...icon.props,
              className: classNames('mr-1.5', icon.props.className)
            })}
          {heading}
        </div>

        <span
          className={classNames('absolute right-0 -translate-y-1/2 transform', {
            'top-1.5': isBadge,
            'top-1/2': !isBadge
          })}
        >
          {isUsedForCoupon ? (
            isOpen ? (
              <ChevronUp className="icon-16" />
            ) : (
              displayChevronDown
            )
          ) : (
            <ChevronUp
              className={classNames(
                'icon-16 transition-all duration-150 transform-style-3d perspective-revert',
                {
                  'rotate-x-0': isOpen,
                  'rotate-x-180': !isOpen
                }
              )}
            />
          )}
        </span>
      </summary>

      {children}
    </details>
  )
}
