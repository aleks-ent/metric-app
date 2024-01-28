import { NextResponse } from 'next/server'

import getAllMetrics from '@/libs/db/getAllMetrics'
import updateMetric from '@/libs/db/updateMetric'
import logger from '@/libs/logger'
import getMetric from '@/libs/metric'

const SECRET_KEY = 'acj2820sjdk9sm'

// http://localhost:3000/api/metric/update?key=acj2820sjdk9sm
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)

  const key = searchParams.get('key')
  if (!key || key !== SECRET_KEY) {
    return Response.json(
      { status: 'failure', message: 'Not authorised' },
      { status: 401 },
    )
  }

  try {
    const allMetrics = await getAllMetrics()

    logger.info(`Updating ${allMetrics.length} metrics`)
    for (let i = 0; i < allMetrics.length; i += 1) {
      const metric = allMetrics[i]
      if (metric) {
        logger.info(`Updating ${metric.owner}/${metric.repo}`)
        // eslint-disable-next-line no-await-in-loop
        const updatedMetric = await getMetric(metric.owner, metric.repo)
        // eslint-disable-next-line no-await-in-loop
        await updateMetric(metric.owner, metric.repo, updatedMetric)
      }
    }

    logger.info(`Update is completed`)

    return NextResponse.json({
      status: 'success',
      data: allMetrics.length,
    })
  } catch (e) {
    logger.error('Error occured', e)
    return NextResponse.json(
      { status: 'failure', message: 'Error occured' },
      { status: 403 },
    )
  }
}
