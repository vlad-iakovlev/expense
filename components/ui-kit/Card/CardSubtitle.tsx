import { Modify } from '../../../types/utility.ts'
import { CardBlock, CardBlockProps } from './CardBlock.tsx'

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
    <h2 className="flex-auto min-w-0 font-medium truncate">{subtitle}</h2>
    {actions ? (
      <div className="flex-none flex items-center gap-2">{actions}</div>
    ) : null}
  </CardBlock>
)
