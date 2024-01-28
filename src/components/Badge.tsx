'use client'

import Image from 'next/image'

type BadgeProp = {
  owner: string
  repo: string
}

const Badge = ({ owner, repo }: BadgeProp) => {
  const copyText = `[![Activity](https://isgitprojectactive.info/api/badge/${owner}/${repo}/badge.svg)](https://isgitprojectactive.info/metric/${owner}/${repo} "Repository activity")`

  return (
    <div>
      <div className="flex items-center justify-center">
        <div style={{ height: '24px' }}>
          <Image
            src={`/api/badge/${owner}/${repo}/badge.svg`}
            alt={`Activity badge for ${owner}/${repo} repository`}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="hidden md:inline-block">
          <div
            className="p-2 text-center font-mono text-xs"
            style={{ backgroundColor: 'white' }}
          >
            {copyText}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Badge
