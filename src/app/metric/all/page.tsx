import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import getAllMetrics from '@/libs/db/getAllMetrics'
import { Main } from '@/templates/Main'

export function generateMetadata(): Metadata {
  return {
    title: `All analyzed projects`,
    description: `List of all analyzed projects at isgitprojectactive. Click on project link to get activity report, see contributors, and brief description of repository.`,
    keywords: `activity, project, repository, metrics, contirbutors`,
    alternates: {
      canonical: `https://isgitprojectactive.info/metric/all`,
    },
  }
}

type ListItemProps = {
  owner: string
  repo: string
}

const ListItem = ({ owner, repo }: ListItemProps) => {
  return (
    <li className="list-disc pl-2">
      <Link href={`/metric/${owner}/${repo}`}>
        {owner}/{repo}
      </Link>
    </li>
  )
}

const AllMetricPage = async () => {
  const data = await getAllMetrics()

  if (!data) {
    redirect('/not-found')
  }

  return (
    <Main>
      <div className="pt-4">
        <h1 className="text-3xl">All analyzed projects</h1>
      </div>
      <div className="pt-4">
        <p>List might be incomplete, as it is updated periodically</p>
      </div>
      <div className="pt-4">
        <ul>
          {data
            .sort((metricA, metricB) =>
              (metricA.owner + metricA.repo).localeCompare(
                metricB.owner + metricB.repo,
              ),
            )
            .map((metric) => {
              return (
                <ListItem
                  key={metric.owner + metric.repo}
                  owner={metric.owner}
                  repo={metric.repo}
                />
              )
            })}
        </ul>
      </div>
    </Main>
  )
}

export default AllMetricPage
