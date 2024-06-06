import {
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  FunctionComponent,
  isValidElement,
  MouseEvent,
  ReactNode,
  useEffect,
  useState
} from 'react'
import classNames from 'classnames'

export type AccordionProps = ComponentPropsWithoutRef<'div'> & {
  controlled?: boolean
  defaultActivePanel?: number
}

export const Accordion: FunctionComponent<AccordionProps> = ({
  children,
  className,
  controlled,
  defaultActivePanel,
  ...props
}) => {
  const [activePanel, setActivePanel] = useState<number | undefined>(
    defaultActivePanel
  )

  useEffect(() => {
    setActivePanel(defaultActivePanel)
  }, [defaultActivePanel])

  return (
    <div
      className={classNames('accordion', className)}
      data-testid="accordion"
      {...props}
    >
      {Children.map(children, (child: ReactNode, idx: number) =>
        isValidElement(child)
          ? cloneElement(child, {
              open: controlled ? idx === activePanel : undefined,
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onToggle: controlled ? () => {} : undefined,
              onClick: controlled
                ? (e: MouseEvent<HTMLElement>) => {
                    e.preventDefault()
                    setActivePanel(current =>
                      current === idx ? undefined : idx
                    )
                  }
                : undefined,
              ...child.props
            })
          : child
      )}
    </div>
  )
}
