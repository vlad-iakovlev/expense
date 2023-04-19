import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { MayBePromise } from '../../../types/utility.ts'
import { formatDate, formatDateForInput } from '../../../utils/formatDate.ts'

export interface CardDateTimeProps {
  name: string
  value: Date
  onChange: (value: Date) => MayBePromise<void>
}

export const CardDateTime: FC<CardDateTimeProps> = ({
  name,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleTextClick = useCallback(() => {
    setInputValue(formatDateForInput(value))
    setIsEditing(true)
  }, [value])

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
  }, [])

  const handleBlur = useCallback(() => {
    void (async () => {
      if (!inputValue || inputValue === formatDateForInput(value)) {
        setIsEditing(false)
        return
      }

      await onChange(new Date(inputValue))
      setIsEditing(false)
    })()
  }, [inputValue, value, onChange])

  useEffect(() => {
    setIsEditing(false)
  }, [value])

  return (
    <>
      <div className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors">
        <div className="flex-auto">{name}</div>

        <div className="font-medium">
          {isEditing ? (
            <input
              className="w-full text-right bg-transparent focus:outline-none"
              autoFocus
              type="datetime-local"
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
            <div className="text-right truncate" onClick={handleTextClick}>
              {formatDate(value)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
