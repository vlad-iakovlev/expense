import { AnimatePresence, Variants, motion } from 'framer-motion'
import {
  CSSProperties,
  ReactNode,
  RefObject,
  forwardRef,
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

export const Popup = forwardRef<HTMLDivElement, PopupProps>(function Popup(
  {
    anchorRef,
    className,
    fullMaxWidth,
    fullWidth,
    isOpen,
    position,
    children,
    onClose,
  },
  ref
) {
  const [anchorRect, setAnchorRect] = useState<DOMRect>()

  const popupStyle = useMemo<CSSProperties>(() => {
    if (!anchorRect) return { top: 0, left: 0 }

    const scrollTop = document.documentElement.scrollTop
    const scrollLeft = document.documentElement.scrollLeft

    switch (position) {
      case 'above-left':
        return {
          top: anchorRect.top + scrollTop,
          left: anchorRect.left + scrollLeft,
        }

      case 'above-right':
        return {
          top: anchorRect.top + scrollTop,
          left: anchorRect.right + scrollLeft,
        }

      case 'below-left':
        return {
          top: anchorRect.bottom + scrollTop,
          left: anchorRect.left + scrollLeft,
        }

      case 'below-right':
        return {
          top: anchorRect.bottom + scrollTop,
          left: anchorRect.right + scrollLeft,
        }
    }
  }, [anchorRect, position])

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
      <div ref={ref} className="absolute z-20 top-0 left-0" style={popupStyle}>
        <AnimatePresence>
          {isOpen && (
            <>
              <div className="fixed inset-0" onClick={onClose} />

              <motion.div
                key="popup"
                className={twMerge(
                  'absolute',
                  position === 'above-left' && 'bottom-0 left-0',
                  position === 'above-right' && 'bottom-0 right-0',
                  position === 'below-left' && 'top-0 left-0',
                  position === 'below-right' && 'top-0 right-0',
                  className
                )}
                initial="closed"
                animate="opened"
                exit="closed"
                variants={variants}
                style={{
                  maxWidth: fullMaxWidth ? anchorRect?.width : undefined,
                  width: fullWidth ? anchorRect?.width : undefined,
                }}
              >
                {children}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Portal>
  )
})
