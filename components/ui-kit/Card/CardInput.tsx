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
import { MayBePromise } from '../../../types/utility'
import { Card } from './Card'

export interface CardInputProps {
  className?: string
  name: string
  suggestions?: string[]
  value: string
  onChange: (value: string) => MayBePromise<void>
}

export const CardInput: FC<CardInputProps> = ({
  className,
  name,
  suggestions,
  value,
  onChange,
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleClick = useCallback(() => {
    if (!isEditing) {
      setInputValue(value)
      setIsEditing(true)
    }
  }, [isEditing, value])

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
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
  }, [])

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select()
  }, [])

  const handleBlur = useCallback(
    async (event: FocusEvent<HTMLInputElement>) => {
      if (popupRef.current?.contains(event.relatedTarget)) {
        event.preventDefault()
        return
      }

      if (!inputValue || inputValue === value) {
        setIsEditing(false)
        return
      }

      await onChange(inputValue)
      setIsEditing(false)
    },
    [inputValue, value, onChange]
  )

  const handleSelect = useCallback(
    async (suggestion: string) => {
      if (suggestion === value) {
        setIsEditing(false)
        return
      }

      await onChange(suggestion)
      setIsEditing(false)
    },
    [onChange, value]
  )

  useEffect(() => {
    setIsEditing(false)
  }, [value])

  return (
    <>
      <div
        ref={rootRef}
        className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors"
        onClick={handleClick}
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
            <div className="text-right truncate">{value}</div>
          )}
        </div>
      </div>

      {suggestions?.length ? (
        <Card.Popup
          ref={popupRef}
          className="-mt-2"
          isOpen={isEditing}
          anchorRef={rootRef}
          position="below-right"
        >
          {suggestions.map((suggestion) => (
            <Card.Button
              key={suggestion}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </Card.Button>
          ))}
        </Card.Popup>
      ) : null}
    </>
  )
}
