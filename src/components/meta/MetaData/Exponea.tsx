import { FunctionComponent, useMemo } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { logger } from '~helpers'

import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'

export const Exponea: FunctionComponent = () => {
  const { locale } = useRouter()
  const { publicRuntimeConfig } = getConfig()

  const exponeaToken = publicRuntimeConfig.exponeaProjectToken[locale as string]

  if (!exponeaToken) {
    logger.warn(`Exponea project token not available for locale: ${locale}`)
  }
  const is3rdPartyScriptExponeaEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_EXPONEA
  )

  const is3rdPartyNextScriptEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT
  )

  const initSnippet = useMemo(
    () => `!function(e,n,t,i,o,r){function c(e){if("number"!=typeof e)return e;var n=new Date;return new Date(n.getTime()+1e3*e)}var a=4e3,s="xnpe_async_hide";function p(e){return e.reduce((function(e,n){return e[n]=function(){e._.push([n.toString(),arguments])},e}),{_:[]})}function m(e,n,t){var i=t.createElement(n);i.src=e;var o=t.getElementsByTagName(n)[0];return o.parentNode.insertBefore(i,o),i}function u(e){return"[object Date]"===Object.prototype.toString.call(e)}r.target=r.target||"https://api.exponea.com",r.file_path=r.file_path||r.target+"/js/exponea.min.js",o[n]=p(["anonymize","initialize","identify","update","track","trackLink","trackEnhancedEcommerce","getHtml","showHtml","showBanner","showWebLayer","ping","getAbTest","loadDependency","getRecommendation","reloadWebLayers"]),o[n].notifications=p(["isAvailable","isSubscribed","subscribe","unsubscribe"]),o[n]["snippetVersion"]="v2.3.0",function(e,n,t){e[n]["_"+t]={},e[n]["_"+t].nowFn=Date.now,e[n]["_"+t].snippetStartTime=e[n]["_"+t].nowFn()}(o,n,"performance"),function(e,n,t,i,o,r){e[o]={sdk:e[i],sdkObjectName:i,skipExperiments:!!t.new_experiments,sign:t.token+"/"+(r.exec(n.cookie)||["","new"])[1],path:t.target}}(o,e,r,n,i,RegExp("__exponea_etc__"+"=([\\\\w-]+)")),function(e,n,t){m(e.file_path,n,t)}(r,t,e),function(e,n,t,i,o,r,p){if(e.new_experiments){!0===e.new_experiments&&(e.new_experiments={});var f,l=e.new_experiments.hide_class||s,_=e.new_experiments.timeout||a,d=encodeURIComponent(r.location.href.split("#")[0]);e.cookies&&e.cookies.expires&&("number"==typeof e.cookies.expires||u(e.cookies.expires)?f=c(e.cookies.expires):e.cookies.expires.tracking&&("number"==typeof e.cookies.expires.tracking||u(e.cookies.expires.tracking))&&(f=c(e.cookies.expires.tracking))),f&&f<new Date&&(f=void 0);var x=e.target+"/webxp/"+n+"/"+r[t].sign+"/modifications.min.js?http-referer="+d+"&timeout="+_+"ms"+(f?"&cookie-expires="+Math.floor(f.getTime()/1e3):"");"sync"===e.new_experiments.mode&&r.localStorage.getItem("__exponea__sync_modifications__")?function(e,n,t,i,o){t[o][n]="<"+n+' src="'+e+'"></'+n+">",i.writeln(t[o][n]),i.writeln("<"+n+">!"+o+".init && document.writeln("+o+"."+n+'.replace("/'+n+'/", "/'+n+'-async/").replace("><", " async><"))</'+n+">")}(x,n,r,p,t):function(e,n,t,i,o,r,c,a){r.documentElement.classList.add(e);var s=m(t,i,r);function p(){o[a].init||m(t.replace("/"+i+"/","/"+i+"-async/"),i,r)}function u(){r.documentElement.classList.remove(e)}s.onload=p,s.onerror=p,o.setTimeout(u,n),o[c]._revealPage=u}(l,_,x,n,r,p,o,t)}}(r,t,i,0,n,o,e),function(e,n,t){e[n].start=function(i){i&&Object.keys(i).forEach((function(e){return t[e]=i[e]})),e[n].initialize(t)}}(o,n,r)}(document,"exponea","script","webxpClient",window,{
          track: { google_analytics: false }
        });`,
    []
  )

  const startSnippet = useMemo(
    () => `exponea.start({
    target: "https://exp.atida.com",
    token: "${exponeaToken}",
    utm_always: true,
    utm_params: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'],
    ping: {enabled: true, activity: true },
    cookies: { cross_subdomain: false },
    new_experiments: { mode: "sync", timeout: 4000 },
    spa_reloading: { visits: false, automatic_tracking: false }
     });`,
    [exponeaToken]
  )

  if (!is3rdPartyScriptExponeaEnabled || !exponeaToken) return null

  return (
    <>
      <Head>
        <>
          <link rel="preconnect" href="//exponea.com/" />
          <link rel="preconnect" href="//exp.atida.com/" />
        </>

        {!is3rdPartyNextScriptEnabled && (
          <>
            <script
              type="text/javascript"
              data-testid="exponea-init-script"
              dangerouslySetInnerHTML={{
                __html: initSnippet
              }}
            />
            <script
              type="text/javascript"
              data-testid="exponea-tracking-script"
              dangerouslySetInnerHTML={{
                __html: startSnippet
              }}
            />
          </>
        )}
      </Head>
      {is3rdPartyNextScriptEnabled && (
        <>
          <Script
            strategy="afterInteractive"
            id="exponea-init"
            type="text/javascript"
            data-testid="exponea-init-script"
          >
            {initSnippet}
          </Script>
          <Script
            strategy="afterInteractive"
            id="exponea-start"
            type="text/javascript"
            data-testid="exponea-tracking-script"
          >
            {startSnippet}
          </Script>
        </>
      )}
    </>
  )
}
