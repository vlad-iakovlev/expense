import { useCallback, useMemo } from 'react'
import useSWR from 'swr'
import { useErrorEffect } from '../components/contexts/Error'
import { useLoadingEffect } from '../components/contexts/Loading'
import { MayBePromise } from '../types/utility'
import { request } from '../utils/client/request'

export interface SwrValueError<Query> {
  hasError: true
  isLoading: boolean
  query: Query
  mutate: () => Promise<void>
  data?: never
}

export interface SwrValueLoading<Query> {
  hasError: boolean
  isLoading: true
  query: Query
  mutate: () => Promise<void>
  data?: never
}

export interface SwrValueSuccess<Data, Query> {
  hasError: false
  isLoading: false
  query: Query
  mutate: () => Promise<void>
  data: Data
}

export type SwrValue<Data, Query> =
  | SwrValueError<Query>
  | SwrValueLoading<Query>
  | SwrValueSuccess<Data, Query>

export const useSwrValue = <Data, Query>(
  name: string,
  fetcher: (query: Query) => MayBePromise<Data>,
  query: Query
): SwrValue<Data, Query> => {
  const response = useSWR(
    useMemo(() => request.withQuery(name, query || {}), [name, query]),
    useCallback(() => fetcher(query), [fetcher, query])
  )

  const hasError = !!response.error
  const isLoading = response.isLoading || response.isValidating

  useErrorEffect(hasError)
  useLoadingEffect(isLoading)

  return useMemo(() => {
    return {
      hasError,
      isLoading,
      query,
      mutate: async () => {
        await response.mutate()
      },
      data: response.data,
    } as SwrValue<Data, Query>
  }, [hasError, isLoading, query, response])
}
