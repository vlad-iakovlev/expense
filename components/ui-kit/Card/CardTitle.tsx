import { FC, ReactNode } from 'react'

export interface CardTitleProps {
  title: ReactNode
  actions?: ReactNode
}

export const CardTitle: FC<CardTitleProps> = ({ title, actions }) => (
  <div className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3">
    <h2 className="flex-auto min-w-0 text-xl leading-6 font-semibold text-zinc-900 truncate">
      {title}
    </h2>
    {actions ? (
      <div className="flex-none flex items-center gap-2">{actions}</div>
    ) : null}
  </div>
)
