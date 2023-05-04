import { FC } from 'react'

export interface TitleProps {
  title: string
}

export const Title: FC<TitleProps> = ({ title }) => {
  return <h1 className="my-8 text-3xl font-bold truncate">{title}</h1>
}
