import { format } from 'date-fns'

import type { Metric, MetricOject } from '@/app/types'
import { getIndicator } from '@/libs/metric/utils/getIndicator'

import Badge from './Badge'

type ActivityIndicatorProp = {
  metric: Metric
}

const TIME_RANGE_FORMAT = 'd LLL, yyyy'

const getGrowthIndicator = (start: number, end: number) => {
  if (start < end) {
    return '📈'
  }
  return '📉'
}

const ActivityIndicator = ({ metric }: ActivityIndicatorProp) => {
  const metricsObject = JSON.parse(metric.metrics) as MetricOject

  const indicator = getIndicator(metricsObject)

  const commitsStart = Math.round(metricsObject.commitsStats.data.start)
  const commitsEnd = Math.round(metricsObject.commitsStats.data.end)

  let additionsStart = null
  let additionsEnd = null
  let deletionsStart = null
  let deletionsEnd = null

  if (metricsObject.additionsAndDeletionsStats) {
    additionsStart = Math.round(
      metricsObject.additionsAndDeletionsStats.data.additions.start,
    )
    additionsEnd = Math.round(
      metricsObject.additionsAndDeletionsStats.data.additions.end,
    )

    deletionsStart = Math.round(
      Math.abs(metricsObject.additionsAndDeletionsStats.data.deletions.start),
    )
    deletionsEnd = Math.abs(
      Math.round(metricsObject.additionsAndDeletionsStats.data.deletions.end),
    )
  }

  return (
    <div>
      <div className="text-center">
        <h3 className="text-5xl">
          {indicator?.textNode} {indicator?.emoji}
        </h3>
      </div>
      <div className="text-center">
        <h4 className="text-xl">{indicator?.explanation}</h4>
      </div>
      <div className="pt-6">
        <Badge owner={metric.owner} repo={metric.repo} />
      </div>
      <div className="pt-4">
        <h2 className="text-2xl">
          Why {metric.owner}/{metric.repo} is{' '}
          {indicator?.textNode.toLowerCase()}?
        </h2>
        <div className="pt-2">
          <p>
            The result is based on ratio of number of commits{' '}
            {metricsObject.additionsAndDeletionsStats
              ? 'and code additions '
              : ''}
            from initial and final time ranges.
          </p>
          <p>
            Initial time range – from{' '}
            {format(
              new Date(metricsObject.comparedTimeRanges.beginning.start),
              TIME_RANGE_FORMAT,
            )}{' '}
            to{' '}
            {format(
              new Date(metricsObject.comparedTimeRanges.beginning.end),
              TIME_RANGE_FORMAT,
            )}{' '}
          </p>
          <p>
            Final time range – from{' '}
            {format(
              new Date(metricsObject.comparedTimeRanges.end.start),
              TIME_RANGE_FORMAT,
            )}{' '}
            to{' '}
            {format(
              new Date(metricsObject.comparedTimeRanges.end.end),
              TIME_RANGE_FORMAT,
            )}{' '}
          </p>
        </div>
        {additionsStart && additionsEnd && deletionsStart && deletionsEnd ? (
          <div className="pt-2">
            <p>
              From <span className="font-mono">{commitsStart}</span> to{' '}
              <span className="font-mono">{commitsEnd}</span> commits per week{' '}
              {getGrowthIndicator(commitsStart, commitsEnd)}
            </p>
            <p>
              From <span className="font-mono">{additionsStart}</span> to{' '}
              <span className="font-mono">{additionsEnd}</span> additions per
              week {getGrowthIndicator(additionsStart, additionsEnd)}
            </p>
            <p>
              From <span className="font-mono">{deletionsStart}</span> to{' '}
              <span className="font-mono">{deletionsEnd}</span> deletions per
              week {getGrowthIndicator(deletionsStart, deletionsEnd)}
            </p>
          </div>
        ) : (
          <div className="pt-2">
            <p className="font-bold">
              Additions and deletions stats are not available for this
              repository due to GitHub API limitations.
            </p>
          </div>
        )}
        <div className="pt-2">
          Data calculated on{' '}
          {format(new Date(metric.created_at), TIME_RANGE_FORMAT)}
        </div>
      </div>
    </div>
  )
}

export default ActivityIndicator
