import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { formatDate, formatDateForInput } from '../../../utils/formatDate'

export interface CardDateTimeProps {
  name: string
  value: Date
  onChange: (value: Date) => void
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

  const handleBlur = useCallback(() => {
    if (!inputValue || inputValue === formatDateForInput(value)) {
      setIsEditing(false)
      return
    }

    onChange(new Date(inputValue))
  }, [inputValue, value, onChange])

  useEffect(() => {
    setIsEditing(false)
  }, [value])

  return (
    <>
      <div className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors">
        <div className="flex-none">{name}</div>

        <div className={'flex-auto min-w-0 font-medium'}>
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
