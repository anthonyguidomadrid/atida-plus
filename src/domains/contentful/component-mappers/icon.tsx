import { ComponentType, SVGProps } from 'react'
import dynamic from 'next/dynamic'
import { Icon } from '../normalizers'

const getComponentFromImport = (promise: Promise<typeof import('*.svg')>) =>
  promise.then(({ ReactComponent }) => ReactComponent)

export const mapIconReferenceToIconComponent = (
  icon?: Icon
): ComponentType<SVGProps<SVGElement>> => {
  switch (icon) {
    /* istanbul ignore next */
    case 'Checkmark':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Checkmark.svg')
        )
      )
    /* istanbul ignore next */
    case 'Blog':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Blog.svg')
        )
      )
    /* istanbul ignore next */
    case 'DeliveryCorreos':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/delivery-providers/Correos.svg')
        )
      )
    /* istanbul ignore next */
    case 'DeliveryCorreosExpress':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/delivery-providers/CorreosExpress.svg')
        )
      )
    /* istanbul ignore next */
    case 'DeliveryDhl':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/delivery-providers/DHL.svg')
        )
      )
    /* istanbul ignore next */
    case 'DeliveryEnvialia':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/delivery-providers/Envialia.svg')
        )
      )
    /* istanbul ignore next */
    case 'DeliveryGls':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/delivery-providers/GLS.svg')
        )
      )
    /* istanbul ignore next */
    case 'DeliveryHermes':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/delivery-providers/Hermes.svg')
        )
      )
    /* istanbul ignore next */
    case 'DeliverySeur':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/delivery-providers/Seur.svg')
        )
      )
    /* istanbul ignore next */
    case 'Faq':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Faq.svg')
        )
      )
    /* istanbul ignore next */
    case 'Label':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Label.svg')
        )
      )
    /* istanbul ignore next */
    case 'Mail24':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Mail.svg')
        )
      )
    /* istanbul ignore next */
    case 'NavAdvice24':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/NavAdvice.svg')
        )
      )
    /* istanbul ignore next */
    case 'Parcel24':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Parcel.svg')
        )
      )
    /* istanbul ignore next */
    case 'Pin24':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Pin.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentAmazon':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/Amazon.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentIDeal':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/iDEAL.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentMastercard':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/Mastercard.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentPaypal':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/Paypal.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentSepa':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/Sepa.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentSofort':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/Sofort.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentVisa':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/Visa.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentMultibanco':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/Multibanco.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentMaestro':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/Maestro.svg')
        )
      )
    /* istanbul ignore next */
    case 'PaymentMBWay':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/MBWay.svg')
        )
      )

    /* istanbul ignore next */
    case 'PaymentBizum':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/payment-providers/Bizum.svg')
        )
      )

    /* istanbul ignore next */
    case 'Percentage':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Percentage.svg')
        )
      )
    /* istanbul ignore next */
    case 'QualityEhi':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/quality-providers/EHI.svg')
        )
      )
    /* istanbul ignore next */
    case 'QualityETrustedShops':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/quality-providers/eTrustedShops.svg')
        )
      )
    /* istanbul ignore next */
    case 'QualityGetestetDe':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/quality-providers/GetestetDe.svg')
        )
      )
    /* istanbul ignore next */
    case 'QualitySsl':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/quality-providers/SSL.svg')
        )
      )
    /* istanbul ignore next */
    case 'Return24':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Return.svg')
        )
      )
    /* istanbul ignore next */
    case 'Scan24':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Scan.svg')
        )
      )
    /* istanbul ignore next */
    case 'Shop':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Shop.svg')
        )
      )
    /* istanbul ignore next */
    case 'Telephone24':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Telephone.svg')
        )
      )
    /* istanbul ignore next */
    case 'GridView':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/GridView.svg')
        )
      )
    /* istanbul ignore next */
    case 'ListView':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/ListView.svg')
        )
      )
    /* istanbul ignore next */
    case 'PlusLarge':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/PlusLarge.svg')
        )
      )
    /* istanbul ignore next */
    case 'Box':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Box.svg')
        )
      )
    /* istanbul ignore next */
    case 'Lock':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Lock.svg')
        )
      )
    /* istanbul ignore next */
    case 'FastDelivery':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/FastDelivery.svg')
        )
      )
    /* istanbul ignore next */
    case 'Gift':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/navigation-24px/Gift.svg')
        )
      )
    case 'Facebook':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/social/facebook.svg')
        )
      )
    case 'Instagram':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/social/instagram.svg')
        )
      )
    case 'Linkedin':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/social/linkedin.svg')
        )
      )
    case 'Pinterest':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/social/pinterest.svg')
        )
      )
    case 'TikTok':
      return dynamic(() =>
        getComponentFromImport(import('../../../assets/svg/social/tik_tok.svg'))
      )
    case 'Twitter':
      return dynamic(() =>
        getComponentFromImport(import('../../../assets/svg/social/twitter.svg'))
      )
    case 'YouTube':
      return dynamic(() =>
        getComponentFromImport(import('../../../assets/svg/social/youtube.svg'))
      )
    case 'WalletGreen':
      return dynamic(() =>
        getComponentFromImport(import('../../../assets/svg/WalletGreen.svg'))
      )
    case 'ClaimedRewardGreen':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/ClaimedRewardGreen.svg')
        )
      )
    case 'TagsGreen':
      return dynamic(() =>
        getComponentFromImport(import('../../../assets/svg/TagsGreen.svg'))
      )
    case 'CoinsBalanceGreen':
      return dynamic(() =>
        getComponentFromImport(
          import('../../../assets/svg/CoinsBalanceGreen.svg')
        )
      )
    case 'Coins':
      return dynamic(() =>
        getComponentFromImport(import('../../../assets/svg/Coins.svg'))
      )
    default:
      return function UnknownIcon() {
        return null
      }
  }
}
