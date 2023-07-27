import { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.ts'
import { CardItem, CardItemProps } from './CardItem.tsx'
import { CardPopup } from './CardPopup.tsx'

export type CardInputProps = Modify<
  CardItemProps,
  {
    suggestions?: string[]
    value: string
    onChange: (value: string) => void
    onClick?: never
    onKeyDown?: never
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

  const handleClick = useCallback(() => {
    setIsEditing(true)
    setInputValue(value)
    setSuggestionsFilter('')
  }, [value])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === ' ') {
      event.preventDefault()
    }
  }, [])

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'Enter':
          event.stopPropagation()
          event.currentTarget.blur()
          break

        case 'Escape':
          event.stopPropagation()
          setIsEditing(false)
          break
      }
    },
    [],
  )

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

  const handleInputBlur = useCallback(() => {
    const formattedValue = inputValue.trim().replace(/\s+/g, ' ')

    if (formattedValue && formattedValue !== value) {
      onChange(formattedValue)
    }

    setIsEditing(false)
  }, [inputValue, value, onChange])

  const handlePopupPointerDown = useCallback((event: React.PointerEvent) => {
    event.preventDefault()
  }, [])

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
    <>
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
              onKeyDown={handleInputKeyDown}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          ) : (
            value
          )
        }
        onClick={isEditing ? undefined : handleClick}
        onKeyDown={isEditing ? undefined : handleKeyDown}
        {...rest}
      />

      {/* TODO: fix keyboard navigation in popup */}
      <CardPopup
        popupClassName="max-w-full -mt-2 pl-4 sm:pl-6 pb-8"
        isOpen={isEditing && !!filteredSuggestions.length}
        position="below-right"
        onPointerDown={handlePopupPointerDown}
      >
        {filteredSuggestions.map((suggestion) => (
          <CardItem
            key={suggestion}
            label={suggestion}
            role="menuitem"
            onClick={() => handleSelect(suggestion)}
          />
        ))}
      </CardPopup>
    </>
  )
}
