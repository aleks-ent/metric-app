import type { Metadata } from 'next'
import Link from 'next/link'

import { Main } from '@/templates/Main'

export function generateMetadata(): Metadata {
  return {
    title: `About`,
    description: `Describes IsGitProjectActive service`,
    keywords: `activity, github, repository, metrics`,
    alternates: { canonical: `https://isgitprojectactive.info/about` },
  }
}

const AboutPage = async () => {
  return (
    <Main>
      <div className="pt-4">
        <h1 className="text-3xl">About isgitprojectactive.info</h1>
      </div>
      <div className="pt-4">
        <p>
          This service helps to calculate the activity of git repositories for
          the last year (or a shorter period if repository was created less than
          one year ago).
        </p>
      </div>

      <div className="pt-4">
        <Link href="/metric/all">All analyzed projects</Link>
      </div>
      <div className="pt-4">
        <p>It can be useful for</p>
        <ul className="list-inside list-disc">
          <li>
            Software engineers – is it safe to rely on a project? Is it actively
            maintained?
          </li>
          <li>
            Crypto enthusiasts and investors – is it safe to invest in this
            project?
          </li>
          <li>Researchers – is it worth to cite this project?</li>
          <li>Anyone else – is it worth to use this project?</li>
        </ul>
      </div>
      <div className="pt-4">
        <p>Feel free to reach out to me any time.</p>
      </div>
      <div className="pt-4">
        <p>
          Project is developed using NextJS, TailwindCSS, Turso Database, and
          GitHub REST API.
        </p>
      </div>
      <div className="pt-4">
        <p>
          <a href="mailto:alexent@yahoo.com">Contact via email</a>
        </p>
      </div>
    </Main>
  )
}

export default AboutPage
