import { FunctionComponent, useState } from 'react'
import Script from 'next/script'
import getConfig from 'next/config'
import Head from 'next/head'
import { MONDIAL_RELAY_URLS } from '~config/constants/mondial-relay-urls'

type MondialRelayProps = {
  zipCode: string
}

export const MondialRelayScript: FunctionComponent<MondialRelayProps> = ({
  zipCode
}) => {
  const { publicRuntimeConfig } = getConfig()

  const jqueryScript = document.querySelector(
    `script[src='${MONDIAL_RELAY_URLS.JQUERRY_URL}']`
  )
  const leafletScript = document.querySelector(
    `script[src='${MONDIAL_RELAY_URLS.LEAFLET_URL}']`
  )
  const parcelShopPickerScript = document.querySelector(
    `script[src='${MONDIAL_RELAY_URLS.PARCEL_SHOP_PICKER_URL}']`
  )
  const googleMapsScript = document.querySelector(
    `script[src='${MONDIAL_RELAY_URLS.GOOGLE_MAPS_URL}']`
  )
  const [areScriptsLoaded, setAreScriptsLoaded] = useState({
    jquery: !!jqueryScript,
    leaflet: !!leafletScript,
    parcelShopPicker: !!parcelShopPickerScript,
    googleMaps: !!googleMapsScript
  })

  const snippet = `$(document).ready(function () {
        $("#Zone_Widget").MR_ParcelShopPicker({
                Target: "#ParcelShopCode",
                Theme: "mondialrelay",
                Brand: '${publicRuntimeConfig.mondialRelay?.brand}',
                Country: "ES",
                PostCode: '${zipCode}',
                EnableGeolocatedSearch: true,
                Responsive: true,
                DisplayMapInfo: true,
                EnableGmap: true,
                AutoSelect: true,
                OnParcelShopSelected:
                   (e) => {
                    const event = new CustomEvent('selectMondialRelayAddress', { detail: e });
                    document.dispatchEvent(event);
                  }
            });
        });`

  const loadScript = (
    scriptName: 'jquery' | 'leaflet' | 'parcelShopPicker' | 'googleMaps',
    state: boolean
  ) => () => {
    setAreScriptsLoaded(prev => ({
      ...prev,
      [scriptName]: state
    }))
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
        />
      </Head>
      {!areScriptsLoaded.jquery && (
        <Script
          data-testid="mondial-relay-jquery-script"
          onLoad={loadScript('jquery', true)}
          onError={loadScript('jquery', false)}
          src={MONDIAL_RELAY_URLS.JQUERRY_URL}
        ></Script>
      )}
      {!areScriptsLoaded.leaflet && areScriptsLoaded.jquery && (
        <Script
          data-testid="mondial-relay-leaflet-script"
          onLoad={loadScript('leaflet', true)}
          onError={loadScript('leaflet', false)}
          src={MONDIAL_RELAY_URLS.LEAFLET_URL}
        ></Script>
      )}
      {!areScriptsLoaded.parcelShopPicker && areScriptsLoaded.jquery && (
        <Script
          data-testid="mondial-relay-parcel-shop-picker-script"
          onLoad={loadScript('parcelShopPicker', true)}
          onError={loadScript('parcelShopPicker', false)}
          src={MONDIAL_RELAY_URLS.PARCEL_SHOP_PICKER_URL}
        ></Script>
      )}
      {!areScriptsLoaded.googleMaps && areScriptsLoaded.jquery && (
        <Script
          data-testid="mondial-relay-google-maps-script"
          onLoad={loadScript('googleMaps', true)}
          onError={loadScript('googleMaps', false)}
          src={MONDIAL_RELAY_URLS.GOOGLE_MAPS_URL}
        ></Script>
      )}

      {!Object.values(areScriptsLoaded).some(element => !element) && (
        <Script
          data-testid="mondial-relay-snippet-script"
          type="text/javascript"
        >
          {snippet}
        </Script>
      )}
    </>
  )
}
