import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  GetPasswordStrength,
  MINIMUM_LENGTH_POLICY,
  passwordPolicyTypes,
  SECURITY_LEVEL_STRONG
} from '~helpers'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'

export type PasswordStrengthIndicatorProps = ComponentPropsWithoutRef<'div'> & {
  password: string
  showBullets?: boolean
}

export const PasswordStrengthIndicator: FunctionComponent<PasswordStrengthIndicatorProps> = ({
  password = '',
  showBullets = true
}) => {
  const { t } = useTranslation()

  const {
    passedPolicies,
    strengthIndicator,
    securityLevel
  } = GetPasswordStrength(password)

  const getListSymbol = (selectedPolicy: passwordPolicyTypes) => {
    return (
      <Checkmark
        className={classNames(
          'w-3 h-3 p-0.5 mr-1 rounded-full',
          {
            'bg-primary-oxford-blue text-primary-white': policyMatches(
              selectedPolicy
            )
          },
          {
            'bg-primary-oxford-blue-5 text-feedback-success-20': !policyMatches(
              selectedPolicy
            )
          }
        )}
      />
    )
  }

  const [shouldFadeOut, setShouldFadeOut] = useState(false)

  const policyMatches = useCallback(
    (selectedPolicy: passwordPolicyTypes) => {
      return passedPolicies?.length && passedPolicies.includes(selectedPolicy)
    },
    [passedPolicies]
  )

  useEffect(() => {
    const waitTime = !!policyMatches(MINIMUM_LENGTH_POLICY) ? 1000 : 0
    setTimeout(() => {
      setShouldFadeOut(!!policyMatches(MINIMUM_LENGTH_POLICY))
    }, waitTime)
  }, [securityLevel, policyMatches])

  return (
    <>
      <div
        className="w-full -mt-1 mb-2 text-ui-grey-dark text-sm"
        data-testid="passwordStrengthIndicator"
      >
        {password.length > 0 ? (
          <p
            className={classNames('w-full', {
              'text-feedback-success': securityLevel === SECURITY_LEVEL_STRONG
            })}
          >
            {t('password-strength.title')}: {strengthIndicator}
          </p>
        ) : (
          <p className="w-full">{t('password-strength.policy-title')}:</p>
        )}
        {showBullets && (
          <div
            data-testid="passwordStrengthIndicatorBullets"
            className={classNames('password-strength', {
              collapsed: shouldFadeOut
            })}
          >
            <ul className="text-base text-ui-grey-dark">
              <li
                data-testid="passwordStrengthIndicator-minimumLengthPolicy"
                className="flex items-center mb-1"
              >
                {getListSymbol(MINIMUM_LENGTH_POLICY)}
                <span
                  className={classNames({
                    'text-primary-oxford-blue mt-0.5': policyMatches(
                      MINIMUM_LENGTH_POLICY
                    )
                  })}
                >
                  {t('password-strength.policy.minimum-length')}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
