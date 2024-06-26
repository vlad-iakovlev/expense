import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface CopyFieldProps {
  value: string
}

export const CopyField = ({ value }: CopyFieldProps) => {
  const [isCopied, setIsCopied] = React.useState(false)

  const handleCopy = React.useCallback(() => {
    void (async () => {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
    })()
  }, [value])

  React.useEffect(() => {
    if (isCopied) {
      const timerId = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timerId)
    }
  }, [isCopied])

  return (
    <button
      className="bg-tertiary relative mx-auto h-9 max-w-full cursor-pointer truncate rounded-md py-1.5 pl-3 pr-12 shadow-sm ring-1 ring-black ring-opacity-5"
      type="button"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
    >
      {value}
      <div className="absolute right-3 top-2 h-5 w-5">
        {isCopied ? (
          <CheckIcon className="text-green-700 dark:text-green-500" />
        ) : (
          <DocumentDuplicateIcon />
        )}
      </div>
    </button>
  )
}
