import classNames from 'classnames'
import { FunctionComponent } from 'react'

type ProductTileLoadingProps = {
  className?: string
  noBorder?: boolean
  variation?: 'small' | 'big'
}

export const ProductTileLoading: FunctionComponent<ProductTileLoadingProps> = ({
  className,
  noBorder = false,
  variation = 'big'
}) => {
  return (
    <article data-testid="product-tile-loading" className={className}>
      <div
        className={classNames(
          'relative flex py-13 h-full -mt-fixed-1px sm:py-3',
          {
            'border-t border-b border-ui-grey-lightest': !noBorder,
            'border-t border-b border-r border-l sm:px-3':
              !noBorder && variation === 'small'
          }
        )}
      >
        <div
          className={classNames('flex items-center', {
            'mr-2 px-1 sm:mr-3 sm:ml-0 sm:px-4 md:mr-4 md:px-2 lg:px-6 shrink-0 grow-0 ':
              variation === 'big',
            'mr-3': variation === 'small'
          })}
        >
          <div
            className={classNames('bg-ui-guyabano ', {
              'h-full w-88px sm:w-96px md:w-88px lg:w-96px':
                variation === 'big',
              'h-6 w-6': variation === 'small'
            })}
          />
        </div>
        <div
          className={classNames('flex w-3/5 h-full flex-col', {
            'py-1.5': variation === 'big'
          })}
        >
          <div
            className={classNames('animate-bounce-400 bg-ui-grey-lightest', {
              'h-1 my-0.75': variation === 'small',
              'h-2 my-1': variation === 'big'
            })}
          ></div>
          <div
            className={classNames('animate-bounce-400 bg-ui-grey-lightest', {
              'h-1 my-0.75': variation === 'small',
              'h-2 my-1': variation === 'big'
            })}
          ></div>
          <div
            className={classNames(
              'animate-bounce-400 bg-ui-grey-lightest w-3/5',
              {
                'h-1 my-0.75': variation === 'small',
                'h-2 my-1': variation === 'big'
              }
            )}
          ></div>
        </div>
      </div>
    </article>
  )
}
