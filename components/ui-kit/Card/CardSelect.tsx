import { FC, useCallback, useRef, useState } from 'react'
import { MayBePromise } from '../../../types/utility'
import { Card } from './Card'

export interface CardSelectOption {
  id: string
  name: string
}

export interface CardSelectProps {
  name: string
  options: CardSelectOption[]
  value: CardSelectOption
  onChange: (value: CardSelectOption) => MayBePromise<void>
}

export const CardSelect: FC<CardSelectProps> = ({
  name,
  options,
  value,
  onChange,
}) => {
  const rootRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const show = useCallback(() => setIsOpen(true), [])
  const hide = useCallback(() => setIsOpen(false), [])

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      if (option.id === value.id) return
      await onChange(option)
    },
    [onChange, value.id]
  )

  return (
    <>
      <button
        ref={rootRef}
        className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors"
        onClick={show}
      >
        <div className="flex-none">{name}</div>
        <div className="flex-auto text-right font-medium truncate">
          {value.name}
        </div>
      </button>

      <Card.Popup
        className="-mt-2"
        isOpen={isOpen}
        anchorRef={rootRef}
        position="below-right"
        onClose={hide}
      >
        {options.map((option) => (
          <Card.Button key={option.id} onClick={() => handleChange(option)}>
            {option.name}
          </Card.Button>
        ))}
      </Card.Popup>
    </>
  )
}
