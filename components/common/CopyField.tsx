import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useCallback, useEffect, useState } from 'react'

type CopyFieldProps = {
  value: string
}

export const CopyField = ({ value }: CopyFieldProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(() => {
    void (async () => {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
    })()
  }, [value])

  useEffect(() => {
    if (isCopied) {
      const timerId = setTimeout(() => {
        setIsCopied(false)
      }, 2000)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [isCopied])

  return (
    <button
      className="relative mx-auto h-9 max-w-full cursor-pointer truncate rounded-md bg-tertiary-background py-1.5 pr-12 pl-3 shadow-xs ring-1 ring-black/5"
      type="button"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
    >
      {value}
      <div className="absolute top-2 right-3 h-5 w-5">
        {isCopied ? (
          <CheckIcon className="text-green-700 dark:text-green-500" />
        ) : (
          <DocumentDuplicateIcon />
        )}
      </div>
    </button>
  )
}
