import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import {
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
import { Scrollable } from '../Scrollable/Scrollable.tsx'

export interface CardPopupProps {
  className?: string
  noMaxWidth?: boolean
  isOpen: boolean
  anchorRef: RefObject<HTMLElement>
  position: 'above-left' | 'above-right' | 'below-left' | 'below-right'
  children: ReactNode
  onClose?: () => void
}

export const CardPopup = forwardRef<HTMLDivElement, CardPopupProps>(
  function CardPopup(
    { className, noMaxWidth, isOpen, anchorRef, position, children, onClose },
    ref
  ) {
    const rootRef = useRef<HTMLDivElement>(null)
    const [scroll, setScroll] = useState<{ top: number; left: number }>()
    const [anchorRect, setAnchorRect] = useState<DOMRect>()

    const portalStyle = useMemo(() => {
      if (!scroll || !anchorRect) {
        return {
          top: 0,
          left: 0,
        }
      }

      switch (position) {
        case 'above-left':
          return {
            top: anchorRect.top + scroll.top,
            left: anchorRect.left + scroll.left,
          }

        case 'above-right':
          return {
            top: anchorRect.top + scroll.top,
            left: anchorRect.right + scroll.left,
          }

        case 'below-left':
          return {
            top: anchorRect.bottom + scroll.top,
            left: anchorRect.left + scroll.left,
          }

        case 'below-right':
          return {
            top: anchorRect.bottom + scroll.top,
            left: anchorRect.right + scroll.left,
          }
      }
    }, [anchorRect, position, scroll])

    const updateRects = useCallback(() => {
      setScroll({
        top: document.documentElement.scrollTop,
        left: document.documentElement.scrollLeft,
      })
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
      if (isOpen) {
        updateRects()
        window.addEventListener('resize', updateRects, { passive: true })
        return () => window.removeEventListener('resize', updateRects)
      }
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
        <div ref={rootRef} className="absolute z-10" style={portalStyle}>
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
            style={{ maxWidth: noMaxWidth ? undefined : anchorRect?.width }}
          >
            <Scrollable
              className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              contentClassName="max-h-64 py-2 -mx-px px-px"
            >
              {children}
            </Scrollable>
          </Transition>
        </div>
      </Portal>
    )
  }
)
