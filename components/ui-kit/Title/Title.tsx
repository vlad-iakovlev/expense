export interface TitleProps {
  title: string
  actions?: React.ReactNode
}

export const Title = ({ title, actions }: TitleProps) => {
  return (
    <div className="flex items-center my-8 gap-6">
      <h1 className="flex-1 min-w-0 text-4xl font-bold truncate">{title}</h1>
      {actions ? (
        <div className="flex-none flex items-center gap-6">{actions}</div>
      ) : null}
    </div>
  )
}
