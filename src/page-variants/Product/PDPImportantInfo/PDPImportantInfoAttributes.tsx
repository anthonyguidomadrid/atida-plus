import classNames from 'classnames'
import Link from 'next/link'

type PDPImportantInfoAttributesProps = {
  list?: {
    icon?: React.ReactNode
    title?: string
    description?: string
    link?: {
      href: string
      text: string
    }
  }[]
}

export const PDPImportantInfoAttributes = ({
  list
}: PDPImportantInfoAttributesProps) => {
  return (
    <ul className="flex flex-col lg:flex-row flex-wrap items-start border-b py-3 lg:py-4 border-b-ui-grey-lightest">
      {list?.map((item, index) => (
        <li
          key={`${item.title}-${index}`}
          className={classNames('flex mb-1.5 w-full lg:w-1/2 ', {
            'items-center': !item.description,
            'items-start': item.description
          })}
        >
          <div className="flex items-center justify-center rounded-full min-w-6 min-h-6 bg-ui-black-5 mr-2">
            {item.icon}
          </div>
          <div className="flex flex-col max-w-33">
            {item.title && <h5 className="font-semibold">{item.title}</h5>}
            {item.description && <p className="text-sm">{item.description}</p>}
            {item.link && (
              <Link href={item.link}>
                <a className="text-sm text-primary">{item.link.text}</a>
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
