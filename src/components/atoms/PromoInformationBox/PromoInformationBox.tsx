import { FunctionComponent } from 'react'
import classNames from 'classnames'

export type PromoInformationBoxProps = {
  promoInformation: string | JSX.Element | JSX.Element[]
  hasGift: boolean
}

/**
 * Displays an explanation about how the promotion works.
 * The background color of the "box" changes based on whether the promotion includes a gift.
 * @param explanation - the text to be shown
 * @param hasGift - used to change the color of the background
 */
export const PromoInformationBox: FunctionComponent<PromoInformationBoxProps> = ({
  promoInformation,
  hasGift
}) => (
  <div
    data-testid="promoExplanationBox"
    className={classNames('mt-2 px-3 py-2', {
      'bg-secondary-light-pink': hasGift,
      'bg-secondary-champagne-pink': !hasGift
    })}
  >
    {promoInformation}
  </div>
)
