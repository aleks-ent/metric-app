import { and, eq } from 'drizzle-orm'

import { metricsTable } from '@/models/Schema'

import { db } from '../DB'

const updateMetric = async (owner: string, repo: string, metrics: any) => {
  await db
    .update(metricsTable)
    .set({ metrics: JSON.stringify(metrics) })
    .where(and(eq(metricsTable.owner, owner), eq(metricsTable.repo, repo)))
}

export default updateMetric
