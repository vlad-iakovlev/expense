import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

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
  isOpen: boolean
  position: PopupPosition
  children: React.ReactNode
  onClose?: () => void
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void
}

export const Popup: React.FC<PopupProps> = ({
  className,
  popupClassName,
  isOpen,
  position,
  children,
  onClose,
  onPointerDown,
}) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !onClose) return

    const handleClick = (event: MouseEvent) => {
      if (!popupRef.current?.contains(event.target as Node)) {
        event.stopPropagation()
        onClose()
      }
    }

    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [isOpen, onClose])

  return (
    <div className={twMerge('relative z-10', className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            className={twMerge(
              'absolute',
              position === 'above-left' && 'bottom-0 left-0',
              position === 'above-right' && 'bottom-0 right-0',
              position === 'below-left' && 'top-0 left-0',
              position === 'below-right' && 'top-0 right-0',
              popupClassName
            )}
            initial="closed"
            animate="opened"
            exit="closed"
            variants={variants}
            onPointerDown={onPointerDown}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
