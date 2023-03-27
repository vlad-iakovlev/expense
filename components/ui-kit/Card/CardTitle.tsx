import { FC, ReactNode } from 'react'

export interface CardTitleProps {
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
}

export const CardTitle: FC<CardTitleProps> = ({ title, subtitle, action }) => (
  <div className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3">
    <div className="flex-auto min-w-0 flex flex-col justify-center gap-1">
      <h2 className="flex-none text-lg font-medium leading-6 truncate">
        {title}
      </h2>
      {subtitle && (
        <p className="flex-none text-sm text-zinc-600 truncate">{subtitle}</p>
      )}
    </div>
    {action ? <div className="flex-none">{action}</div> : null}
  </div>
)
