import { Fragment, useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.ts'
import { CardDivider } from './CardDivider.tsx'
import { CardItem, CardItemProps } from './CardItem.tsx'
import { CardMenu } from './CardMenu.tsx'

export interface CardSelectOption<Id extends string = string> {
  type?: 'option'
  id: Id
  label: React.ReactNode
  suffix?: React.ReactNode
}

export interface CardSelectDivider<Id extends string = string> {
  type: 'divider'
  id: Id
}

export type CardSelectItem<Id extends string = string> =
  | CardSelectOption<Id>
  | CardSelectDivider<Id>

export type CardSelectProps<Id extends string = string> = Modify<
  CardItemProps,
  {
    options: CardSelectItem<Id>[]
    value: CardSelectOption<Id>
    onChange: (value: Id) => void
    onClick?: never
  }
>

export function CardSelect<Id extends string = string>({
  labelClassName,
  valueClassName,
  options,
  value,
  onChange,
  ...rest
}: CardSelectProps<Id>): React.ReactElement | null {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  const handleOptionClick = useCallback(
    (id: Id) => {
      if (id === value.id) {
        setIsOpen(false)
        return
      }

      onChange(id)
      setIsOpen(false)
    },
    [onChange, value.id],
  )

  return (
    <CardItem
      labelClassName={twMerge('flex-none', labelClassName)}
      valueClassName={twMerge(
        'flex-auto min-w-0 text-right font-medium truncate',
        valueClassName,
      )}
      value={value.label}
      menu={
        <CardMenu
          popupClassName="max-w-full -mt-2 pl-4 sm:pl-6 pb-8"
          isOpen={isOpen}
          position="below-right"
          onClose={handleClose}
        >
          {options.map((option) => (
            <Fragment key={option.id}>
              {option.type === 'divider' && <CardDivider />}
              {(!option.type || option.type === 'option') && (
                <CardItem
                  key={option.id}
                  label={option.label}
                  suffix={option.suffix}
                  role="menuitem"
                  onClick={() => handleOptionClick(option.id)}
                />
              )}
            </Fragment>
          ))}
        </CardMenu>
      }
      aria-haspopup="true"
      aria-expanded={isOpen ? 'true' : 'false'}
      aria-disabled="false"
      onClick={isOpen ? undefined : handleOpen}
      {...rest}
    />
  )
}
