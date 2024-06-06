import { ReactNode } from 'react'

export type BreakOutOfContainerProps = {
  children?: ReactNode
}

export const BreakOutOfContainer = ({ children }: BreakOutOfContainerProps) => (
  <div
    className="w-screen relative left-1/2 right-1/2 -mx-w-1/2-screen"
    data-testid="breakOutOfContainer"
  >
    {children}
  </div>
)
