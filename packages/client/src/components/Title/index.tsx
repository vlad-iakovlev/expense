import { useEffect, useRef, useState } from 'react'

export type TitleProps = {
  title: string
  suffix?: string
  onChange?: (newTitle: string) => void
}

export const Title = ({ title, suffix, onChange }: TitleProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(title)
  }, [title])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const startEditing = () => {
    if (onChange) {
      setIsEditing(true)
    }
  }

  const stopEditing = () => {
    setIsEditing(false)
    const trimmedValue = value.trim()
    if (trimmedValue && trimmedValue !== title && onChange) {
      onChange(trimmedValue)
    } else {
      setValue(title)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      stopEditing()
    } else if (e.key === 'Escape') {
      setValue(title)
      setIsEditing(false)
    }
  }

  if (isEditing && onChange) {
    return (
      <div className="my-8 flex items-center text-4xl font-bold">
        <div className="relative inline-flex max-w-full overflow-hidden">
          <span className="pointer-events-none invisible whitespace-pre">
            {value || ' '}
          </span>
          <input
            ref={inputRef}
            className="absolute inset-0 w-full bg-transparent p-0 ring-0 outline-none"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            onBlur={stopEditing}
            onKeyDown={handleKeyDown}
          />
        </div>
        {suffix && <span className="ml-2 whitespace-nowrap">{suffix}</span>}
      </div>
    )
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <h1
      className={`my-8 truncate text-4xl font-bold ${
        onChange ? 'cursor-text transition-opacity hover:opacity-80' : ''
      }`}
      tabIndex={0}
      onDoubleClick={startEditing}
      onKeyDown={(e) => {
        if (e.key === 'Enter') startEditing()
      }}
      title={onChange ? 'Double click to edit' : undefined}
    >
      {title}
      {suffix && ` ${suffix}`}
    </h1>
  )
}
