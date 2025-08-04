import { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '@/types/utility'
import {
  formatDateForInput,
  formatDateTime,
  formatDateTimeForAriaLabel,
} from '@/utils/formatDate'
import { CardItem, CardItemProps } from './Item'

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
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const dateForInput = useMemo(() => formatDateForInput(value), [value])

  const handleClick = useCallback(() => {
    setIsEditing(true)
    setInputValue(dateForInput)
  }, [dateForInput])

  const handleInputKeyDown = useCallback(
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

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    [],
  )

  const handleInputBlur = useCallback(() => {
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
