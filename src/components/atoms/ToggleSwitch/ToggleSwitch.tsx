import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { ReactComponent as Check } from '~assets/svg/navigation-24px/Checkmark.svg'
import { ReactComponent as Spinner } from '~assets/svg/navigation-24px/Spinner.svg'
interface ToggleSwitchProps {
  isToggleLocked?: boolean
  onToggleSwitch: () => void
  toggleEnabled: boolean
  isLoading: boolean
}

export const ToggleSwitch: FunctionComponent<ToggleSwitchProps> = ({
  isToggleLocked,
  toggleEnabled,
  onToggleSwitch,
  isLoading
}): JSX.Element => (
  <div
    data-testid="toggleSwitch"
    className="relative flex flex-col overflow-hidden items-center"
  >
    <div className="flex">
      <label className="inline-flex relative items-center">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isToggleLocked || toggleEnabled}
          readOnly
          data-testid={toggleEnabled ? 'toggleSwitchOn' : 'toggleSwitchOff'}
        />
        {isToggleLocked && (
          <Check
            className="icon-16 text-primary-white absolute cursor-not-allowed left-[5px]"
            data-testid="toggleSwitchDisabledIcon"
          />
        )}
        <button
          disabled={isToggleLocked || isLoading}
          data-testid="toggleSwitchButton"
          onClick={onToggleSwitch}
          className={classNames(
            `w-6 h-3 rounded-full peer
              peer-checked:after:translate-x-full 
              after:content-[''] after:absolute after:top-0.25 after:left-[2px] peer-checked:after:left-[6px]
              after:bg-primary-white after:rounded-full after:h-2.5 after:w-2.5 after:transition-all duration-300 ease-out
              `,
            {
              'cursor-not-allowed bg-ui-grey-light':
                isToggleLocked || isLoading,
              'peer-checked:bg-primary-oxford-blue bg-ui-grey-medium':
                !isToggleLocked && !isLoading
            }
          )}
        />
        {isLoading && (
          <span
            role="presentation"
            className="button__loading cursor-not-allowed"
            data-testid="buttonLoadingSpinner"
          >
            <Spinner />
          </span>
        )}
      </label>
    </div>
  </div>
)
