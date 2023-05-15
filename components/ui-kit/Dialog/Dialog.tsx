import { AnimatePresence, Variants, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { Portal } from '../Portal/Portal.tsx'

const rootVariants: Variants = {
  opened: {
    opacity: 1,
    transition: { duration: 0.3 },
  },

  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const dialogVariants: Variants = {
  opened: {
    y: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },

  closed: {
    y: 16,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

export interface DialogProps {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
}

export const Dialog: FC<DialogProps> = ({ isOpen, children, onClose }) => {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-40 inset-0"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={rootVariants}
          >
            <div
              className="absolute inset-0 bg-zinc-500 bg-opacity-75"
              onClick={onClose}
            />

            <div className="flex min-h-full items-end sm:items-center justify-center overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
              <motion.div
                className="relative overflow-hidden w-full max-w-lg m-4 sm:my-8 rounded-lg bg-white shadow-xl"
                initial="closed"
                animate="opened"
                exit="closed"
                variants={dialogVariants}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
