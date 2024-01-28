import type { Metric, MetricOject } from '@/app/types'

type ActivityIndicatorProp = {
  metric: Metric
}

const Contributors = ({ metric }: ActivityIndicatorProp) => {
  const metricsObject = JSON.parse(metric.metrics) as MetricOject

  return (
    <div>
      <div className="pt-4">
        <h2 className="text-2xl">
          Top {metricsObject.contirbutors.length} contributors
        </h2>
      </div>
      <div>
        <table className="table-auto divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="p-2">Contributor</th>
              <th className="p-2">Commits</th>
            </tr>
          </thead>
          <tbody>
            {metricsObject.contirbutors.map((contributor) => {
              return (
                <tr key={contributor.author.login}>
                  <td className="p-2">
                    <div className="flex">
                      <div>
                        <img
                          className="inline-block h-6 w-6 rounded-full"
                          alt={`Avatar of ${contributor.author.login}`}
                          src={contributor.author.avatar_url}
                        />
                      </div>
                      <div className="pl-2 text-center">
                        <a target="_blank" href={contributor.author.html_url}>
                          {contributor.author.login}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <span>{contributor.total}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Contributors
