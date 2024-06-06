import { FunctionComponent, memo, useCallback, useRef, useState } from 'react'
import classNames from 'classnames'

export type TooltipProps = {
  children: React.ReactNode
  content: string | JSX.Element | JSX.Element[]
  delay: number
}

const SPACE_TO_CHANGE_POSITION = 200

const TooltipComponent: FunctionComponent<TooltipProps> = ({
  children,
  content,
  delay
}) => {
  const [active, setActive] = useState<boolean>(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const TooltipRef = useRef<HTMLButtonElement>(null)
  const headerHeight = useCallback(
    () => document.querySelector('header')?.clientHeight || 0,
    []
  )

  // Calculate distance between TooltipRef and top of screen
  const calculateDirection = useCallback(() => {
    if (!TooltipRef.current) return
    const distance =
      TooltipRef.current?.getBoundingClientRect().top -
      headerHeight() -
      SPACE_TO_CHANGE_POSITION
    setPosition(distance >= 0 ? 'top' : 'bottom')
  }, [TooltipRef, headerHeight])

  const showToolTip = useCallback(() => {
    const timeout = setTimeout(() => {
      setActive(true)
      calculateDirection()
    }, delay || 300)
    return () => {
      clearTimeout(timeout)
    }
  }, [calculateDirection, delay])

  return (
    <button
      ref={TooltipRef}
      className="relative flex items-center justify-center text-center bg-primary-white rounded-full border-ui-grey border-2 p-0.25"
      onMouseEnter={showToolTip}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive(v => !v)}
      data-testid="tooltip-content-wrapper"
    >
      {children}
      {active && (
        <>
          <div
            data-testid="tooltip-content"
            className={classNames(
              'absolute bg-primary-white rounded p-1.5 left-1/2 transform -translate-x-3/7 sm:-translate-x-1/2 ml-2 w-35 z-20 text-base font-light shadow-xl',
              {
                '-translate-y-1/2 mb-6': position === 'top',
                'translate-y-1/2 mt-7': position === 'bottom'
              }
            )}
          >
            {content}
          </div>
          <div
            className={classNames(
              'h-2 w-2 absolute bg-primary-white rotate-45 transform z-20',
              {
                'bottom-4': position === 'top',
                'top-4': position === 'bottom'
              }
            )}
          ></div>
        </>
      )}
    </button>
  )
}

export const Tooltip = memo(TooltipComponent)
