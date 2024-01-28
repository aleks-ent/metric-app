import { makeBadge } from 'badge-maker'
import { NextResponse } from 'next/server'

import logger from '@/libs/logger'
import { fetchAndSaveMetric } from '@/libs/metric/utils/fetchAndSaveMetric'
import { getIndicator } from '@/libs/metric/utils/getIndicator'

export const GET = async (request: Request) => {
  const { pathname } = new URL(request.url)
  const splitPathname = pathname
    .split('/')
    .filter(Boolean)
    .filter((item) => item !== 'badge.svg')
  if (splitPathname.length !== 4) {
    return NextResponse.json(
      { status: 'failure', message: 'Invalid parameters' },
      { status: 403 },
    )
  }

  const [unfilteredOwner, unfilteredRepo] = splitPathname.slice(-2)

  if (!unfilteredOwner || !unfilteredRepo) {
    return NextResponse.json(
      { status: 'failure', message: 'Invalid parameters' },
      { status: 403 },
    )
  }

  const owner = unfilteredOwner.replace(/[^a-zA-Z0-9-_]/g, '')
  const repo = unfilteredRepo.replace(/[^a-zA-Z0-9-_]/g, '')

  try {
    const metric = await fetchAndSaveMetric(owner, repo)

    if (!metric) {
      throw new Error(`Empty metric for ${owner}/${repo}`)
    }

    const indicator = getIndicator(metric)
    const badgeSvg = makeBadge({
      label: 'Activity',
      message: indicator.textNode.toLowerCase(),
      color: indicator.color,
    })

    const response = new NextResponse(badgeSvg)
    response.headers.set('content-type', 'image/svg+xml')
    return response
  } catch (e) {
    logger.error('Error occured', e)
    return NextResponse.json(
      { status: 'failure', message: 'Error occured' },
      { status: 403 },
    )
  }
}
