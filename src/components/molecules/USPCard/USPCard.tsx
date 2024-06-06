import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { mapIconReferenceToIconComponent, USPsCard } from '~domains/contentful'

export type USPCardProps = USPsCard & {
  TitleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
}

export const USPCard: FunctionComponent<
  ComponentPropsWithoutRef<'section'> & USPCardProps
> = ({ contentType, title, TitleTag = 'span', items, className, ...props }) => (
  <section
    className={classNames(
      'w-full bg-primary-caribbean-green-light py-4 sm:py-5 md:py-7',
      className
    )}
    data-testid="USP"
    {...props}
  >
    <div className="flex flex-col mx-auto container container-fixed lg:flex-row lg:items-center lg:justify-between">
      {title && (
        <TitleTag className="text-3xl md:text-5xl mb-3 sm:mb-4 lg:mb-0 font-heading font-semibold">
          {title}
        </TitleTag>
      )}
      <ul className={classNames('md:flex md:justify-between')}>
        {items &&
          items.map(({ icon, text }, index) => {
            const Icon = mapIconReferenceToIconComponent(icon)
            return (
              <li
                key={index}
                className={classNames(
                  'flex md:mb-3 lg:mb-0 md:last:mr-0 lg:py-1 content-center items-center lg:pl-5',
                  {
                    'mb-3': index !== items.length - 1
                  }
                )}
              >
                <span className="md:bg-primary-white md:bg-opacity-30 md:p-1.5 md:rounded-full">
                  <Icon role="presentation" className="icon-24 shrink-0" />
                </span>
                <span className="ml-2">{text}</span>
              </li>
            )
          })}
      </ul>
    </div>
  </section>
)
