import { FocusTrap } from 'focus-trap-react'
import { AnimatePresence, Variants, easeInOut, motion } from 'framer-motion'
import React from 'react'
import { Portal } from './Portal'

const rootVariants: Variants = {
  opened: {
    opacity: 1,
    transition: { duration: 0.3, ease: easeInOut },
  },

  closed: {
    opacity: 0,
    transition: { duration: 0.2, ease: easeInOut },
  },
}

const dialogVariants: Variants = {
  opened: {
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: easeInOut },
  },

  closed: {
    y: 16,
    scale: 0.95,
    transition: { duration: 0.2, ease: easeInOut },
  },
}

export interface DialogProps {
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
}

export const Dialog = ({ isOpen, children, onClose }: DialogProps) => {
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial="closed"
            animate="opened"
            exit="closed"
            role="dialog"
            variants={rootVariants}
          >
            <div
              className="absolute inset-0 bg-zinc-500/75 dark:bg-zinc-900/75"
              onClick={onClose}
            />

            <div className="flex min-h-full items-end justify-center overflow-y-auto pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] sm:items-center">
              <FocusTrap>
                <motion.div
                  className="relative m-4 w-full max-w-lg overflow-hidden rounded-lg bg-secondary-background shadow-xl sm:my-8"
                  initial="closed"
                  animate="opened"
                  exit="closed"
                  variants={dialogVariants}
                >
                  {children}
                </motion.div>
              </FocusTrap>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
