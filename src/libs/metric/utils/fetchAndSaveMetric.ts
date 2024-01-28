import type { MetricOject } from '@/app/types'
import getMetricDb from '@/libs/db/getMetric'
import saveMetric from '@/libs/db/saveMetric'
import logger from '@/libs/logger'

import getMetric from '..'

export const fetchAndSaveMetric = async (owner: string, repo: string) => {
  const existingRecord = await getMetricDb(owner, repo)

  let metric: MetricOject | null = null
  if (existingRecord) {
    logger.info('Cache hit', owner, repo)

    metric = JSON.parse(existingRecord.metrics)
  } else {
    logger.info('Cache miss', owner, repo)
    metric = await getMetric(owner, repo)
    await saveMetric(owner, repo, metric)
  }

  return metric
}
