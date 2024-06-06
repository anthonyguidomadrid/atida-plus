export type PDPInfoLayoutProps = {
  children?: React.ReactNode
  className?: string
}

export const PDPInfoLayout = ({ children, className }: PDPInfoLayoutProps) => {
  return (
    <div
      className="bg-ui-guyabano p-3 lg:p-4 mb-5 sm:mb-6 lg:mb-5 col-span-12 md:col-start-1 md:col-end-7 lg:col-end-8 md:row-start-3"
      data-testid="PDPInfoLayout"
    >
      <div className={className}>{children}</div>
    </div>
  )
}
