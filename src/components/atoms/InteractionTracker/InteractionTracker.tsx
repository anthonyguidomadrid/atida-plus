import { ComponentPropsWithRef, FunctionComponent, KeyboardEvent } from 'react'

export type InteractionTrackerProps = {
  trackingHandler?: () => void
}

export const InteractionTracker: FunctionComponent<
  ComponentPropsWithRef<'div'> & InteractionTrackerProps
> = ({ trackingHandler, children }) => {
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      trackingHandler && trackingHandler()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={trackingHandler}
      onKeyUp={handleKeyUp}
      className="w-full h-full"
      data-testid="interactionTracker"
    >
      {children}
    </div>
  )
}
