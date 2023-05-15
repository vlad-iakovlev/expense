import { Fragment, ReactElement, ReactNode, useCallback, useState } from 'react'
import { Card } from './Card.tsx'

export interface CardSelectOption<Id extends string = string> {
  type?: 'option'
  id: Id
  label: ReactNode
  suffix?: ReactNode
}

export interface CardSelectDivider<Id extends string = string> {
  type: 'divider'
  id: Id
}

export type CardSelectItem<Id extends string = string> =
  | CardSelectOption<Id>
  | CardSelectDivider<Id>

export interface CardSelectProps<Id extends string = string> {
  prefix?: ReactNode
  suffix?: ReactNode
  label: string
  options: CardSelectItem<Id>[]
  value: CardSelectOption<Id>
  onChange: (value: Id) => void
}

export function CardSelect<Id extends string = string>({
  prefix,
  suffix,
  label,
  options,
  value,
  onChange,
}: CardSelectProps<Id>): ReactElement | null {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  const handleChange = useCallback(
    (id: Id) => {
      if (id === value.id) {
        setIsOpen(false)
        return
      }

      onChange(id)
      setIsOpen(false)
    },
    [onChange, value.id]
  )

  return (
    <>
      <button
        className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 active:bg-zinc-100 transition-colors"
        onClick={handleOpen}
      >
        {prefix ? <div className="flex-none">{prefix}</div> : null}
        <div className="flex-none">{label}</div>
        <div className="flex-auto text-right font-medium truncate">
          {value.label}
        </div>
        {suffix ? <div className="flex-none">{suffix}</div> : null}
      </button>

      <Card.Popup
        popupClassName="max-w-full -mt-2 pl-4 sm:pl-6 pb-8"
        isOpen={isOpen}
        position="below-right"
        onClose={handleClose}
      >
        {options.map((option) => (
          <Fragment key={option.id}>
            {option.type === 'divider' && <Card.Divider />}
            {(!option.type || option.type === 'option') && (
              <Card.Button
                key={option.id}
                label={option.label}
                suffix={option.suffix}
                onClick={() => handleChange(option.id)}
              />
            )}
          </Fragment>
        ))}
      </Card.Popup>
    </>
  )
}
