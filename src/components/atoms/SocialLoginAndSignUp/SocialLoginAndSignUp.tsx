import { ComponentPropsWithoutRef, FunctionComponent, useEffect } from 'react'
import { Button } from '../Button'
import { ReactComponent as Google } from '~assets/svg/social/login-and-signup/google.svg'
import { ReactComponent as Apple } from '~assets/svg/social/login-and-signup/apple.svg'
import { ReactComponent as FaceBook } from '~assets/svg/social/login-and-signup/facebook.svg'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { socialLoginTrigger } from '~domains/social'
import { useRouter } from 'next/router'
import { SOCIAL_LOGIN_SERVICE_TYPE } from '~config/constants/social-login-service-types'

export type SocialLoginAndSignUpServiceTypes = typeof SOCIAL_LOGIN_SERVICE_TYPE[keyof typeof SOCIAL_LOGIN_SERVICE_TYPE]

export type SocialLoginAndSignUpProps = {
  label: string
  labelClassName?: string
  isFaceBookEnabled: boolean
  isGoogleEnabled: boolean
  isAppleEnabled: boolean
  handleOnClick: (serviceType: SocialLoginAndSignUpServiceTypes) => void
}

export const SocialLoginAndSignUp: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & SocialLoginAndSignUpProps
> = ({
  isFaceBookEnabled,
  isGoogleEnabled,
  isAppleEnabled,
  handleOnClick,
  label,
  className,
  labelClassName = ''
}) => {
  const { t } = useTranslation()
  const { query, replace } = useRouter()
  const { code, social, firstName, lastName } = query
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      code &&
      Object.values(SOCIAL_LOGIN_SERVICE_TYPE).includes(
        social as SocialLoginAndSignUpServiceTypes
      )
    ) {
      dispatch(
        socialLoginTrigger({
          code: typeof code === 'string' ? code : code[0],
          serviceType: social as SocialLoginAndSignUpServiceTypes,
          ...(firstName && {
            firstName: typeof firstName === 'string' ? firstName : firstName[0]
          }),
          ...(lastName && {
            lastName: typeof lastName === 'string' ? lastName : lastName[0]
          })
        })
      )
      delete query.code
      firstName && delete query.firstName
      lastName && delete query.lastName
      replace(
        {
          query
        },
        undefined,
        { shallow: true }
      )
    }
  }, [dispatch, code, social, firstName, lastName, query, replace])

  return (
    <div className={classNames(className)}>
      <div
        data-testid="socialLoginContainer"
        className={classNames(
          'flex place-content-evenly text-center text-sm text-ui-grey-dark',
          labelClassName
        )}
      >
        <span className="w-full h-0.125 opacity-10 self-center bg-ui-grey-dark" />
        <span className="inline-flex px-1 whitespace-nowrap">{t(label)}</span>
        <span className="w-full h-0.125 opacity-10 self-center bg-ui-grey-dark" />
      </div>
      <div className="w-full place-content-evenly space-x-1 flex flex-row">
        {isGoogleEnabled && (
          <Button
            data-testid="socialLoginButtonGoogle"
            variant="tertiary"
            className="w-full h-6"
            aria-label="socialLoginButtonGoogle"
            onClick={() => handleOnClick(SOCIAL_LOGIN_SERVICE_TYPE.google)}
            icon={<Google className="icon-24" />}
            singleIcon
          />
        )}
        {isAppleEnabled && (
          <Button
            data-testid="socialLoginButtonApple"
            variant="tertiary"
            className="w-full h-6"
            aria-label="socialLoginButtonApple"
            onClick={() => handleOnClick(SOCIAL_LOGIN_SERVICE_TYPE.apple)}
            icon={<Apple className="icon-24" />}
            singleIcon
          />
        )}
        {isFaceBookEnabled && (
          <Button
            data-testid="socialLoginButtonFaceBook"
            variant="tertiary"
            className="w-full h-6"
            aria-label="socialLoginButtonFaceBook"
            onClick={() => handleOnClick(SOCIAL_LOGIN_SERVICE_TYPE.facebook)}
            icon={<FaceBook className="icon-24" />}
            singleIcon
          />
        )}
      </div>
    </div>
  )
}
