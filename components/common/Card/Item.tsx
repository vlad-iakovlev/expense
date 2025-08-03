import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '@/types/utility'
import { CardBlock, CardBlockProps } from './Block'

export type CardItemProps = Modify<
  CardBlockProps,
  {
    prefixClassName?: string
    suffixClassName?: string
    labelClassName?: string
    valueClassName?: string
    menuClassName?: string
    disabled?: boolean
    clickable?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    label?: React.ReactNode
    value?: React.ReactNode
    menu?: React.ReactNode
    children?: never
  }
>

export const CardItem = React.forwardRef<HTMLDivElement, CardItemProps>(
  function CardItem(
    {
      className,
      prefixClassName,
      suffixClassName,
      labelClassName,
      valueClassName,
      menuClassName,
      disabled,
      clickable,
      prefix,
      suffix,
      label,
      value,
      menu,
      onClick,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (
          (clickable || onClick) &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault()
          event.currentTarget.click()
        }

        onKeyDown?.(event)
      },
      [clickable, onClick, onKeyDown],
    )

    return (
      <CardBlock
        ref={ref}
        className={twMerge(
          (clickable || onClick) &&
            'cursor-pointer hover:bg-tertiary-background active:bg-tertiary-background',
          disabled && 'pointer-events-none',
          className,
        )}
        aria-disabled={!onClick || disabled ? 'true' : 'false'}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {!!prefix && (
          <div className={twMerge('flex-none', prefixClassName)}>{prefix}</div>
        )}
        <div className={twMerge('flex-auto truncate', labelClassName)}>
          {label}
          {!!value && (
            <span className="hidden" aria-label=":" aria-hidden="false" />
          )}
        </div>
        {!!value && (
          <div className={twMerge('flex-none', valueClassName)}>{value}</div>
        )}
        {!!suffix && (
          <div className={twMerge('flex-none', suffixClassName)}>{suffix}</div>
        )}
        {!!menu && (
          <div className={twMerge('absolute inset-0 top-auto', menuClassName)}>
            {menu}
          </div>
        )}
      </CardBlock>
    )
  },
)
