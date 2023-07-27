import { forwardRef, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.ts'
import { CardBlock, CardBlockProps } from './CardBlock.tsx'

export type CardItemProps = Modify<
  CardBlockProps,
  {
    prefixClassName?: string
    suffixClassName?: string
    labelClassName?: string
    valueClassName?: string
    disabled?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    label?: React.ReactNode
    value?: React.ReactNode
    children?: never
  }
>

export const CardItem = forwardRef<HTMLDivElement, CardItemProps>(
  function CardButton(
    {
      className,
      prefixClassName,
      suffixClassName,
      labelClassName,
      valueClassName,
      disabled,
      prefix,
      suffix,
      label,
      value,
      onClick,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.currentTarget.click()
        }

        onKeyDown?.(event)
      },
      [onKeyDown],
    )

    return (
      <CardBlock
        ref={ref}
        className={twMerge(
          !!onClick && 'hover:bg-zinc-100 active:bg-zinc-100 cursor-pointer',
          disabled && 'pointer-events-none',
          className,
        )}
        aria-disabled={!onClick || disabled ? 'true' : 'false'}
        tabIndex={!onClick || disabled ? -1 : 0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
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