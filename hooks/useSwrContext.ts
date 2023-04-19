import { Context, useContext } from 'react'
import { SwrValue } from './useSwrValue.ts'

export const useSwrContext = <Response, Payload>(
  SwrContext: Context<SwrValue<Response, Payload> | undefined>
): SwrValue<Response, Payload> => {
  const context = useContext(SwrContext)
  const name = SwrContext.displayName?.replace('Context', '') ?? 'Swr'

  if (!context) {
    throw new Error(`use${name}Context must be within ${name}Provider`)
  }

  if (context.hasError) {
    throw new Error(`use${name}Context must be used when there are no errors`)
  }

  return context
}
