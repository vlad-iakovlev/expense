import { Modify } from '../../../types/utility.js'
import { CardBlock, CardBlockProps } from './CardBlock.jsx'

export type CardSubtitleProps = Modify<
  CardBlockProps,
  {
    subtitle: React.ReactNode
    actions?: React.ReactNode
    children?: never
  }
>

export const CardSubtitle = ({
  subtitle,
  actions,
  ...rest
}: CardSubtitleProps) => (
  <CardBlock className="my-2 bg-zinc-100" role="presentation" {...rest}>
    <h2 className="min-w-0 flex-auto truncate font-medium">{subtitle}</h2>

    {!!actions && (
      <div className="flex flex-none items-center gap-2">{actions}</div>
    )}
  </CardBlock>
)
