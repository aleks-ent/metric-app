import { Typewriter } from 'react-simple-typewriter'

import GoogleAnalytics from '@/components/GoogleAnalytics'
import { SearchBar } from '@/components/SearchBar'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'

const Index = () => (
  <Main
    meta={
      <Meta
        title="Check if git repository is active"
        description="Calculates and displays contribution activity of provided git repository"
        keywords="activity, github, repository"
      />
    }
  >
    <GoogleAnalytics />
    <div className="pt-10 text-center">
      <p className="sm:text-3xl md:text-6xl">
        <span>You are </span>
        <span className="text-gray-600">
          <Typewriter
            words={[' an engineer ...', ' in crypto ...', ' a researcher ...']}
            cursor
            cursorBlinking
            delaySpeed={2500}
            typeSpeed={120}
          />
        </span>
      </p>
    </div>
    <div className="pt-4 text-center">
      <p className="text-lg">
        Check if <span className="font-mono text-gray-600">git</span> project
        has been active in the last year
      </p>
    </div>
    <div className="grid place-content-center pt-4">
      <div className="w-96">
        <SearchBar />
      </div>
    </div>
  </Main>
)

export default Index
