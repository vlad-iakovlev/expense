import { ReactElement, useCallback, useRef, useState } from 'react'
import { Card } from './Card.tsx'

export interface CardSelectOption<Id extends string = string> {
  id: Id
  name: string
}

export interface CardSelectProps<Id extends string = string> {
  label: string
  options: CardSelectOption<Id>[]
  value: CardSelectOption<Id>
  onChange: (value: CardSelectOption<Id>) => void
}

export function CardSelect<Id extends string = string>({
  label,
  options,
  value,
  onChange,
}: CardSelectProps<Id>): ReactElement | null {
  const rootRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const show = useCallback(() => setIsOpen(true), [])
  const hide = useCallback(() => setIsOpen(false), [])

  const handleChange = useCallback(
    (option: CardSelectOption<Id>) => {
      if (option.id === value.id) {
        setIsOpen(false)
        return
      }

      onChange(option)
      setIsOpen(false)
    },
    [onChange, value.id]
  )

  return (
    <>
      <button
        ref={rootRef}
        className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 active:bg-zinc-100 transition-colors"
        onClick={show}
      >
        <div className="flex-none">{label}</div>
        <div className="flex-auto text-right font-medium truncate">
          {value.name}
        </div>
      </button>

      <Card.Popup
        className="-mt-2 px-4 sm:px-6 pb-6"
        isOpen={isOpen}
        anchorRef={rootRef}
        position="below-right"
        setMaxWidth
        onClose={hide}
      >
        {options.map((option) => (
          <Card.Button
            key={option.id}
            label={option.name}
            onClick={() => handleChange(option)}
          />
        ))}
      </Card.Popup>
    </>
  )
}
