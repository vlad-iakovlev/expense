import { FC } from 'react'
import { NextError } from '../../next/Error.ts'
import { NextHead } from '../../next/Head.ts'

export const Unauthenticated: FC = () => {
  return (
    <>
      <NextHead>
        <title>Expense</title>
      </NextHead>

      <NextError statusCode={403} />
    </>
  )
}
