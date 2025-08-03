import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '@/types/utility.js'
import {
  formatDateForInput,
  formatDateTime,
  formatDateTimeForAriaLabel,
} from '@/utils/formatDate.js'
import { CardItem, CardItemProps } from './Item.jsx'

export type CardDateTimeProps = Modify<
  CardItemProps,
  {
    value: Date
    onChange: (value: Date) => void
    onClick?: never
  }
>

export const CardDateTime = ({
  labelClassName,
  valueClassName,
  value,
  onChange,
  ...rest
}: CardDateTimeProps) => {
  const [inputValue, setInputValue] = React.useState('')
  const [isEditing, setIsEditing] = React.useState(false)

  const dateForInput = React.useMemo(() => formatDateForInput(value), [value])

  const handleClick = React.useCallback(() => {
    setIsEditing(true)
    setInputValue(dateForInput)
  }, [dateForInput])

  const handleInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'Enter':
          event.currentTarget.blur()
          break

        case 'Escape':
          setIsEditing(false)
          break
      }
    },
    [],
  )

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    [],
  )

  const handleInputBlur = React.useCallback(() => {
    if (inputValue && inputValue !== dateForInput) {
      onChange(new Date(inputValue))
    }

    setIsEditing(false)
  }, [inputValue, dateForInput, onChange])

  return (
    <CardItem
      labelClassName={twMerge('flex-none', labelClassName)}
      valueClassName={twMerge(
        'flex-auto min-w-0 text-right font-medium truncate',
        valueClassName,
      )}
      value={
        isEditing ? (
          <input
            className="w-full bg-transparent text-right focus:outline-hidden"
            autoFocus
            type="datetime-local"
            value={inputValue}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        ) : (
          <span aria-label={formatDateTimeForAriaLabel(value)}>
            {formatDateTime(value)}
          </span>
        )
      }
      aria-expanded={isEditing ? 'true' : 'false'}
      onClick={isEditing ? undefined : handleClick}
      {...rest}
    />
  )
}
