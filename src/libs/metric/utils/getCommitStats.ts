import { isWithinInterval } from 'date-fns'

import type { Quarter } from '@/app/types'

import calculateAverage from './calculateAverage'
import gitGitHubClient from './gitGitHubClient'

const getCommitStats = async (
  owner: string,
  repo: string,
  startQuarter: Quarter,
  endQuarter: Quarter,
) => {
  const data = await gitGitHubClient.request(
    `GET /repos/${owner}/${repo}/stats/commit_activity`,
  )

  const startQuarterCommitsPerWeek = []
  const endQuarterCommitsPerWeek = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
    const commitWeek = new Date(data[i].week * 1000)

    if (isWithinInterval(commitWeek, startQuarter)) {
      startQuarterCommitsPerWeek.push(data[i].total)
    }

    if (isWithinInterval(commitWeek, endQuarter)) {
      endQuarterCommitsPerWeek.push(data[i].total)
    }
  }

  return {
    start: calculateAverage(startQuarterCommitsPerWeek),
    end: calculateAverage(endQuarterCommitsPerWeek),
  }
}

export default getCommitStats
