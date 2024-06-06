import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as NavUser } from '~assets/svg/navigation-24px/NavUser.svg'
import { Button } from '~components/atoms/Button'

export type PersonalDetailsSummaryProps = {
  email?: string
  salutation?: string
  firstName?: string
  lastName?: string
  onClick: () => void
}

export const PersonalDetailsSummary: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & PersonalDetailsSummaryProps
> = ({ email, firstName, lastName, salutation, onClick, ...props }) => {
  const { t } = useTranslation()

  return (
    <div
      data-testid="personalDetailsSummary"
      className="flex flex-col border mb-3 sm:mb-4 lg:mb-5"
      {...props}
    >
      <div
        data-testid="personalDetailsSummaryHeader"
        className="flex justify-between p-2 border-b border-ui-grey-light"
      >
        <div className="flex gap-1">
          <NavUser className="icon-24" />
          <span className="font-semibold">
            {t('create-account.your-details')}
          </span>
        </div>
        <Button
          data-testid="personalDetailsSummaryButton"
          onClick={() => onClick()}
          variant="underlined"
        >
          {t('create-account.edit')}
        </Button>
      </div>
      <div
        data-testid="personalDetailsSummaryBody"
        className="flex flex-col p-2"
      >
        <span className="break-words">{`${salutation} ${firstName} ${lastName}`}</span>
        <span>{email}</span>
      </div>
    </div>
  )
}
