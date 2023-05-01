import { FC } from 'react'
import { Columns } from '../../ui-kit/Columns/Columns.tsx'
import { NextHead } from '../../ui-kit/NextHead/NextHead.ts'

export const Loading: FC = () => {
  return (
    <>
      <NextHead>
        <title>Expense loading...</title>
      </NextHead>

      <div role="status" className="animate-pulse">
        <div className="py-1 mb-6">
          <div className="w-28 h-5 bg-zinc-900 opacity-20 rounded-full" />
        </div>
        <Columns>
          <div className="max-sm:-mx-4 h-[225px] bg-white sm:rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-80" />
        </Columns>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  )
}
