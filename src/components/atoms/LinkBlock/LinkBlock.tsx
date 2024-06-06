import { ComponentPropsWithRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import { Button } from '../Button'
import { mapIconReferenceToIconComponent } from '~domains/contentful'

export type LinkBlockProps = ComponentPropsWithRef<'div'> & {
  label?: string
  url?: string
  icon?: string
  isCTA?: boolean
}

export const LinkBlock: FunctionComponent<LinkBlockProps> = ({
  label,
  url,
  icon,
  className
}) => {
  const { push } = useRouter()
  const Icon = mapIconReferenceToIconComponent(icon)

  const handleClick = (url?: string) => () => url && push(url)

  return (
    <div
      className={classNames(
        'flex justify-center items-center w-full',
        className
      )}
      data-testid="LinkBlock"
    >
      <Button
        className="whitespace-nowrap"
        icon={<Icon width="20" />}
        iconPosition="before"
        variant="secondary"
        onClick={handleClick(url)}
      >
        {label}
      </Button>
    </div>
  )
}
