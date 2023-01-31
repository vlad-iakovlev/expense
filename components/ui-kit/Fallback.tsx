import Error from 'next/error'
import { FC, ReactNode } from 'react'

export interface FallbackProps {
  isLoading: boolean
  data: unknown
  children: ReactNode
}

export const Fallback: FC<FallbackProps> = ({ isLoading, data, children }) => {
  if (isLoading) return null
  if (!data) return <Error statusCode={404} />
  return <>{children}</>
}
