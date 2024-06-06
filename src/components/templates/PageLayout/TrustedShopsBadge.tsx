import getConfig from 'next/config'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export const TrustedShopsBadge = () => {
  const { locale } = useRouter()
  const { publicRuntimeConfig } = getConfig()
  const trustedShopsId = publicRuntimeConfig.trustedShopsIds[locale || '']
  const isFooterTrustedShopsEnabled = useFeatureFlag(
    FeatureFlag.FOOTER_TRUSTED_SHOPS
  )
  const { t } = useTranslation()

  return isFooterTrustedShopsEnabled ? (
    <Script strategy="lazyOnload" id="trusted-shops-script">
      {`
        (function () {
          window.initTrustedShopsBadge = () => {
            // Observing badge initialisation to intercept data and adjust styles
            const adjustBadgeStyles = (mutation) => {
              const badgeContent = mutation?.target?.querySelector('[id^=minimized-trustbadge]');
              badgeContent?.setAttribute('style', 'border-radius:4px !important; height: 39px !important; width: 68px !important');
              badgeContent?.childNodes[1]?.setAttribute('style', 'margin: 0 !important');
              const threeDotsMenu = mutation?.target?.querySelector('[id^=trustbadge-minimized-menu-button]');
              threeDotsMenu?.setAttribute('style', 'z-index: 100 !important');
              const eLogoContainer = mutation?.target?.querySelector('[id^=minimized-trustbadge] > div > div');
              eLogoContainer?.setAttribute('style', 'width: initial !important');
            }
            const interceptRatings = (mutation) => {
              const badgeContentParagraphs = mutation?.target?.querySelectorAll('p');
              const rating = badgeContentParagraphs[badgeContentParagraphs.length - 2]?.innerText;
              if (!rating) return;
              const ratingScore = rating?.split('/')[0];
              const trustedShopsRating = document.getElementById('trusted-shops-rating');
              trustedShopsRating.innerHTML = '${t(
                'footer.trusted-shop.customer-reviews'
              )} <span class="text-primary-caribbean-green">' + ratingScore + '</span> / 5';
            }

            const trustedShopsContainer = document.getElementById('trusted-shops');
            if (!trustedShopsContainer || trustedShopsContainer.innerHTML !== '') return;
            if (trustedShopsContainer.innerHTML !== '') trustedShopsContainer.innerHTML = '';

            const trustedShopsScripts = document.querySelectorAll('[src*=trustedshops]').length > 0;
            const isInitialized = trustedShopsScripts.length > 0;
            if (isInitialized) {
              for (let i = 0; i < trustedShopsScripts.length; i++) {
                trustedShopsScripts[i].remove();
              }
            };

            const observeCallback = function(mutationsList, observer) {
              for(const mutation of mutationsList) {
                if (mutation?.target?.id.startsWith('trustbadge-custom-')) {
                  adjustBadgeStyles(mutation);
                  interceptRatings(mutation);
                }
              }
            };

            const observer = new MutationObserver(observeCallback);
            observer.observe(trustedShopsContainer, { childList: true, subtree: true });

            const _tsid = '${trustedShopsId}';
            _tsConfig = {
              'yOffset': '0', /* offset from page bottom */
              'variant': 'custom_reviews',
              'customElementId': 'trusted-shops',
              'trustcardDirection': '',
              'customBadgeWidth': '68',
              'customBadgeHeight': '48',
              'disableResponsive': 'true',
              'disableTrustbadge': 'false'
            };
            const _ts = document.createElement('script');
            _ts.type = 'text/javascript';
            _ts.charset = 'utf-8';
            _ts.async = true;
            _ts.src = '//widgets.trustedshops.com/js/' + _tsid + '.js';
            const __tsWidget = document.getElementById('trusted-shops-script');
            __tsWidget.parentNode.insertBefore(_ts, __tsWidget);
          };

          typeof window !== 'undefined' && typeof window?.initTrustedShopsBadge === 'function' && window.initTrustedShopsBadge();
        })();
      `}
    </Script>
  ) : null
}
