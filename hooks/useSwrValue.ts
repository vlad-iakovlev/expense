import { defaultImport } from 'default-import'
import { useCallback, useMemo } from 'react'
import defaultUseSWR from 'swr'
import { useErrorEffect } from '../components/contexts/Error.tsx'
import { MayBePromise } from '../types/utility.ts'
import { request } from '../utils/client/request.ts'

const useSWR = defaultImport(defaultUseSWR)

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
  const response = useSWR(
    useMemo(() => request.withQuery(name, query || {}), [name, query]),
    useCallback(() => fetcher(query), [fetcher, query])
  )

  useErrorEffect(!!response.error)

  return useMemo(
    () => ({
      hasError: !!response.error,
      response: response.data,
      payload,
      mutate: response.mutate,
    }),
    [payload, response.data, response.error, response.mutate]
  )
}
