import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.ts'
import { CardBlock, CardBlockProps } from './CardBlock.tsx'

export type CardTextProps = Modify<
  CardBlockProps,
  {
    prefixClassName?: string
    suffixClassName?: string
    labelClassName?: string
    valueClassName?: string
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    label?: React.ReactNode
    value?: React.ReactNode
    children?: never
  }
>

export const CardText = forwardRef<HTMLDivElement, CardTextProps>(
  function CardText(
    {
      prefixClassName,
      suffixClassName,
      labelClassName,
      valueClassName,
      prefix,
      suffix,
      label,
      value,
      ...rest
    },
    ref,
  ) {
    return (
      <CardBlock ref={ref} aria-disabled="true" {...rest}>
        {prefix ? (
          <div className={twMerge('flex-none', prefixClassName)}>{prefix}</div>
        ) : null}
        <div className={twMerge('flex-auto truncate', labelClassName)}>
          {label}
        </div>
        {value ? (
          <div className={twMerge('flex-none', valueClassName)}>{value}</div>
        ) : null}
        {suffix ? (
          <div className={twMerge('flex-none', suffixClassName)}>{suffix}</div>
        ) : null}
      </CardBlock>
    )
  },
)
