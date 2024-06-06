import { useCallback, useEffect, useState } from 'react'
import { useBreakpoint, breakpoints } from '~domains/breakpoints'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export const useScrollHandler = (): {
  hideSearchBar: boolean | null
} => {
  const isStickyFilterAndSortButtonEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_STICKY_FILTER_AND_SORT_BUTTON
  )

  const isDesktopScreen = useBreakpoint(breakpoints.md)
  const isNotMobile = useBreakpoint(breakpoints.sm)

  const filtersAndSortButton = globalThis?.document?.getElementById(
    'filtersAndSortButton'
  ) as HTMLElement
  const filtersAndProductViewWrapper = globalThis?.document?.getElementById(
    'filtersAndProductViewWrapper'
  ) as HTMLElement

  const subHeader = globalThis?.document?.getElementById(
    'subHeader'
  ) as HTMLElement
  const searchBar = globalThis?.document?.getElementById(
    'searchBar'
  ) as HTMLElement

  const subHeaderHeight = subHeader && subHeader.getBoundingClientRect().height

  const [hideSearchBar, setHideSearchBar] = useState<boolean | null>(false)
  const [prevOffsetY, setPrevOffsetY] = useState(0)

  const handleScrollDown = useCallback(() => {
    const filtersButtonYPosition =
      filtersAndSortButton && filtersAndSortButton.getBoundingClientRect().top

    const scrollY = window.scrollY
    if (scrollY > prevOffsetY) {
      setHideSearchBar(true)

      //TODO: remove feature flag once implementation is confirmed to be ok
      if (isStickyFilterAndSortButtonEnabled) {
        //if filters button Y position is less than sub-header hight(72px) + padding(16px) means that the button is about to go out of view so we make it fixed

        if (filtersButtonYPosition <= subHeaderHeight + 16) {
          //on mobile we make only the filters button fixed
          !isNotMobile &&
            filtersAndSortButton &&
            filtersAndSortButton.classList.add(
              'fixed',
              'z-30',
              'left-0',
              'w-full',
              'container',
              'easy-transition-y',
              'duration-300'
            )

          // on tablet (sm screen) we make fixed the whole section that holds the filters button
          isNotMobile &&
            !isDesktopScreen &&
            filtersAndProductViewWrapper &&
            filtersAndProductViewWrapper.classList.add(
              'fixed',
              'z-30',
              'left-0',
              'w-full',
              'container',
              'border-b',
              'border-ui-black-10'
            )

          isNotMobile &&
            !isDesktopScreen &&
            filtersAndProductViewWrapper &&
            filtersAndProductViewWrapper.classList.remove('sm:px-0')
        }
        // handle filters top position for mobile based on whether the search bar is collapsed to icon or not
        !isNotMobile &&
          filtersAndSortButton &&
          filtersAndSortButton.style.setProperty('top', `${subHeaderHeight}px`)

        // handle filters top position for tablet (sm screen) based on whether the search bar is collapsed to icon or not
        isNotMobile &&
          !isDesktopScreen &&
          filtersAndProductViewWrapper &&
          filtersAndProductViewWrapper.style.setProperty(
            'top',
            `${subHeaderHeight}px`
          )
      }
    }
    setPrevOffsetY(scrollY)
  }, [
    prevOffsetY,
    filtersAndSortButton,
    isNotMobile,
    isDesktopScreen,
    filtersAndProductViewWrapper,
    isStickyFilterAndSortButtonEnabled,
    subHeaderHeight
  ])

  const handleScrollUp = useCallback(() => {
    const searchCountGridListWrapper = globalThis?.document?.getElementById(
      'searchCountGridListWrapper'
    ) as HTMLElement

    const searchBarHeight =
      searchBar && searchBar.getBoundingClientRect().height

    const searchCountGridListWrapperYPosition =
      searchCountGridListWrapper &&
      searchCountGridListWrapper.getBoundingClientRect().top

    const heightFilterAndSortButton = filtersAndSortButton
      ? filtersAndSortButton.getBoundingClientRect().height + 22
      : 0

    const heigthSubHeaderSearchBarAndFilterButton =
      searchBarHeight + subHeaderHeight + heightFilterAndSortButton

    const scrollY = window.scrollY
    if (scrollY < prevOffsetY) {
      setHideSearchBar(false)
      //TODO: remove feature flag once implementation is confirmed to be ok
      if (isStickyFilterAndSortButtonEnabled) {
        //if scroll Y position is intersecting the original position of the filters button the fixed class is removed and it gets relative again
        if (
          scrollY <=
          searchCountGridListWrapperYPosition +
            heigthSubHeaderSearchBarAndFilterButton
        ) {
          filtersAndSortButton &&
            filtersAndSortButton.classList.remove(
              'fixed',
              'z-30',
              'left-0',
              'w-full',
              'pl-2',
              'pr-2',
              'container'
            )

          filtersAndProductViewWrapper &&
            filtersAndProductViewWrapper.classList.remove(
              'fixed',
              'z-30',
              'left-0',
              'w-full',
              'pl-5',
              'pr-5',
              'border-b',
              'border-ui-black-10'
            )

          filtersAndProductViewWrapper &&
            filtersAndProductViewWrapper.classList.add('sm:px-0')
        }
        // handle filters top position for mobile based on whether the search bar is collapsed to icon or not
        filtersAndSortButton &&
          filtersAndSortButton.style.setProperty(
            'top',
            `${searchBarHeight + subHeaderHeight}px`
          )

        // handle filters top position for tablet (sm screen) based on whether the search bar is collapsed to icon or not
        filtersAndProductViewWrapper &&
          filtersAndProductViewWrapper.style.setProperty(
            'top',
            `${searchBarHeight + subHeaderHeight}px`
          )
      }
    }
    setPrevOffsetY(scrollY)
  }, [
    searchBar,
    subHeaderHeight,
    prevOffsetY,
    isStickyFilterAndSortButtonEnabled,
    filtersAndSortButton,
    filtersAndProductViewWrapper
  ])

  useEffect(() => {
    window.addEventListener('scroll', handleScrollDown)
    window.addEventListener('scroll', handleScrollUp)

    return () => {
      window.removeEventListener('scroll', handleScrollDown)
      window.removeEventListener('scroll', handleScrollUp)
    }
  }, [handleScrollDown, handleScrollUp])

  return { hideSearchBar }
}
