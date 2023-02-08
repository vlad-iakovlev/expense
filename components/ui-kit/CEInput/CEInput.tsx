import {
  FC,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { MayBePromise } from '../../../types/utility'

export interface CEInputProps {
  className?: string
  value: string
  onChange: (value: string) => MayBePromise<string | void>
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void
}

export const CEInput: FC<CEInputProps> = ({
  className,
  value,
  onChange,
  onFocus,
  onBlur,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleChange = useCallback(async () => {
    const inputValue = ref.current?.textContent?.trim()
    const newValue =
      !inputValue || inputValue === value ? value : await onChange(inputValue)

    if (ref.current && newValue) {
      ref.current.textContent = newValue
    }
  }, [onChange, ref, value])

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
    async (event: FocusEvent<HTMLDivElement>) => {
      onBlur?.(event)
      event.currentTarget.scrollLeft = 0
      await handleChange()
    },
    [onBlur, handleChange]
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = value
    }
  }, [ref, value])

  return (
    <div
      ref={ref}
      className={className}
      contentEditable
      suppressContentEditableWarning
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={handleBlur}
    />
  )
}
