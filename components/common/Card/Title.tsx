import { Modify } from '@/types/utility.js'
import { CardBlock, CardBlockProps } from './Block.jsx'

export type CardTitleProps = Modify<
  CardBlockProps,
  {
    title: React.ReactNode
    actions?: React.ReactNode
    children?: never
  }
>

export const CardTitle = ({ title, actions, ...rest }: CardTitleProps) => (
  <CardBlock role="presentation" {...rest}>
    <h2 className="min-w-0 flex-auto truncate text-xl leading-6 font-semibold text-secondary-foreground">
      {title}
    </h2>

    {!!actions && (
      <div className="flex flex-none items-center gap-2">{actions}</div>
    )}
  </CardBlock>
)
