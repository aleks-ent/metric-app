import { isWithinInterval } from 'date-fns'

import type { Quarter } from '@/app/types'

import calculateAverage from './calculateAverage'
import gitGitHubClient from './gitGitHubClient'

const getAdditionsAndDeletionsStats = async (
  owner: string,
  repo: string,
  startQuarter: Quarter,
  endQuarter: Quarter,
) => {
  const data = await gitGitHubClient.request(
    `GET /repos/${owner}/${repo}/stats/code_frequency`,
  )

  const numberOfAdditionsInStartQuarter = []
  const numberOfDeletionsInStartQuarter = []

  const numberOfAdditionsInEndQuarter = []
  const numberOfDeletionsInEndQuarter = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
    const changeDate = new Date(data[i][0] * 1000)

    if (isWithinInterval(changeDate, startQuarter)) {
      numberOfAdditionsInStartQuarter.push(data[i][1])
      numberOfDeletionsInStartQuarter.push(data[i][2])
    }

    if (isWithinInterval(changeDate, endQuarter)) {
      numberOfAdditionsInEndQuarter.push(data[i][1])
      numberOfDeletionsInEndQuarter.push(data[i][2])
    }
  }

  return {
    additions: {
      start: calculateAverage(numberOfAdditionsInStartQuarter),
      end: calculateAverage(numberOfAdditionsInEndQuarter),
    },
    deletions: {
      start: calculateAverage(numberOfDeletionsInStartQuarter),
      end: calculateAverage(numberOfDeletionsInEndQuarter),
    },
  }
}

export default getAdditionsAndDeletionsStats
