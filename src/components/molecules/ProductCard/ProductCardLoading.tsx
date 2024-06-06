import { FunctionComponent } from 'react'

type ProductCardLoadingProps = {
  className?: string
}

export const ProductCardLoading: FunctionComponent<ProductCardLoadingProps> = ({
  className
}) => {
  return (
    <article data-testid="product-card-loading" className={className}>
      <div className="relative flex flex-col h-45 pb-9.5 -mt-fixed-1px sm:h-full">
        <div className="flex items-center">
          <div className="bg-ui-guyabano h-26 w-full" />
        </div>
        <div className="animate-bounce-400 bg-ui-grey-lightest h-2 mt-2 mx-1"></div>
        <div className="animate-bounce-400 bg-ui-grey-lightest h-2 mt-1.5 mx-1"></div>
        <div className="animate-bounce-400 bg-ui-grey-lightest h-2 mt-1.5 mx-1 w-3/5"></div>
      </div>
    </article>
  )
}
