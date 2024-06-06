import { useTranslation } from 'react-i18next'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { ReactComponent as NavBasket } from '~assets/svg/navigation-24px/NavBasket.svg'
import { Button, ButtonProps } from '.'

export default {
  component: Button,
  title: 'atoms/Button',
  args: {
    disabled: false
  }
}

export const basic = (args: ButtonProps): JSX.Element => (
  <Button {...args}>Atida Plus</Button>
)

export const withIcon = (args: ButtonProps): JSX.Element => (
  <Button {...args}>Atida Plus</Button>
)
withIcon.args = {
  icon: <ChevronLeft className="icon-16" />
}

export const withIconOnly = (args: ButtonProps): JSX.Element => (
  <Button {...args} aria-label="Atida Plus" />
)
withIconOnly.args = {
  icon: <ChevronLeft className="icon-16" />
}

export const withCustomColor = (args: ButtonProps): JSX.Element => (
  <Button {...args}>Atida Plus</Button>
)
withCustomColor.args = {
  className: 'bg-primary-caribbean-green hover:bg-primary-caribbean-green-light'
}

export const addToBasket = (args: ButtonProps): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation()
  return <Button {...args}>{t('product.add-to-basket')}</Button>
}
addToBasket.args = {
  className: 'min-w-34',
  icon: <NavBasket className="icon-24" />
}

export const secondary = (args: ButtonProps): JSX.Element => (
  <Button {...args}>Atida Plus</Button>
)
secondary.args = {
  variant: 'secondary'
}
