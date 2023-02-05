import { FC } from 'react'

export interface BreadcrumbsTitleProps {
  title: string
}

export const BreadcrumbsTitle: FC<BreadcrumbsTitleProps> = ({ title }) => (
  <h1 className="min-w-0 text-lg font-medium truncate">{title}</h1>
)
