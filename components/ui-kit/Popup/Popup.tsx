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
    if (!anchorRect) return {}

    const translateX = isRight
      ? `calc(${anchorRect.right}px - 100%)`
      : `${anchorRect.left}px`

    const translateY = isAbove
      ? `calc(${anchorRect.top}px - 100%)`
      : `${anchorRect.bottom}px`

    return {
      transform: `translate(${translateX}, ${translateY})`,
      ...(fullMaxWidth && { maxWidth: anchorRect.width }),
      ...(fullWidth && { width: anchorRect.width }),
    }
  }, [anchorRect, fullMaxWidth, fullWidth, isAbove, isRight])

  const rootStyle = useMemo<MotionStyle>(() => {
    if (!anchorRect) return {}

    return {
      originX: `${isRight ? anchorRect.right : anchorRect.left}px`,
      originY: `${isAbove ? anchorRect.top : anchorRect.bottom}px`,
    }
  }, [anchorRect, isAbove, isRight])

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

            <div className={className} style={popupStyle}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
