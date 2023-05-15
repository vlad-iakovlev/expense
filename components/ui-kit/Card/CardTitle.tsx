import { FC, ReactNode } from 'react'
import { CardBlock } from './CardBlock.tsx'

export interface CardTitleProps {
  title: ReactNode
  actions?: ReactNode
}

export const CardTitle: FC<CardTitleProps> = ({ title, actions }) => (
  <CardBlock>
    <h2 className="flex-auto min-w-0 text-xl leading-6 font-semibold text-zinc-900 truncate">
      {title}
    </h2>
    {actions ? (
      <div className="flex-none flex items-center gap-2">{actions}</div>
    ) : null}
  </CardBlock>
)
