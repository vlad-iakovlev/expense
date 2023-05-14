import { AnimatePresence, Variants, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { Portal } from '../Portal/Portal.tsx'

const backdropVariants: Variants = {
  opened: {
    opacity: 0.75,
    transition: { duration: 0.3 },
  },

  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const dialogVariants: Variants = {
  opened: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },

  closed: {
    opacity: 0,
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
          <div className="fixed z-40 inset-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] overflow-y-auto">
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-zinc-500"
              initial="closed"
              animate="opened"
              exit="closed"
              variants={backdropVariants}
              onClick={onClose}
            />

            <div className="flex min-h-full items-end sm:items-center justify-center p-4">
              <motion.div
                key="dialog"
                className="relative overflow-hidden w-full max-w-lg sm:my-8 rounded-lg bg-white shadow-xl"
                initial="closed"
                animate="opened"
                exit="closed"
                variants={dialogVariants}
              >
                {children}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
