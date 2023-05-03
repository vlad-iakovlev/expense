import { FC, ReactNode } from 'react'

export interface CardTitleProps {
  title: ReactNode
  action?: ReactNode
}

export const CardTitle: FC<CardTitleProps> = ({ title, action }) => (
  <div className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3">
    <h2 className="flex-auto min-w-0 text-xl leading-6 font-semibold text-zinc-900 truncate">
      {title}
    </h2>
    {action ? <div className="flex-none">{action}</div> : null}
  </div>
)
