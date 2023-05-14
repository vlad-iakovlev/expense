import { clsx } from 'clsx'
import {
  ChangeEvent,
  FC,
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Card } from './Card.tsx'

export interface CartInputSuggestion {
  id: string
  label: ReactNode
  suffix?: ReactNode
}

export interface CardInputProps {
  className?: string
  label: string
  suggestions?: CartInputSuggestion[]
  value: string
  onChange: (value: string) => void
}

export const CardInput: FC<CardInputProps> = ({
  className,
  label,
  suggestions = [],
  value,
  onChange,
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestionsFilter, setSuggestionsFilter] = useState<string>('')

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((suggestion) =>
      suggestion.id.toLowerCase().includes(suggestionsFilter.toLowerCase())
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
    (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'Enter':
          event.currentTarget.blur()
          break

        case 'Escape':
          setIsEditing(false)
          break
      }
    },
    []
  )

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setSuggestionsFilter(event.target.value)
  }, [])

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select()
  }, [])

  const handleBlur = useCallback(() => {
    const formattedValue = inputValue.trim().replace(/\s+/g, ' ')

    if (formattedValue && formattedValue !== value) {
      onChange(formattedValue)
    }

    setIsEditing(false)
  }, [inputValue, value, onChange])

  const handleSelect = useCallback(
    (suggestion: string) => {
      if (suggestion === value) {
        setIsEditing(false)
        return
      }

      onChange(suggestion)
      setIsEditing(false)
    },
    [onChange, value]
  )

  return (
    <>
      <div
        ref={rootRef}
        className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 active:bg-zinc-100 transition-colors"
        onClick={handleClick}
      >
        <div className="flex-none">{label}</div>

        <div className={clsx(className, 'flex-auto min-w-0 font-medium')}>
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
      </div>

      <Card.Popup
        ref={popupRef}
        anchorRef={rootRef}
        className="-mt-2 pl-4 sm:pl-6 pb-8"
        fullMaxWidth
        isOpen={isEditing && !!filteredSuggestions.length}
        position="below-right"
      >
        {filteredSuggestions.map((suggestion) => (
          <Card.Button
            key={suggestion.id}
            label={suggestion.label}
            value={suggestion.suffix}
            onClick={() => handleSelect(suggestion.id)}
            onPointerDown={(event) => event.preventDefault()}
          />
        ))}
      </Card.Popup>
    </>
  )
}
