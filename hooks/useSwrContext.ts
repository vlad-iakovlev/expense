import { Context, useContext } from 'react'
import { SwrValue, SwrValueSuccess } from './useSwrValue'

export const useSwrContext = <Data, Query>(
  SwrContext: Context<SwrValue<Data, Query> | undefined>
): SwrValueSuccess<Data, Query> => {
  const context = useContext(SwrContext)
  const name = SwrContext.displayName?.replace('Context', '') || 'Swr'

  if (!context) {
    throw new Error(`use${name}Context must be within ${name}Provider`)
  }

  if (context.hasError || context.isLoading) {
    throw new Error(`use${name}Context must be used after data loaded`)
  }

  return context
}
