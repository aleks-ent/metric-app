import { METRICS_INDICATORS } from '@/app/config'
import type { Indicator, MetricOject } from '@/app/types'

export const getIndicator = (metricsObject: MetricOject): Indicator => {
  let overallRating = 0
  if (metricsObject.additionsAndDeletionsStats) {
    overallRating = Math.round(
      (metricsObject.additionsAndDeletionsStats.rating +
        metricsObject.commitsStats.rating) /
        2,
    )
  } else {
    overallRating = metricsObject.commitsStats.rating
  }

  const indicator = METRICS_INDICATORS[overallRating - 1]
  if (!indicator) {
    throw new Error('Invalid indicator')
  }

  return indicator
}
