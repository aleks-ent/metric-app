import { and, eq } from 'drizzle-orm'

import type { Metric } from '@/app/types'
import { metricsTable } from '@/models/Schema'

import { db } from '../DB'

const getMetric = async (
  owner: string,
  repo: string,
): Promise<Metric | undefined> => {
  const data = await db
    .select()
    .from(metricsTable)
    .where(and(eq(metricsTable.owner, owner), eq(metricsTable.repo, repo)))
    .all()
  return data.length === 1 ? data[0] : undefined
}

export default getMetric
