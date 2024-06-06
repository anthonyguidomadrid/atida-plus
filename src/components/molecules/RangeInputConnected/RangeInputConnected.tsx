import { connectRange } from 'react-instantsearch-dom'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { queryToSearchState } from '~helpers/queryToSearchState'

export type CurrentRefinement = {
  min: number
  max: number
}

export type RangeInputConnectedType = {
  min: number
  max: number
  precision: number
  refine: (value: CurrentRefinement) => unknown
  currentRefinement: CurrentRefinement
}

export const RangeInput = ({
  currentRefinement,
  refine,
  min,
  max,
  precision
}: RangeInputConnectedType): JSX.Element => {
  const minPricePlaceholder = Math.round(min / 100)
  const maxPricePlaceholder = Math.round(max / 100)
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const { t } = useTranslation()
  const maxInputRef = useRef<HTMLInputElement | null>(null)
  const minInputRef = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  const getDefaultValues = useCallback(() => {
    const searchState = queryToSearchState(router?.query)
    if (!searchState.priceRange) return []
    const defaultValuesArr = searchState.priceRange.split('-')
    return defaultValuesArr
  }, [router?.query])

  const [defaultValues, setDefaultValues] = useState<string[]>([])
  useEffect(() => {
    setDefaultValues(getDefaultValues())
  }, [getDefaultValues])

  const [minDefaultValue, maxDefaultValue] = defaultValues ?? []

  const onMinRefinement = (event: FormEvent<HTMLInputElement>) => {
    const minValue = Math.round(+event?.currentTarget.value) * 100
    setMinPrice(minValue)
  }

  const onMaxRefinement = (event: FormEvent<HTMLInputElement>) => {
    const maxValue = Math.round(+event?.currentTarget.value) * 100
    setMaxPrice(maxValue)
  }

  const onPriceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (minPrice === 0 && maxPrice === 0) {
      setMaxPrice(null)
      setMinPrice(null)

      if (maxInputRef.current) {
        maxInputRef.current.value = ''
      }
      if (minInputRef.current) {
        minInputRef.current.value = ''
      }

      return refine({
        ...currentRefinement,
        max: 0
      })
    }
    if (minPrice && !maxPrice) {
      return refine({
        ...currentRefinement,
        min: minPrice,
        max: 0
      })
    }
    refine({
      ...currentRefinement,
      min: minPrice && minPrice >= min ? minPrice : min,
      max: maxPrice && maxPrice < max && maxPrice > 0 ? maxPrice : max
    })
  }
  return (
    <div
      className={classNames('font-light text-sm flex flex-row justify-between')}
      data-testid="rangeInput"
    >
      <form
        onSubmit={onPriceSubmit}
        className={classNames('font-light text-sm w-full flex')}
      >
        <label className="sr-only" htmlFor="minimumPrice">
          {t('search.filter.price.minimum')}
        </label>
        <input
          type="number"
          data-testid="minField"
          id="minimumPrice"
          ref={minInputRef}
          defaultValue={minDefaultValue && minDefaultValue}
          min={0}
          className={classNames(
            'font-light text-sm leading-5 mr-1 flex-1 max-w-8 lg:max-w-7 py-1 pl-1.5 pr-0.25 border border-solid border-ui-grey-light rounded'
          )}
          step={precision / 2}
          placeholder={minPricePlaceholder.toString()}
          onChange={onMinRefinement}
        />
        <div className="self-center mr-1">{t('search.filter.price.to')}</div>
        <label className="sr-only" htmlFor="maximumPrice">
          {t('search.filter.price.maximum')}
        </label>
        <input
          type="number"
          id="maximumPrice"
          data-testid="maxField"
          ref={maxInputRef}
          defaultValue={maxDefaultValue && maxDefaultValue}
          min={0}
          className={classNames(
            'font-light text-sm leading-5 mr-1 flex-1 max-w-8 lg:max-w-7 py-1 pl-1.5 pr-0.25 border border-ui-grey-light rounded'
          )}
          placeholder={maxPricePlaceholder.toString()}
          step={precision / 2}
          onChange={onMaxRefinement}
        />
        <button
          className={classNames(
            'py-1 px-1.5 text-sm leading-5 max-w-6 m-0 rounded bg-primary-oxford-blue text-primary-white content-center'
          )}
          type="submit"
          data-testid="priceFilterButton"
        >
          {t('search.filter.range-submit')}
        </button>
      </form>
    </div>
  )
}

export const RangeInputConnected = connectRange(RangeInput)
