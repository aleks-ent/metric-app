import type { MetricOject } from '@/app/types'

import getAdditionsAndDeletionsStats from './utils/getAdditionsAndDeletionsStats'
import getCommitStats from './utils/getCommitStats'
import getContributors from './utils/getContributors'
import getQuarters from './utils/getQuarters'
import getRating from './utils/getRating'
import getRepoInfo from './utils/getRepoInfo'

const getMetric = async (owner: string, repo: string): Promise<MetricOject> => {
  const { createdAt } = await getRepoInfo(owner, repo)

  const { startQuarter, endQuarter } = getQuarters(createdAt)

  const additionsAndDeletionsStats = await getAdditionsAndDeletionsStats(
    owner,
    repo,
    startQuarter,
    endQuarter,
  )
  const additionsAndDeletionsStatsRating = getRating(
    additionsAndDeletionsStats.additions.start,
    additionsAndDeletionsStats.additions.end,
  )

  const commitsStats = await getCommitStats(
    owner,
    repo,
    startQuarter,
    endQuarter,
  )

  const contirbutors = await getContributors(owner, repo)

  const commitsStatsRating = getRating(commitsStats.start, commitsStats.end)
  return {
    comparedTimeRanges: {
      beginning: {
        start: startQuarter.start.toISOString(),
        end: startQuarter.end.toISOString(),
      },
      end: {
        start: endQuarter.start.toISOString(),
        end: endQuarter.end.toISOString(),
      },
    },
    additionsAndDeletionsStats: {
      data: additionsAndDeletionsStats,
      rating: additionsAndDeletionsStatsRating,
    },
    commitsStats: {
      data: commitsStats,
      rating: commitsStatsRating,
    },
    contirbutors,
  }
}

export default getMetric
