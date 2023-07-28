import { Modify } from '../../../types/utility.ts'
import { CardBlock, CardBlockProps } from './CardBlock.tsx'

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
    <h2 className="flex-auto min-w-0 text-xl leading-6 font-semibold text-zinc-900 truncate">
      {title}
    </h2>

    {!!actions && (
      <div className="flex-none flex items-center gap-2">{actions}</div>
    )}
  </CardBlock>
)
