import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

const variants: Variants = {
  opened: {
    opacity: 1,
    transition: { duration: 0.2 },
  },

  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

interface Props {
  className?: string
  value: boolean
  onChange: (value: boolean) => void
}

export const Switch: React.FC<Props> = ({ value, onChange }) => {
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      onChange(!value)
    },
    [onChange, value]
  )

  return (
    <div
      className={twMerge(
        'relative w-12 h-12 -m-3 transition-colors',
        value
          ? 'text-zinc-700'
          : 'text-zinc-400 hover:text-zinc-700 active:text-zinc-700'
      )}
      tabIndex={0}
      role="button"
      onClick={handleClick}
    >
      <AnimatePresence>
        {value ? (
          <motion.div
            key="enabled"
            className="absolute inset-0 flex items-center justify-center"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={variants}
          >
            <EyeIcon className="w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div
            key="disabled"
            className="absolute inset-0 flex items-center justify-center"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={variants}
          >
            <EyeSlashIcon className="w-6 h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
