export const getCountryTagFromLocale = locale =>
  `country-${locale?.split('-')[1]}`.toLowerCase()
