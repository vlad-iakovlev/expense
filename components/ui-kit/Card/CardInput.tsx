import clsx from 'clsx'
import { FC, useCallback, useRef, useState } from 'react'
import { MayBePromise } from '../../../types/utility'
import { CEInput } from '../CEInput'
import { Card } from './Card'

export interface CardInputProps {
  className?: string
  name: string
  suggestions?: string[]
  value: string
  onChange: (value: string) => MayBePromise<void | string>
}

export const CardInput: FC<CardInputProps> = ({
  className,
  name,
  suggestions,
  value,
  onChange,
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = useCallback(() => setIsFocused(true), [])
  const handleBlur = useCallback(() => setIsFocused(false), [])

  return (
    <>
      <div
        ref={rootRef}
        className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors"
      >
        <div className="flex-none">{name}</div>
        <CEInput
          className={clsx(
            className,
            'flex-auto text-right font-medium truncate focus:text-clip focus:outline-none'
          )}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {suggestions?.length ? (
        <Card.Popup
          className="-mt-2"
          isOpen={isFocused}
          anchorRef={rootRef}
          position="below-right"
        >
          {suggestions.map((suggestion) => (
            <Card.Button key={suggestion} onClick={() => onChange(suggestion)}>
              {suggestion}
            </Card.Button>
          ))}
        </Card.Popup>
      ) : null}
    </>
  )
}
