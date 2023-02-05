import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import {
  FC,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { Card } from './Card'

export interface CardPopupProps {
  className?: string
  noMaxWidth?: boolean
  isOpen: boolean
  anchorRef: RefObject<HTMLElement>
  position: 'above-left' | 'above-right' | 'below-left' | 'below-right'
  children: ReactNode
  onClose?: () => void
}

export const CardPopup: FC<CardPopupProps> = ({
  className,
  noMaxWidth,
  isOpen,
  anchorRef,
  position,
  children,
  onClose,
}) => {
  const [anchorRect, setAnchorRect] = useState<DOMRect>()

  const portalStyle = useMemo(() => {
    switch (position) {
      case 'above-left':
        return {
          top: anchorRect?.top,
          left: anchorRect?.left,
        }

      case 'above-right':
        return {
          top: anchorRect?.top,
          left: anchorRect?.right,
        }

      case 'below-left':
        return {
          top: anchorRect?.bottom,
          left: anchorRect?.left,
        }

      case 'below-right':
        return {
          top: anchorRect?.bottom,
          left: anchorRect?.right,
        }
    }
  }, [
    anchorRect?.bottom,
    anchorRect?.left,
    anchorRect?.right,
    anchorRect?.top,
    position,
  ])

  const updateRects = useCallback(() => {
    setAnchorRect(anchorRef.current?.getBoundingClientRect())
  }, [anchorRef])

  useEffect(() => {
    updateRects()
    window.addEventListener('resize', updateRects, { passive: true })
    return () => window.removeEventListener('resize', updateRects)
  }, [updateRects])

  useEffect(() => {
    if (isOpen && onClose) {
      setTimeout(() => document.addEventListener('click', onClose), 0)
      return () => document.removeEventListener('click', onClose)
    }
  }, [isOpen, onClose])

  return createPortal(
    <div className="absolute z-20" style={portalStyle}>
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
        <Card>{children}</Card>
      </Transition>
    </div>,
    document.body
  )
}
