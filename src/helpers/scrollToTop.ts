export const toggleBackToTopButtonVisibility = (): void => {
  const scrollToTopButton = globalThis?.document?.getElementById(
    'backToTopButton'
  ) as HTMLElement

  const viewPortHeight = window?.innerHeight

  if (window?.pageYOffset > viewPortHeight) {
    scrollToTopButton?.classList.add('opacity-1')
    scrollToTopButton?.classList.remove('opacity-0', 'pointer-events-none')
  } else {
    scrollToTopButton?.classList.remove('opacity-1')
    scrollToTopButton?.classList.add('opacity-0', 'pointer-events-none')
  }
}

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
