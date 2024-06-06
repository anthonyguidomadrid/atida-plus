import { NextWebVitalsMetric } from 'next/app'

import { IS_SEGMENT_INITIALISED } from '~config/constants/events'

type WebVitalMetrics = {
  [name: string]: number
}

//https://nextjs.org/docs/advanced-features/measuring-performance#web-vitals
const WEB_VITAL_LENGTH = 5
//We'll wait for 20s before sending the metrics to Segment
export const WAIT_FOR_METRICS = 20000
let webVitals: WebVitalMetrics = {}
let timer: number
let sent = false

const runTimer = () => {
  timer = window.setTimeout(() => {
    sendWebVitalsToSegment()
  }, WAIT_FOR_METRICS)
}

const clearTimer = () => {
  clearTimeout(timer)
}

const resetTimer = () => {
  clearTimer()
  runTimer()
}

const clearWebVitals = (): void => {
  sent = true
  webVitals = {}
  clearTimer()
}

const isWebVitalsComplete = (metrics: WebVitalMetrics): boolean =>
  Object.keys(metrics).length === WEB_VITAL_LENGTH

const onSegmentInitialised = (): void => {
  window.removeEventListener(IS_SEGMENT_INITIALISED, onSegmentInitialised)
  sendWebVitalsToSegment()
}

//If segment is loaded it'll send the webVitals,
//If not, it'll wait for it to be initiated
export const sendWebVitalsToSegment = (): void => {
  if (window.analytics) {
    window.analytics.track('Performance', webVitals, undefined, clearWebVitals)
  } else {
    window.addEventListener(IS_SEGMENT_INITIALISED, onSegmentInitialised)
  }
}

//Adds web vital metric to web vitals to be sent to segment
export const trackPerformanceMetric = (metric: NextWebVitalsMetric): void => {
  if (metric.label !== 'web-vital' || sent) return

  webVitals[metric.name.toLocaleLowerCase()] = metric.value
  resetTimer()

  if (isWebVitalsComplete(webVitals)) sendWebVitalsToSegment()
}
