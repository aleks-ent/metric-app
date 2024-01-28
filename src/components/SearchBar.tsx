'use client'

import * as Sentry from '@sentry/nextjs'
import { useState } from 'react'

type ResponseObject = {
  status: 'success' | 'failure'
  message: string
  id?: string
}

const repos = [
  'https://github.com/facebook/react',
  'https://github.com/ethereum/go-ethereum',
  'https://github.com/ixartz/Next-js-Boilerplate',
]

const SearchBar = () => {
  const [loading, setLoading] = useState(false)
  const [resultId, setResultId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [value, setValue] = useState(
    repos[Math.floor(Math.random() * repos.length)] ||
      'https://github.com/facebook/react',
  )

  const getMetric = (repositoryLink: string) => {
    setLoading(true)
    fetch(`/api/metric?repositoryLink=${btoa(repositoryLink)}`)
      .then(async (res) => {
        const response = (await res.json()) as ResponseObject
        if (response.id) {
          setResultId(response.id)
        } else {
          setError(response.message)

          Sentry.captureException({
            input: repositoryLink,
            message: 'Server did not return an id',
          })
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)

        Sentry.captureException({
          error: e,
          input: repositoryLink,
          message: 'Failed to perform request',
        })
        setError(
          'Failed to perform request, please try again later. The developer has been notified.',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      {!resultId && (
        <div className="relative">
          <div>
            <label htmlFor="Search" className="sr-only">
              {' '}
              Search{' '}
            </label>

            <input
              disabled={loading}
              value={value}
              onChange={(e) => {
                setError(null)
                setValue(e.currentTarget.value)
              }}
              type="text"
              id="Search"
              placeholder="https://github.com/ixartz/Next-js-Boilerplate"
              className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                disabled={loading || !value}
                onClick={() => {
                  getMetric(value)
                }}
                type="button"
                className="text-sky-700 hover:text-sky-900 disabled:text-sky-100"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
      )}
      {resultId && (
        <div style={{ textAlign: 'center' }}>
          Results are ready and are available{' '}
          <a href={`/metric/${resultId}`}>here</a>
        </div>
      )}
      {error && (
        <div className="pt-2 text-center">
          <p className="text-red-700">Please check URL or try again later</p>
        </div>
      )}
    </div>
  )
}

export { SearchBar }
