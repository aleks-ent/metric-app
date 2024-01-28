import gitGitHubClient from './gitGitHubClient'

const getRepoInfo = async (owner: string, repo: string) => {
  const data = await gitGitHubClient.request(`GET /repos/${owner}/${repo}`)

  return {
    createdAt: new Date(data.created_at),
  }
}

export default getRepoInfo
