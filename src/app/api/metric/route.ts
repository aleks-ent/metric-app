import { NextResponse } from 'next/server'

import logger from '@/libs/logger'
import { fetchAndSaveMetric } from '@/libs/metric/utils/fetchAndSaveMetric'

const extractRepoAndOwner = (
  repositoryLink: string,
): { owner: string; repo: string } | null => {
  // eslint-disable-next-line no-useless-escape
  const regex = /github\.com\/([^\/]+)\/([^\/]+)/i
  const match = repositoryLink.match(regex)

  if (match && match.length === 3) {
    const [, owner, repo] = match
    if (!owner || !repo) {
      logger.error('Unable to exract owner and repo from link', repositoryLink)
      return null
    }

    return { owner, repo }
  }

  logger.error('Unable to match link to regular expression', repositoryLink)
  return null
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)

  const repositoryLink = searchParams.get('repositoryLink')
  if (!repositoryLink) {
    return Response.json(
      { status: 'failure', message: 'Repository link was not provided' },
      { status: 403 },
    )
  }

  const repoAndOwner = extractRepoAndOwner(atob(repositoryLink))
  if (!repoAndOwner) {
    return Response.json(
      { status: 'failure', message: 'Not a valid repository' },
      { status: 403 },
    )
  }

  const { owner: unfilteredOwner, repo: unfilteredRepo } = repoAndOwner
  const owner = unfilteredOwner.replace(/[^a-zA-Z0-9-_.]/g, '')
  const repo = unfilteredRepo.replace(/[^a-zA-Z0-9-_.]/g, '')

  try {
    const metric = await fetchAndSaveMetric(owner, repo)

    if (!metric) {
      throw new Error(`Unable to get metric for ${owner}/${repo}`)
    }

    return NextResponse.json({
      status: 'success',
      id: `${owner}/${repo}`,
    })
  } catch (e) {
    logger.error('Error occured', e)
    return NextResponse.json(
      { status: 'failure', message: 'Error occured' },
      { status: 403 },
    )
  }
}
