import { useCallback, useMemo } from 'react'
import useSWR from 'swr'
import { useErrorEffect } from '../components/contexts/Error'
import { MayBePromise } from '../types/utility'
import { request } from '../utils/client/request'

export interface SwrValue<Response, Payload> {
  hasError: boolean
  response?: Response
  payload: Payload
  mutate: () => Promise<unknown>
}

export const useSwrValue = <Response, Query, Payload>(
  name: string,
  fetcher: (query: Query) => MayBePromise<Response>,
  query: Query,
  payload: Payload
): SwrValue<Response, Payload> => {
  const { error, mutate, data } = useSWR(
    useMemo(() => request.withQuery(name, query || {}), [name, query]),
    useCallback(() => fetcher(query), [fetcher, query])
  )

  useErrorEffect(!!error)

  return useMemo(
    () => ({
      hasError: !!error,
      response: data,
      payload,
      mutate,
    }),
    [data, error, mutate, payload]
  )
}
