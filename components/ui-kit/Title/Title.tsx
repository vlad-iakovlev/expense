import { FC, ReactNode } from 'react'

export interface TitleProps {
  children: ReactNode
}

export const Title: FC<TitleProps> = ({ children }) => {
  return <h1 className="my-8 text-4xl font-bold truncate">{children}</h1>
}
