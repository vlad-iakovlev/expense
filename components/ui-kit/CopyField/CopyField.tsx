import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useCallback, useEffect, useState } from 'react'

interface CopyFieldProps {
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
      const timerId = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timerId)
    }
  }, [isCopied])

  return (
    <button
      className="relative max-w-full h-9 mx-auto py-1.5 pl-3 pr-12 truncate cursor-pointer rounded-md bg-zinc-100 shadow-sm ring-1 ring-black ring-opacity-5"
      type="button"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
    >
      {value}
      <div className="absolute top-2 right-3 w-5 h-5">
        {isCopied ? (
          <CheckIcon className="text-green-700" />
        ) : (
          <DocumentDuplicateIcon />
        )}
      </div>
    </button>
  )
}
