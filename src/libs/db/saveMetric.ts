import { metricsTable } from '@/models/Schema'
import { MetricsSchema } from '@/validations/MetricsValidation'

import { db } from '../DB'

const saveMetric = async (owner: string, repo: string, metrics: any) => {
  const body = MetricsSchema.parse({
    owner,
    repo,
    created_at: new Date().toISOString(),
    metrics: JSON.stringify(metrics),
  })

  const record = await db.insert(metricsTable).values(body).returning()
  return record[0]?.id
}

export default saveMetric
