import { FC } from 'react'
import { NextError } from '../../ui-kit/NextError/NextError.ts'
import { NextHead } from '../../ui-kit/NextHead/NextHead.ts'

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
