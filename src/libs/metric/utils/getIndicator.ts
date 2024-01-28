import { METRICS_INDICATORS } from '@/app/config'
import type { Indicator, MetricOject } from '@/app/types'

export const getIndicator = (metricsObject: MetricOject): Indicator => {
  const overallRating = Math.round(
    (metricsObject.additionsAndDeletionsStats.rating +
      metricsObject.commitsStats.rating) /
      2,
  )

  const indicator = METRICS_INDICATORS[overallRating - 1]
  if (!indicator) {
    throw new Error('Invalid indicator')
  }

  return indicator
}
