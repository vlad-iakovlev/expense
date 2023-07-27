import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useMenuNavigation } from './useMenuNavigation.ts'

const variants: Variants = {
  opened: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.15 },
  },

  closed: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.1 },
  },
}

export type PopupPosition =
  | 'above-left'
  | 'above-right'
  | 'below-left'
  | 'below-right'

export interface PopupProps {
  className?: string
  popupClassName?: string
  popupRole?: string
  popupAriaLabel?: string
  isOpen: boolean
  position: PopupPosition
  children: React.ReactNode
  onClose?: () => void
}

export const Popup = ({
  className,
  popupClassName,
  popupRole,
  popupAriaLabel,
  isOpen,
  position,
  children,
  onClose,
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useMenuNavigation({
    popupRef,
    isOpen,
    onClose,
  })

  return (
    <div className={twMerge('relative z-10', className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            className={twMerge(
              'absolute pointer-events-auto',
              position === 'above-left' && 'bottom-0 left-0',
              position === 'above-right' && 'bottom-0 right-0',
              position === 'below-left' && 'top-0 left-0',
              position === 'below-right' && 'top-0 right-0',
              popupClassName,
            )}
            initial="closed"
            animate="opened"
            exit="closed"
            variants={variants}
            aria-label={popupAriaLabel}
            role={popupRole}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
