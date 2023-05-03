import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
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
    console.log(rootRect, anchorRect)

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
          <Transition
            show={isOpen}
            className={clsx(className, 'absolute', {
              'bottom-0 left-0 origin-top-left': position === 'above-left',
              'bottom-0 right-0 origin-top-right': position === 'above-right',
              'top-0 left-0 origin-top-left': position === 'below-left',
              'top-0 right-0 origin-top-right': position === 'below-right',
            })}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            style={{ maxWidth: setMaxWidth ? anchorRect?.width : undefined }}
          >
            {children}
          </Transition>
        </div>
      </div>
    </Portal>
  )
})
