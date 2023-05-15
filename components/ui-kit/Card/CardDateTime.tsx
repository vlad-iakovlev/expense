import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import {
  formatDateForInput,
  formatDateTime,
} from '../../../utils/formatDate.ts'

export interface CardDateTimeProps {
  prefix?: ReactNode
  suffix?: ReactNode
  label: string
  value: Date
  onChange: (value: Date) => void
}

export const CardDateTime: FC<CardDateTimeProps> = ({
  prefix,
  suffix,
  label,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const dateForInput = useMemo(() => formatDateForInput(value), [value])

  const handleTextClick = useCallback(() => {
    setInputValue(dateForInput)
    setIsEditing(true)
  }, [dateForInput])

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
    if (inputValue && inputValue !== dateForInput) {
      onChange(new Date(inputValue))
    }

    setIsEditing(false)
  }, [inputValue, dateForInput, onChange])

  return (
    <>
      <div className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 active:bg-zinc-100 transition-colors">
        {prefix ? <div className="flex-none">{prefix}</div> : null}

        <div className="flex-auto">{label}</div>

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
              {formatDateTime(value)}
            </div>
          )}

          {suffix ? <div className="flex-none">{suffix}</div> : null}
        </div>
      </div>
    </>
  )
}
