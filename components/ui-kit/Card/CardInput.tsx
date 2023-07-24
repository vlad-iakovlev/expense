import { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Card } from './Card.tsx'

export interface CardInputProps {
  className?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  label: string
  suggestions?: string[]
  value: string
  onChange: (value: string) => void
}

export const CardInput = ({
  className,
  prefix,
  suffix,
  label,
  suggestions = [],
  value,
  onChange,
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
    if (!isEditing) {
      setIsEditing(true)
      setInputValue(value)
      setSuggestionsFilter('')
    }
  }, [isEditing, value])

  const handleKeyDown = useCallback(
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

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
      setSuggestionsFilter(event.target.value)
    },
    [],
  )

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.currentTarget.select()
    },
    [],
  )

  const handleBlur = useCallback(() => {
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
      <div
        className={twMerge(
          'flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 active:bg-zinc-100 transition-colors',
          isEditing && 'pointer-events-auto',
        )}
        onClick={handleClick}
      >
        {prefix ? <div className="flex-none">{prefix}</div> : null}

        <div className="flex-none">{label}</div>

        <div className={twMerge('flex-auto min-w-0 font-medium', className)}>
          {isEditing ? (
            <input
              className="w-full text-right bg-transparent focus:outline-none"
              autoFocus
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          ) : (
            <div className="text-right truncate">{value}</div>
          )}
        </div>

        {suffix ? <div className="flex-none">{suffix}</div> : null}
      </div>

      <Card.Popup
        popupClassName="max-w-full -mt-2 pl-4 sm:pl-6 pb-8"
        isOpen={isEditing && !!filteredSuggestions.length}
        position="below-right"
        onPointerDown={handlePopupPointerDown}
      >
        {filteredSuggestions.map((suggestion) => (
          <Card.Button
            key={suggestion}
            label={suggestion}
            onClick={() => handleSelect(suggestion)}
          />
        ))}
      </Card.Popup>
    </>
  )
}
