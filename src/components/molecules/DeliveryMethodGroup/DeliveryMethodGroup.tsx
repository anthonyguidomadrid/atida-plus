import {
  ChangeEvent,
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  FunctionComponent,
  isValidElement,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from 'react'
import classNames from 'classnames'
import { ShipmentMethods } from '~domains/checkout/types'
import { triggerReportShippingMethodSelected } from '~domains/analytics'
import { useDispatch } from 'react-redux'

export type DeliveryMethodGroupProps = ComponentPropsWithoutRef<'fieldset'> & {
  initialDeliveryMethod?: string
  shipmentMethods?: ShipmentMethods[]
  onDeliveryMethodChange?: (value?: string) => void
  locale?: string
}

export const DeliveryMethodGroup: FunctionComponent<DeliveryMethodGroupProps> = ({
  initialDeliveryMethod,
  shipmentMethods,
  onDeliveryMethodChange,
  children,
  locale,
  ...props
}) => {
  const dispatch = useDispatch()

  const defaultSelectedDeliveryMethod = useMemo(() => {
    if (shipmentMethods?.length === 1) {
      return shipmentMethods?.[0].id
    }
    if (shipmentMethods && locale === 'es-es' && shipmentMethods?.length > 1) {
      const standardSpainShipmentMethod = shipmentMethods?.find(
        shipmentMethod =>
          shipmentMethod.attributes.name === 'spain-standard-delivery'
      )
      return standardSpainShipmentMethod?.id
    }
    return ''
  }, [locale, shipmentMethods])
  const [deliveryMethod, setDeliveryMethod] = useState<string | undefined>(
    initialDeliveryMethod
  )

  useEffect(() => {
    if (!initialDeliveryMethod) {
      setDeliveryMethod(defaultSelectedDeliveryMethod)
    }
  }, [defaultSelectedDeliveryMethod, initialDeliveryMethod])

  useEffect(() => {
    if (deliveryMethod !== initialDeliveryMethod && deliveryMethod) {
      onDeliveryMethodChange?.(deliveryMethod)
    }
  }, [
    deliveryMethod,
    initialDeliveryMethod,
    onDeliveryMethodChange,
    shipmentMethods
  ])

  useEffect(() => {
    if (deliveryMethod) {
      dispatch(
        triggerReportShippingMethodSelected({ shipping_method: deliveryMethod })
      )
    }
  }, [dispatch, deliveryMethod])

  return (
    <fieldset data-testid="deliveryMethods" {...props}>
      {Children.map(children, (child: ReactNode, idx: number) =>
        isValidElement(child)
          ? cloneElement(child, {
              isChecked:
                shipmentMethods?.length === 1
                  ? true
                  : deliveryMethod === child.props.inputValue,
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                setDeliveryMethod(e.currentTarget.value),
              ...child.props,
              className: classNames(
                { 'mb-2': idx < Children.count(children) - 1 },
                child.props.className
              )
            })
          : child
      )}
    </fieldset>
  )
}
