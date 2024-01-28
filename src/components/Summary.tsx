import Markdown from 'markdown-to-jsx'
import type { ReactNode } from 'react'

type SummaryProps = {
  summary: string
}

type TagProps = { children: ReactNode }

const H2Tag = ({ children }: TagProps) => (
  <h2 className="text-2xl">{children}</h2>
)
const H3Tag = ({ children }: TagProps) => (
  <h3 className="text-xl">{children}</h3>
)
const UlTag = ({ children }: TagProps) => (
  <ul className="pl-2 pt-2">{children}</ul>
)
const LiTag = ({ children }: TagProps) => (
  <li className="list-disc pl-4">{children}</li>
)
const StrongTag = ({ children }: TagProps) => (
  <strong className="font-medium">{children}</strong>
)
const PTag = ({ children }: TagProps) => <p className="pt-2">{children}</p>

const Summary = ({ summary }: SummaryProps) => {
  const regExp = /\\n/g
  return (
    <div className="pt-4">
      <Markdown
        options={{
          forceBlock: true,
          overrides: {
            h2: { component: H2Tag },
            h3: { component: H3Tag },
            ul: { component: UlTag },
            li: { component: LiTag },
            strong: { component: StrongTag },
            p: { component: PTag },
          },
        }}
      >
        {summary.replaceAll(regExp, '\n')}
      </Markdown>
    </div>
  )
}

export default Summary
