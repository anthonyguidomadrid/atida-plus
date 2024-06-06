import classNames from 'classnames'
import {
  BaseSyntheticEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { parseHtml, AdditionalProps } from '~helpers'

export type ModalProps = {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  modalStyle?: string
  modalHiddenStyle?: string
  headerText?: string
  headerTextStyle?: string
  body?: string | string[] | JSX.Element | JSX.Element[]
  bodyStyle?: string
  bodyHtml?: string | string[]
  bodyHtmlOptions?: Partial<AdditionalProps>
  footer?: JSX.Element
}

export const useModalState = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>
] => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) {
      window?.addEventListener<'keydown'>(
        'keydown',
        ({ code }: KeyboardEvent) => {
          if (code === 'Escape') {
            setIsVisible(false)
          }
        },
        false
      )
    }
  }, [isVisible])

  return [isVisible, setIsVisible]
}

export const Modal: FunctionComponent<ModalProps> = ({
  isVisible,
  setIsVisible,
  modalStyle,
  modalHiddenStyle,
  headerText,
  headerTextStyle,
  body,
  bodyHtml,
  bodyHtmlOptions = {},
  bodyStyle,
  footer
}) => {
  const bodyArr = !Array.isArray(body) ? [body] : body
  const bodyHtmlArr = !Array.isArray(bodyHtml) ? [bodyHtml] : bodyHtml

  const onClose = ({ target }: BaseSyntheticEvent) => {
    if (
      target?.id.match(/modal-overlay|modal-close/i) ||
      target?.ownerSVGElement?.id.match(/modal-close/i)
    ) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }

  return (
    <div
      data-testid="modalComponent"
      className={classNames(
        'modal fixed w-full h-full top-0 left-0 flex z-40',
        {
          [`opacity-0 pointer-events-none ${modalHiddenStyle}`]: !isVisible,
          'modal-active bg-overlay': isVisible
        }
      )}
    >
      <div
        data-testid="modalComponentOverlay"
        className="modal-overlay bg-overlay absolute top-0 left-0 w-full h-full z-40"
        id="modal-overlay"
        onClickCapture={onClose}
      />

      <div
        data-testid="modalComponentContainer"
        className={classNames(
          'modal-container bg-primary-white py-1 z-50 overflow-y-auto ',
          'w-full h-full',
          'sm:w-1/2 sm:h-1/2 sm:m-auto',
          modalStyle
        )}
      >
        <div data-testid="modalComponentContent" className="modal-content">
          {/* Header */}
          <div
            data-testid="modalComponentHeader"
            className={classNames('flex px-2', {
              'border-b-2 border-overlay mb-3': !!headerText
            })}
          >
            <p
              data-testid="modalComponentHeaderText"
              className={classNames(
                'flex-1 text-center',
                {
                  'mt-1 mb-2': !!headerText,
                  hidden: !headerText
                },
                headerTextStyle
              )}
            >
              {headerText || ''}
            </p>
            <span
              data-testid="modalComponentHeaderClose"
              className="modal-close z-50 relative mr-0 mt-1"
            >
              <Cross
                className="icon-24 cursor-pointer"
                id="modal-close"
                onClickCapture={onClose}
              />
            </span>
          </div>

          {/* Body */}
          {(bodyArr.length > 0 || bodyHtmlArr.length > 0) && (
            <div
              data-testid="modalComponentBody"
              className={classNames('px-2', bodyStyle)}
            >
              {bodyArr.length > 0 && <div>{bodyArr}</div>}

              {bodyHtmlArr.length > 0 && (
                <div>
                  {bodyHtmlArr.map(text => parseHtml(text, bodyHtmlOptions))}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          {footer}
        </div>
      </div>
    </div>
  )
}
