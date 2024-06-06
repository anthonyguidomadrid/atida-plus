import { FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { MAX_RATING } from '~config/constants/reviews'

export type ReviewsProps = {
  rating?: number
  numberOfReviews?: number
  showTranslation?: boolean
  className?: string
}

const Rating: FunctionComponent<{
  rating: number
  className?: string
  isEmpty: boolean
}> = ({ rating, className }) => {
  const fullStars = useMemo(() => Math.floor(rating), [rating])
  const halfStar = useMemo(() => (rating % 1 ? 1 / 2 : 0), [rating])

  const totalStars = useMemo(() => fullStars + halfStar, [fullStars, halfStar])

  return (
    <i
      data-testid="stars"
      className={classNames(
        'icon-stars',
        className,
        `icon-stars-${totalStars.toString().replace('.', '-')}`
      )}
    />
  )
}

export const Reviews: FunctionComponent<ReviewsProps> = ({
  rating = 0,
  numberOfReviews = 0,
  showTranslation = false,
  className
}) => {
  const { t } = useTranslation()
  const isValid = useMemo(() => rating >= 0 && rating <= MAX_RATING, [rating])

  const isEmpty = useMemo(() => rating === 0 && numberOfReviews === 0, [
    numberOfReviews,
    rating
  ])
  const label = useMemo(
    () =>
      showTranslation
        ? isEmpty
          ? t('product.review-empty')
          : t('product.review-count', { count: numberOfReviews })
        : numberOfReviews,
    [isEmpty, numberOfReviews, showTranslation, t]
  )

  return (
    <div className={classNames('flex items-end space-x-0.75', className)}>
      <Rating rating={rating} isEmpty={isEmpty || !isValid} />
      <span data-testid="numberOfReviews" className="text-sm leading-none">
        ({label})
      </span>
    </div>
  )
}

export const ReviewsPlaceholder = () => (
  <div className="icon-stars-placeholder bg-ui-grey-lightest rounded mt-0.75 opacity-50" />
)
