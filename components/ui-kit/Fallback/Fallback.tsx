import Error from 'next/error'
import { FC, ReactNode } from 'react'

export interface FallbackProps {
  isLoading: boolean
  data: unknown
  error: unknown
  children: ReactNode
}

export const Fallback: FC<FallbackProps> = ({
  isLoading,
  data,
  error,
  children,
}) => {
  if (isLoading) return null
  if (error || !data) return <Error statusCode={404} />
  return <>{children}</>
}
