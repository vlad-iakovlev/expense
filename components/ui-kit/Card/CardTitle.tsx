import { Modify } from '../../../types/utility.js'
import { CardBlock, CardBlockProps } from './CardBlock.jsx'

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
    <h2 className="text-secondary min-w-0 flex-auto truncate text-xl font-semibold leading-6">
      {title}
    </h2>

    {!!actions && (
      <div className="flex flex-none items-center gap-2">{actions}</div>
    )}
  </CardBlock>
)
