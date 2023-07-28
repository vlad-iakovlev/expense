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
    menuClassName?: string
    disabled?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    label?: React.ReactNode
    value?: React.ReactNode
    menu?: React.ReactNode
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
      menuClassName,
      disabled,
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
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (
          onClick &&
          !disabled &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault()
          event.currentTarget.click()
        }

        onKeyDown?.(event)
      },
      [disabled, onClick, onKeyDown],
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
