import { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.ts'
import { CardItem, CardItemProps } from './CardItem.tsx'
import { CardMenu } from './CardMenu.tsx'

export type CardInputProps = Modify<
  CardItemProps,
  {
    suggestions?: string[]
    value: string
    onChange: (value: string) => void
    onClick?: never
  }
>

export const CardInput = ({
  className,
  labelClassName,
  valueClassName,
  suggestions = [],
  value,
  onChange,
  ...rest
}: CardInputProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestionsFilter, setSuggestionsFilter] = useState<string>('')

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(suggestionsFilter.toLowerCase()),
    )
  }, [suggestions, suggestionsFilter])

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const currentTarget = event.currentTarget

      requestAnimationFrame(() => {
        if (!currentTarget.contains(document.activeElement)) {
          const formattedValue = inputValue.trim().replace(/\s+/g, ' ')

          if (formattedValue && formattedValue !== value) {
            onChange(formattedValue)
          }

          setIsEditing(false)
        }
      })
    },
    [inputValue, value, onChange],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'Enter':
          event.currentTarget.blur()
          break

        case 'Escape':
          setIsEditing(false)
          break

        case ' ':
          if (!isEditing) {
            event.preventDefault()
          }
          break
      }
    },
    [isEditing],
  )

  const handleButtonClick = useCallback(() => {
    setIsEditing(true)
    setInputValue(value)
    setSuggestionsFilter('')
  }, [value])

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
      setSuggestionsFilter(event.target.value)
    },
    [],
  )

  const handleInputFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.currentTarget.select()
    },
    [],
  )

  const handleSelect = useCallback(
    (suggestion: string) => {
      if (suggestion === value) {
        setIsEditing(false)
        return
      }

      onChange(suggestion)
      setIsEditing(false)
    },
    [onChange, value],
  )

  return (
    <div onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <CardItem
        className={twMerge(isEditing && 'pointer-events-auto', className)}
        labelClassName={twMerge('flex-none', labelClassName)}
        valueClassName={twMerge(
          'flex-auto min-w-0 text-right font-medium truncate',
          valueClassName,
        )}
        value={
          isEditing ? (
            <input
              className="w-full text-right bg-transparent focus:outline-none"
              autoFocus
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          ) : (
            value
          )
        }
        onClick={isEditing ? undefined : handleButtonClick}
        {...rest}
      />

      <CardMenu
        popupClassName="max-w-full -mt-2 pl-4 sm:pl-6 pb-8"
        isOpen={isEditing && !!filteredSuggestions.length}
        position="below-right"
      >
        {filteredSuggestions.map((suggestion) => (
          <CardItem
            key={suggestion}
            label={suggestion}
            role="menuitem"
            onClick={() => handleSelect(suggestion)}
          />
        ))}
      </CardMenu>
    </div>
  )
}
