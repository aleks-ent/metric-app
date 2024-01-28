/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
/* eslint-disable no-promise-executor-return */
import { Octokit } from '@octokit/rest'

import logger from '@/libs/logger'

const gitHubClient = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const TIMEOUT_MS = 500
const fetchUrlWithRetry = async (url: string) => {
  let response
  while (true) {
    try {
      response = await gitHubClient.request(url)
      const { status } = response

      if (status === 202) {
        logger.info(`Url ${url} was fetched, retrying due to status ${status}`)
        await new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS))
      } else {
        logger.info(`Url ${url} was fetched, status ${status}`)
        break
      }
    } catch (error) {
      logger.error('Unable to fetch url', url, error)
      break
    }
  }

  return response
}

const client = {
  request: async (resourceLocation: string) => {
    let result = null
    try {
      const response = await fetchUrlWithRetry(resourceLocation)

      if (!response) {
        throw new Error('Request to GitHub failed')
      }

      if (response.data) {
        result = response.data
      } else {
        logger.error('Unable to fetch data from GitHub, response', response)
        throw new Error('Request to GitHub failed')
      }
    } catch (error) {
      logger.error('Unable to fetch data from GitHub, error', error)
      throw new Error('Request to GitHub failed')
    }

    return result
  },
}

export default client
