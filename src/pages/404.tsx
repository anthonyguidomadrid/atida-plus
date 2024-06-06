import { NextPage } from 'next'
import NextLink from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ReactComponent as NotFound } from '~assets/svg/notFound.svg'
import { commonTrigger, selectCommonSuccess } from '~domains/page'
import { useBreakpoint } from '~domains/breakpoints'
import { breakpoints } from '~domains/breakpoints/config'
import { Link } from '~components/atoms/Link'
import { MetaData } from '~components/meta/MetaData'

const PageNotFound: NextPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const commonIsSuccess = useSelector(selectCommonSuccess)
  const isMediumScreen = useBreakpoint(breakpoints.md)
  useEffect(() => {
    if (!commonIsSuccess) dispatch(commonTrigger())
  }, [dispatch, commonIsSuccess])

  return (
    <>
      <MetaData title={t('404-page.title')} />
      <main className="flex flex-col items-center text-center pt-9 px-4 pb-18 sm:pt-8 sm:pb-17 md:pt-8 lg:pt-13 lg:pb-22">
        <h1>{t('404-page.title')}</h1>
        <NotFound
          width={isMediumScreen ? '160' : '120'}
          height={isMediumScreen ? '160' : '120'}
          data-testid="404PageIcon"
        />
        <NextLink href="/" passHref prefetch={false}>
          <Link
            data-testid="404PageButton"
            className="text-primary-white no-underline bg-primary-oxford-blue px-3 py-2 hover:text-primary-white mt-2"
          >
            {t('404-page.back-button')}
          </Link>
        </NextLink>
      </main>
    </>
  )
}

export default PageNotFound
