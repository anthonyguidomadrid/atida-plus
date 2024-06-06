import {
  BaseSyntheticEvent,
  FunctionComponent,
  useState,
  useEffect,
  RefObject,
  useRef,
  useCallback
} from 'react'
import { Button } from '~components/atoms/Button'
import { Product } from '~domains/product'
import { Trans, useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'

import { ReactComponent as NavBasket } from '~assets/svg/navigation-24px/Basket.svg'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { ReactComponent as Add } from '~assets/svg/navigation-16px/NavAdd.svg'
import { useDispatch } from 'react-redux'
import { triggerReportBasketIconClicked } from '~domains/analytics'

export type BasketNotificationProps = {
  product?: Product
  products?: Partial<Product>[]
  basketNotificationRef?: RefObject<HTMLDivElement>
  isRemoved?: boolean
  wasItemError?: boolean
  wasItemSuccess?: boolean
  isModalOpen?: boolean
  onTransitionEnd?: () => void
  basketItems?: number
  hasPromotionalItem?: boolean
  isPromotionalItemOutOfStock?: boolean
}

export const BasketNotification: FunctionComponent<BasketNotificationProps> = ({
  product,
  products,
  isRemoved,
  isModalOpen,
  basketNotificationRef,
  onTransitionEnd,
  wasItemSuccess,
  basketItems,
  wasItemError,
  hasPromotionalItem,
  isPromotionalItemOutOfStock
}) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const isLargeScreen = useBreakpoint(breakpoints.sm)
  const dispatch = useDispatch()

  useEffect(() => {
    if (basketNotificationRef) {
      basketNotificationRef?.current?.classList.remove('opacity-0')
      basketNotificationRef?.current?.classList.remove(
        'basketNotificationFadeOut'
      )
      if (isLargeScreen) {
        basketNotificationRef?.current?.classList.add(
          'basketNotificationFadeInDesktop'
        )
      } else {
        basketNotificationRef?.current?.classList.add(
          'basketNotificationFadeInMobile'
        )
      }
    }
  }, [basketNotificationRef, isLargeScreen])

  useEffect(() => {
    setTimeout(() => {
      if (barRef && barRef.current) {
        barRef?.current?.classList.remove('w-0')
        barRef?.current?.classList.add('transition-all')
        barRef?.current?.classList.add('duration-2000')
        barRef?.current?.classList.add('w-full')
      }
    }, 0)
  }, [barRef])

  const viewBasketTrigger = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault()
      setIsLoading(true)
      dispatch(
        triggerReportBasketIconClicked({
          icon_clicked_from: 'basket_notification'
        })
      )
      push('/basket')
    },
    [dispatch, push]
  )

  const LoadingBarText = useCallback(() => {
    if (isRemoved) {
      if (hasPromotionalItem) {
        return (
          <Trans
            i18nKey={'basket.notification-product-gift-removed'}
            components={{ b: <b /> }}
          />
        )
      } else {
        return t('basket.notification-product-removed')
      }
    } else {
      if (hasPromotionalItem) {
        return (
          <Trans
            i18nKey={'basket.notification-product-gift-added'}
            components={{ b: <b /> }}
          />
        )
      } else {
        if (isPromotionalItemOutOfStock)
          return (
            <Trans
              i18nKey={'basket.notification-product-added-gift-out-of-stock'}
              components={{ b: <b /> }}
            />
          )
        else return t('basket.notification-product-added')
      }
    }
  }, [hasPromotionalItem, isPromotionalItemOutOfStock, isRemoved, t])

  const BasketCart = useCallback(
    () => (
      <NextLink href="/basket" passHref prefetch={false}>
        <Link
          aria-label={
            basketItems
              ? `${t('shared.basket')}, ${basketItems}`
              : t('shared.basket')
          }
          className="text-right inline-block no-underline relative md:flex md:h-full p-1 md:py-0 sm:p-1.5 hover:text-primary-oxford-blue hover:bg-ui-black-5 active:bg-ui-black-10 transition-colors duration-300 ease-in rounded"
        >
          <NavBasket
            className={classNames('icon-24 inline-block ')}
            data-testid="headerActionsBasket"
          />
          {!wasItemSuccess && (
            <div
              data-testid="basketBadge"
              className={classNames(
                'w-2.5 h-2.5 text-center rounded-full text-xs text-primary-white bg-secondary-portland-orange absolute md:relative box-content border md:border-none border-transparent right-0 top-0 sm:right-0.5 sm:top-0.75 md:top-0 md:right-0 md:ml-0.5'
              )}
            >
              <div className="relative -top-1.125 h-0 py-1/2 px-1.5px font-semibold">
                !
              </div>
            </div>
          )}
          {!wasItemError && basketItems && basketItems > 0 ? (
            <div
              data-testid="basketBadge"
              className={classNames(
                'flex items-center justify-center w-2.5 h-2.5 text-center rounded-full text-xs text-primary-white bg-primary-caribbean-green-dark absolute md:relative box-content border md:border-none border-transparent right-0 top-0 sm:right-0.5 sm:top-0.75 md:top-0 md:right-0 md:ml-0.5',
                {
                  'bg-primary-caribbean-green-dark': !isRemoved,
                  'bg-feedback-warning': isRemoved
                }
              )}
            >
              <div data-testid="basketItems" className="font-semibold">
                {basketItems}
              </div>
            </div>
          ) : null}
        </Link>
      </NextLink>
    ),
    [basketItems, isRemoved, t, wasItemError, wasItemSuccess]
  )

  const ProductName = useCallback(
    (productName: string) => (
      <div
        className={classNames('grow-1', {
          'max-w-19': wasItemSuccess && !!basketItems
        })}
      >
        <h3
          data-testid="basketProductModalName"
          className={classNames('font-body font-light', {
            'line-clamp-2': wasItemSuccess && !!basketItems,
            'w-full': !wasItemSuccess,
            'text-base': isLargeScreen,
            'text-sm': !isLargeScreen
          })}
        >
          {productName}
        </h3>
      </div>
    ),
    [basketItems, isLargeScreen, wasItemSuccess]
  )

  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div data-testid="basketNotification" className="flex justify-end">
      {isModalOpen && (
        <div
          ref={basketNotificationRef}
          className={classNames(
            'right-0 fixed top-0 w-full sm:w-0 sm:right-[55%] md:right-[45%] lg:right-[33%] z-50 transition-all opacity-1 ',
            {
              'sm:top-10': scrollPosition >= 35,
              'sm:top-22': scrollPosition < 35,
              'md:top-10': scrollPosition >= 35,
              'md:top-15': scrollPosition < 35
            }
          )}
        >
          <div
            className={classNames('bg-primary-white sm:w-50 w-full absolute')}
          >
            <div
              className={classNames(
                'flex flex-col  border rounded border-overlay shadow-modal',
                {
                  'p-3': isLargeScreen
                }
              )}
            >
              {wasItemSuccess && (
                <div
                  className={classNames(
                    ' flex w-full h-9 overflow-hidden relative items-center'
                  )}
                >
                  <div
                    className={classNames('w-full h-full absolute rounded', {
                      'bg-ui-carribean-green-lightest': !isRemoved,
                      'bg-feedback-warning-light': isRemoved
                    })}
                  />
                  <div
                    ref={barRef}
                    onTransitionEnd={onTransitionEnd}
                    className={classNames(
                      'absolute w-0 h-full rounded ease-linear ',
                      {
                        'bg-feedback-warning-dark': isRemoved,
                        'bg-ui-carribean-green-dark':
                          !isRemoved && isLargeScreen,
                        'bg-ui-carribean-green-light':
                          !isRemoved && !isLargeScreen
                      }
                    )}
                  />
                  {isRemoved ? (
                    <div
                      className={classNames(
                        'flex absolute w-full px-3 items-center',
                        {
                          'justify-between': !isLargeScreen,
                          'justify-center': isLargeScreen
                        }
                      )}
                    >
                      <p
                        className={classNames('mr-3 mt-0.5', {
                          'text-base': isLargeScreen,
                          'text-sm': !isLargeScreen
                        })}
                      >
                        {LoadingBarText()}
                      </p>
                      {!isLargeScreen && BasketCart()}
                    </div>
                  ) : (
                    <div
                      className={classNames(
                        'flex absolute w-full px-3 items-center',
                        {
                          'justify-between': !isLargeScreen,
                          'justify-center': isLargeScreen
                        }
                      )}
                    >
                      <p
                        className={classNames('mr-3 mt-0.5', {
                          'text-base': isLargeScreen,
                          'text-sm': !isLargeScreen
                        })}
                      >
                        {LoadingBarText()}
                      </p>
                      {!isLargeScreen && BasketCart()}
                    </div>
                  )}
                </div>
              )}
              {wasItemError && (
                <div
                  className={classNames(
                    'flex w-full h-9 overflow-hidden relative items-center'
                  )}
                >
                  <div
                    className={classNames('w-full h-full absolute rounded ', {
                      'bg-secondary-red-100': !isLargeScreen,
                      'bg-secondary-champagne-pink': isLargeScreen
                    })}
                  />
                  <div
                    ref={barRef}
                    onTransitionEnd={onTransitionEnd}
                    className={classNames(
                      'absolute w-0  h-full rounded ease-linear ',
                      {
                        'bg-feedback-error-light': !isLargeScreen,
                        'bg-secondary-champagne-pink-dark': isLargeScreen
                      }
                    )}
                  />
                  {isRemoved ? (
                    <div
                      className={classNames(
                        'flex absolute w-full px-3 items-center',
                        {
                          'justify-between': !isLargeScreen,
                          'justify-center': isLargeScreen
                        }
                      )}
                    >
                      <p
                        className={classNames('mr-3 mt-0.5', {
                          'text-base': isLargeScreen,
                          'text-sm': !isLargeScreen
                        })}
                      >
                        {t(
                          'basket.notification-product-unsuccessfully-removed'
                        )}
                      </p>
                      {!isLargeScreen && BasketCart()}
                    </div>
                  ) : (
                    <div
                      className={classNames(
                        'flex absolute w-full px-3 items-center',
                        {
                          'justify-between': !isLargeScreen,
                          'justify-center': isLargeScreen
                        }
                      )}
                    >
                      <p
                        className={classNames('mr-3 mt-0.5', {
                          'text-base': isLargeScreen,
                          'text-sm': !isLargeScreen
                        })}
                      >
                        {t('basket.notification-product-unsuccessfully-added')}
                      </p>
                      {!isLargeScreen && BasketCart()}
                    </div>
                  )}
                </div>
              )}
              <div
                className={classNames('flex items-center', {
                  'justify-between': wasItemSuccess,
                  'pb-2 pr-2 mt-2 pl-2': !isLargeScreen,
                  ' mt-3': isLargeScreen
                })}
              >
                {!product && products && products?.length > 0 && (
                  <div className="flex items-center">
                    {products?.map((product, idx) => (
                      <div className="flex items-center" key={product.sku}>
                        <img
                          src={product.mediumImage}
                          alt={product.name}
                          key={product.sku}
                          className="w-6"
                          data-testid="added-to-basket-popup-image"
                        />
                        {idx !== products.length - 1 && (
                          <Add
                            className="icon-16 button__icon--before w-1.5 mx-1.25"
                            data-testid="freq-bought-together-plus-icon"
                          />
                        )}
                      </div>
                    ))}
                    {products.length === 1 &&
                      products[0].name &&
                      ProductName(products?.[0]?.name)}
                  </div>
                )}
                {product && !products && (
                  <div className="flex items-center">
                    <div
                      className={classNames('w-6 h-6 mr-2', {
                        'mr-2': !wasItemSuccess
                      })}
                    >
                      <img
                        data-testid="basketProductNotificationImage"
                        className="object-contain"
                        src={product?.thumbnailImage}
                        alt={product?.name}
                      />
                    </div>
                    {ProductName(product?.name)}
                  </div>
                )}
                {wasItemSuccess && !!basketItems && (
                  <Button
                    data-testid="basketNotificationViewBasket"
                    className="h-6 sm:max-w-27 mt-0"
                    onClick={viewBasketTrigger}
                    isLoading={isLoading}
                    variant="tertiary"
                  >
                    {t('basket.modal-view-basket')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
