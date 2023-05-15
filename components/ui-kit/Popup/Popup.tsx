import { AnimatePresence, MotionStyle, Variants, motion } from 'framer-motion'
import {
  CSSProperties,
  FC,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { Portal } from '../Portal/Portal.tsx'

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
  anchorRef: RefObject<HTMLElement>
  className?: string
  fullMaxWidth?: boolean
  fullWidth?: boolean
  isOpen: boolean
  position: PopupPosition
  children: ReactNode
  onClose?: () => void
}

export const Popup: FC<PopupProps> = ({
  anchorRef,
  className,
  fullMaxWidth,
  fullWidth,
  isOpen,
  position,
  children,
  onClose,
}) => {
  const [anchorRect, setAnchorRect] = useState<DOMRect>()

  const isAbove = position === 'above-left' || position === 'above-right'
  const isRight = position === 'above-right' || position === 'below-right'

  const popupStyle = useMemo<CSSProperties>(() => {
    if (!anchorRect) return { top: 0, left: 0 }

    return {
      top: isAbove ? anchorRect.top : anchorRect.bottom,
      left: isRight ? anchorRect.right : anchorRect.left,
      ...(fullMaxWidth && { maxWidth: anchorRect.width }),
      ...(fullWidth && { width: anchorRect.width }),
    }
  }, [anchorRect, fullMaxWidth, fullWidth, isAbove, isRight])

  const rootStyle = useMemo<MotionStyle>(
    () => ({
      originX: `${popupStyle.left ?? 0}px`,
      originY: `${popupStyle.top ?? 0}px`,
    }),
    [popupStyle]
  )

  useEffect(() => {
    if (isOpen) {
      const updateRects = () => {
        setAnchorRect(anchorRef.current?.getBoundingClientRect())
      }

      updateRects()
      window.addEventListener('resize', updateRects, { passive: true })
      window.addEventListener('scroll', updateRects, { passive: true })

      return () => {
        window.removeEventListener('resize', updateRects)
        window.removeEventListener('scroll', updateRects)
      }
    }
  }, [anchorRef, isOpen])

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-20 inset-0"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={variants}
            style={rootStyle}
          >
            <div className="absolute inset-0" onClick={onClose} />

            <div
              className={twMerge(
                'absolute transform',
                isAbove && '-translate-y-full',
                isRight && '-translate-x-full',
                className
              )}
              style={popupStyle}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
