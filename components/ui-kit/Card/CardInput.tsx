import clsx from 'clsx'
import {
  ChangeEvent,
  FC,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Card } from './Card'

export interface CardInputProps {
  className?: string
  name: string
  suggestions?: string[]
  value: string
  onChange: (value: string) => void
}

export const CardInput: FC<CardInputProps> = ({
  className,
  name,
  suggestions,
  value,
  onChange,
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState(value)
  const [isEditing, setIsEditing] = useState(false)

  const handleTextClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'Enter':
          event.currentTarget.blur()
          break

        case 'Escape':
          setInputValue(value)
          setIsEditing(false)
          break
      }
    },
    [value]
  )

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }, [])

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select()
  }, [])

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const inputValue = event.currentTarget.value

      if (!inputValue || inputValue === value) {
        setInputValue(value)
        setIsEditing(false)
        return
      }

      onChange(inputValue)
    },
    [value, onChange]
  )

  useEffect(() => {
    setInputValue(value)
    setIsEditing(false)
  }, [value])

  return (
    <>
      <div
        ref={rootRef}
        className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors"
      >
        <div className="flex-none">{name}</div>

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
            <div className="text-right truncate" onClick={handleTextClick}>
              {value}
            </div>
          )}
        </div>
      </div>

      {suggestions?.length ? (
        <Card.Popup
          className="-mt-2"
          isOpen={isEditing}
          anchorRef={rootRef}
          position="below-right"
        >
          {suggestions.map((suggestion) => (
            <Card.Button key={suggestion} onClick={() => onChange(suggestion)}>
              {suggestion}
            </Card.Button>
          ))}
        </Card.Popup>
      ) : null}
    </>
  )
}
