import { clsx } from 'clsx'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import {
  CSSProperties,
  ReactNode,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Portal } from '../Portal/Portal.tsx'

const variants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    pointerEvents: 'auto',
    transition: { ease: 'easeOut', duration: 0.1 },
  },

  closed: {
    opacity: 0,
    scale: 0.95,
    pointerEvents: 'none',
    transition: { ease: 'easeIn', duration: 0.075 },
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
  isOpen: boolean
  position: PopupPosition
  setMaxWidth?: boolean
  children: ReactNode
  onClose?: () => void
}

export const Popup = forwardRef<HTMLDivElement, PopupProps>(function Popup(
  { anchorRef, className, isOpen, position, setMaxWidth, children, onClose },
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [rootRect, setRootRect] = useState<DOMRect>()
  const [anchorRect, setAnchorRect] = useState<DOMRect>()

  const popupStyle = useMemo<CSSProperties>(() => {
    if (!rootRect || !anchorRect) {
      return {
        top: 0,
        left: 0,
      }
    }

    switch (position) {
      case 'above-left':
        return {
          top: anchorRect.top - rootRect.top,
          left: anchorRect.left - rootRect.left,
        }

      case 'above-right':
        return {
          top: anchorRect.top - rootRect.top,
          left: anchorRect.right - rootRect.left,
        }

      case 'below-left':
        return {
          top: anchorRect.bottom - rootRect.top,
          left: anchorRect.left - rootRect.left,
        }

      case 'below-right':
        return {
          top: anchorRect.bottom - rootRect.top,
          left: anchorRect.right - rootRect.left,
        }
    }
  }, [anchorRect, position, rootRect])

  const updateRects = useCallback(() => {
    setRootRect(rootRef.current?.getBoundingClientRect())
    setAnchorRect(anchorRef.current?.getBoundingClientRect())
  }, [anchorRef])

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onClose?.()
      }
    },
    [onClose]
  )

  useEffect(() => {
    updateRects()
    window.addEventListener('resize', updateRects, { passive: true })
    return () => window.removeEventListener('resize', updateRects)
  }, [isOpen, updateRects])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => document.addEventListener('click', handleClick), 0)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [handleClick, isOpen])

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(ref, () => rootRef.current!)

  return (
    <Portal>
      <div ref={rootRef} className="absolute z-10 top-0 left-0">
        <div className="absolute" style={popupStyle}>
          <AnimatePresence>
            <motion.div
              className={clsx(className, 'absolute', {
                'bottom-0 left-0 origin-top-left': position === 'above-left',
                'bottom-0 right-0 origin-top-right': position === 'above-right',
                'top-0 left-0 origin-top-left': position === 'below-left',
                'top-0 right-0 origin-top-right': position === 'below-right',
              })}
              animate={isOpen ? 'open' : 'closed'}
              variants={variants}
              style={{ maxWidth: setMaxWidth ? anchorRect?.width : undefined }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Portal>
  )
})
