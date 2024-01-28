import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import ActivityIndicator from '@/components/ActivityIndicator'
import Contributors from '@/components/Contributors'
import Summary from '@/components/Summary'
import getAllMetrics from '@/libs/db/getAllMetrics'
import getMetric from '@/libs/db/getMetric'
import { Main } from '@/templates/Main'

type MetricDetailProp = {
  params: { owner: string; repo: string }
}

export async function generateStaticParams() {
  const data = await getAllMetrics()
  return data.map(({ owner, repo }) => ({ owner, repo }))
}

export function generateMetadata({
  params: { owner, repo },
}: MetricDetailProp): Metadata {
  return {
    title: `Activity of ${owner} / ${repo} repository`,
    description: `Shows last year of contribution activity of ${owner} / ${repo}. List of top 5 contributors and description of the repository are available.`,
    keywords: `${owner}/${repo}, contribution activity, github, repository, metrics`,
    alternates: {
      canonical: `https://isgitprojectactive.info/metric/${owner}/${repo}`,
    },
  }
}

const MetricPage = async ({ params }: MetricDetailProp) => {
  const { owner, repo } = params
  const metric = await getMetric(owner, repo)

  if (!metric) {
    redirect('/not-found')
  }

  return (
    <Main>
      <div className="pt-4">
        <h1 className="text-3xl">
          Activity of{' '}
          <a
            title={`Go to ${metric.owner}/${metric.repo} repository, will open in new window`}
            href={`https://github.com/${metric.owner}/${metric.repo}`}
            target="blank"
          >
            {metric.owner}/{metric.repo}
          </a>{' '}
          repository
        </h1>
      </div>
      <div className="pt-4">
        <ActivityIndicator metric={metric} />
        <Contributors metric={metric} />
        {metric.summary ? <Summary summary={metric.summary} /> : null}
      </div>
    </Main>
  )
}

export const dynamicParams = true

export default MetricPage
