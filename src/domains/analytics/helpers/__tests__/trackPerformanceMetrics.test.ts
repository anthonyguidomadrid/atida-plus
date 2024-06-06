import { fireEvent } from '@testing-library/react'
import Analytics from 'analytics-node'
import { NextWebVitalsMetric } from 'next/app'
import { IS_SEGMENT_INITIALISED } from '~config/constants/events'
import * as trackPerformanceMetrics from '../trackPerformanceMetrics'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

const mockLCP: NextWebVitalsMetric = {
  id: 'test',
  name: 'LCP',
  startTime: 0,
  value: 0,
  label: 'web-vital'
}

const mockFID: NextWebVitalsMetric = {
  id: 'test',
  name: 'FID',
  startTime: 0,
  value: 0,
  label: 'web-vital'
}

const mockCLS: NextWebVitalsMetric = {
  id: 'test',
  name: 'CLS',
  startTime: 0,
  value: 0,
  label: 'web-vital'
}

const mockTTFB: NextWebVitalsMetric = {
  id: 'test',
  name: 'TTFB',
  startTime: 0,
  value: 0,
  label: 'web-vital'
}

const mockFCP: NextWebVitalsMetric = {
  id: 'test',
  name: 'FCP',
  startTime: 0,
  value: 0,
  label: 'web-vital'
}

const mockCustomMetric: NextWebVitalsMetric = {
  id: 'other',
  name: 'Next.js-hydration',
  startTime: 0,
  value: 100,
  label: 'custom'
}
describe('segment performance tracking', () => {
  const setup = (isLoaded = true) => {
    if (isLoaded) {
      global.analytics = (new Analytics(
        'segmentTestKey'
      ) as unknown) as SegmentAnalytics.AnalyticsJS
    }
  }
  it('Does not attempt to send non web-vitals to Segment', () => {
    jest.useFakeTimers()
    setup(true)
    trackPerformanceMetrics.trackPerformanceMetric(mockCustomMetric)
    trackPerformanceMetrics.trackPerformanceMetric(mockCustomMetric)
    trackPerformanceMetrics.trackPerformanceMetric(mockCustomMetric)
    jest.advanceTimersByTime(trackPerformanceMetrics.WAIT_FOR_METRICS + 1)
    expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(0)
  })

  it('Does not attempt to immediately send incomplete metrics to Segment', () => {
    setup(true)
    trackPerformanceMetrics.trackPerformanceMetric(mockCLS)
    trackPerformanceMetrics.trackPerformanceMetric(mockLCP)

    expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(0)
  })

  it('Does attempt to send incomplete metrics to Segment after the established time', () => {
    jest.useFakeTimers()
    setup(true)
    trackPerformanceMetrics.trackPerformanceMetric(mockCLS)
    trackPerformanceMetrics.trackPerformanceMetric(mockLCP)
    jest.advanceTimersByTime(trackPerformanceMetrics.WAIT_FOR_METRICS + 1)

    expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
  })

  it('Sends complete metrics immediately to Segment', () => {
    setup(true)
    trackPerformanceMetrics.trackPerformanceMetric(mockCLS)
    trackPerformanceMetrics.trackPerformanceMetric(mockLCP)
    trackPerformanceMetrics.trackPerformanceMetric(mockFID)
    trackPerformanceMetrics.trackPerformanceMetric(mockFCP)
    trackPerformanceMetrics.trackPerformanceMetric(mockTTFB)

    expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
  })

  it('waits for Segment to be initialised to send them data', () => {
    setup(false)
    trackPerformanceMetrics.sendWebVitalsToSegment()
    expect(mockAnalytics.mock.instances[0]).toBeUndefined()

    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS

    const isSegmentInitialised = new Event(IS_SEGMENT_INITIALISED)
    fireEvent(window, isSegmentInitialised)

    trackPerformanceMetrics.sendWebVitalsToSegment()
    expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
  })

  test('If an incomplete set of metrics is received, it will wait before sending to Segment', () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')
    setup(true)
    trackPerformanceMetrics.trackPerformanceMetric(mockCLS)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      trackPerformanceMetrics.WAIT_FOR_METRICS
    )
  })
})
