import { FunctionComponent } from 'react'
import { v4 as uuid } from 'uuid'

export const ProductFiltersPlaceHolder: FunctionComponent = () => {
  return (
    <div data-testid="product-filters-loading">
      <div className="relative flex flex-col h-63 pb-9.5 -mt-fixed-1px sm:h-full">
        <div className="animate-bounce-400 bg-ui-grey-lightest h-2 mt-2 w-3/5"></div>
        <div className="animate-bounce-400 bg-ui-grey-lightest h-4 mt-1.5"></div>
        {Array(8)
          .fill('')
          .map(() => (
            <div className="flex items-center mt-1.5" key={uuid()}>
              <div className="animate-bounce-400 bg-ui-grey-lightest h-2 w-2 mr-1.5 rounded"></div>
              <div className="animate-bounce-400 bg-ui-grey-lightest h-2 w-3/5"></div>
            </div>
          ))}
      </div>
    </div>
  )
}
