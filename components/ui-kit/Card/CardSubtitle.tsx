import { FC, ReactNode } from 'react'
import { CardBlock } from './CardBlock.tsx'

export interface CardSubtitleProps {
  subtitle: ReactNode
  actions?: ReactNode
}

export const CardSubtitle: FC<CardSubtitleProps> = ({ subtitle, actions }) => (
  <CardBlock className="flex items-center gap-3 my-1 bg-zinc-100 ">
    <h2 className="flex-auto min-w-0 font-medium truncate">{subtitle}</h2>
    {actions ? (
      <div className="flex-none flex items-center gap-2">{actions}</div>
    ) : null}
  </CardBlock>
)
