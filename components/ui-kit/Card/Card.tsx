import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import {
  FocusEvent,
  forwardRef,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useState,
} from 'react'
import { ForwardRef, MayBePromise } from '../../../types/utility'

export interface CardProps {
  className?: string
  children?: ReactNode
}

export interface CardTitleProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export interface CardButtonProps {
  disabled?: boolean
  start?: ReactNode
  end?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent) => void
}

export interface CardInputProps {
  name: string
  value: string
  onChange: (value: string) => MayBePromise<void>
}

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

type CardType = ForwardRef<HTMLDivElement, CardProps> & {
  Title: ForwardRef<HTMLDivElement, CardTitleProps>
  Button: ForwardRef<HTMLButtonElement, CardButtonProps>
  Input: ForwardRef<HTMLDivElement, CardInputProps>
  Select: ForwardRef<HTMLDivElement, CardSelectProps>
  Divider: ForwardRef<HTMLDivElement>
}

export const Card = forwardRef(function Card({ className, children }, ref) {
  return (
    <div
      ref={ref}
      className={clsx(
        className,
        'py-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-shadow'
      )}
    >
      {children}
    </div>
  )
}) as CardType

Card.Title = forwardRef(function CardTitle({ title, subtitle, action }, ref) {
  return (
    <div
      ref={ref}
      className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3"
    >
      <div className="flex-auto min-w-0 flex flex-col justify-center gap-1">
        <h2 className="flex-none text-lg font-medium leading-6 truncate">
          {title}
        </h2>
        {subtitle && (
          <p className="flex-none text-sm text-zinc-600 truncate">{subtitle}</p>
        )}
      </div>
      {action ? <div className="flex-none">{action}</div> : null}
    </div>
  )
})

Card.Button = forwardRef(function CardButton(
  { disabled, start, end, children, onClick },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        'flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors',
        { 'pointer-events-none': disabled }
      )}
      type="button"
      onClick={onClick}
    >
      {start ? <div className="flex-none">{start}</div> : null}
      <div className="flex-auto truncate">{children}</div>
      {end ? <div className="flex-none">{end}</div> : null}
    </button>
  )
})

Card.Input = forwardRef(function CardInput({ name, value, onChange }, ref) {
  const [isSaving, setIsSaving] = useState(false)

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLHeadingElement>) => {
      switch (event.key) {
        case 'Enter':
          event.preventDefault()
          event.currentTarget.blur()
          break
        case 'Escape':
          event.preventDefault()
          event.currentTarget.textContent = value
          event.currentTarget.blur()
          break
      }
    },
    [value]
  )

  const handleBlur = useCallback(
    async (event: FocusEvent<HTMLHeadingElement>) => {
      event.currentTarget.scrollLeft = 0

      const newValue = event.currentTarget.textContent?.trim()

      if (!newValue || newValue === value) {
        event.currentTarget.textContent = value
        return
      }

      try {
        setIsSaving(true)
        await onChange(newValue)
      } finally {
        setIsSaving(false)
      }
    },
    [onChange, value]
  )

  return (
    <div
      ref={ref}
      className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors"
    >
      <div className="flex-none">{name}</div>
      <div
        className="flex-auto text-right font-medium truncate focus:text-clip focus:outline-none"
        contentEditable={!isSaving}
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      >
        {value}
      </div>
    </div>
  )
})

Card.Select = forwardRef(function CardSelect(
  { name, options, value, onChange },
  ref
) {
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      if (option.id === value.id) return

      try {
        setIsSaving(true)
        await onChange(option)
      } finally {
        setIsSaving(false)
      }
    },
    [onChange, value.id]
  )

  return (
    <Menu ref={ref} as="div" className="relative">
      <Menu.Button className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors">
        <div className="flex-none">{name}</div>
        <div className="flex-auto text-right font-medium truncate">
          {value.name}
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 max-w-full -mt-2 z-10 origin-top-right focus:outline-none">
          <Card>
            {options.map((option) => (
              <Menu.Item
                as={Card.Button}
                key={option.id}
                disabled={isSaving}
                onClick={() => handleChange(option)}
              >
                {option.name}
              </Menu.Item>
            ))}
          </Card>
        </Menu.Items>
      </Transition>
    </Menu>
  )
})

Card.Divider = forwardRef(function CardDivider({}, ref) {
  return <div ref={ref} className="my-2 border-t border-zinc-200" />
})
