import type { Metric } from '@/app/types'
import { metricsTable } from '@/models/Schema'

import { db } from '../DB'

const getAllMetrics = async (): Promise<Metric[]> => {
  const data = await db.select().from(metricsTable).all()
  return data
}

export default getAllMetrics
