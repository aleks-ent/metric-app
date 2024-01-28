import Link from 'next/link'
import type { ReactNode } from 'react'

type IMainProps = {
  meta?: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <div>
    {props.meta}
    <div className="mx-auto max-w-screen-md p-4">
      {props.children}
      <div className="pt-4 text-center">
        <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
        <a href="mailto:alexent@yahoo.com">Contact</a>
      </div>
    </div>
  </div>
)

export { Main }
