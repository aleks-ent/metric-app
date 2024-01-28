import type { Contributor } from '@/app/types'

import gitGitHubClient from './gitGitHubClient'

const getContributors = async (owner: string, repo: string) => {
  const data = await gitGitHubClient.request(
    `GET /repos/${owner}/${repo}/stats/contributors`,
  )

  const sortedContributors = data.sort(
    (itemA: Contributor, itemB: Contributor) => itemB.total - itemA.total,
  )
  const topNContributors =
    sortedContributors.length > 5 ? sortedContributors.slice(0, 5) : data
  const topNContributorsData = topNContributors.map((item: Contributor) => ({
    total: item.total,
    author: {
      login: item.author.login,
      avatar_url: item.author.avatar_url,
      html_url: item.author.html_url,
    },
  }))

  return topNContributorsData
}

export default getContributors
