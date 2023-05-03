import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { FC } from 'react'
import { Button } from '../Button/Button.tsx'
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

export interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  action: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  action,
  onConfirm,
  onCancel,
}) => {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <motion.div
                key="backdrop"
                className="fixed inset-0 bg-zinc-500"
                initial="initial"
                animate="enterTo"
                exit="exitTo"
                variants={backdropVariants}
                onClick={onCancel}
              />

              <motion.div
                key="dialog"
                className="relative overflow-hidden sm:w-full sm:max-w-lg sm:my-8 rounded-lg bg-white text-center sm:text-left shadow-xl"
                initial="initial"
                animate="enterTo"
                exit="exitTo"
                variants={dialogVariants}
              >
                <div className="sm:flex sm:items-start px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex-none flex items-center justify-center w-12 sm:w-10 h-12 sm:h-10 mx-auto sm:mx-0 rounded-full bg-red-100">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <h3 className="text-lg font-medium leading-6">{title}</h3>
                    <p className="mt-2 text-sm text-zinc-600">{description}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row-reverse px-4 sm:px-6 py-3 gap-3 bg-zinc-50">
                  <Button theme="error" onClick={onConfirm}>
                    {action}
                  </Button>
                  <Button theme="secondary" onClick={onCancel}>
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
