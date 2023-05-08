import { AnimatePresence, Variants, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { Portal } from '../Portal/Portal.tsx'

const enterTransition = { ease: 'easeOut', duration: 0.3 }
const exitTransition = { ease: 'easeIn', duration: 0.2 }

const backdropVariants: Variants = {
  initial: {
    opacity: 0,
  },

  enterTo: {
    opacity: 0.75,
    transition: enterTransition,
  },

  exitTo: {
    opacity: 0,
    transition: exitTransition,
  },
}

const dialogVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.95,
  },

  enterTo: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: enterTransition,
  },

  exitTo: {
    opacity: 0,
    y: 16,
    scale: 0.95,
    transition: exitTransition,
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
          <div className="fixed z-20 inset-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] overflow-y-auto">
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-zinc-500"
              initial="initial"
              animate="enterTo"
              exit="exitTo"
              variants={backdropVariants}
              onClick={onClose}
            />

            <div className="flex min-h-full items-end sm:items-center justify-center p-4">
              <motion.div
                key="dialog"
                className="relative overflow-hidden w-full max-w-lg sm:my-8 rounded-lg bg-white shadow-xl"
                initial="initial"
                animate="enterTo"
                exit="exitTo"
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
