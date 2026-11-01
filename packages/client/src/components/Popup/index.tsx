import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Presence, usePresence } from '../Presence'
import { useMenuNavigation } from './useMenuNavigation'

const POPUP_DURATION = { enter: 150, exit: 150 }

export type PopupPosition =
  'above-left' | 'above-right' | 'below-left' | 'below-right'

export type PopupProps = {
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
      <Presence duration={POPUP_DURATION} present={isOpen}>
        <PopupPanel
          popupRef={popupRef}
          popupClassName={popupClassName}
          position={position}
          popupRole={popupRole}
          popupAriaLabel={popupAriaLabel}
        >
          {children}
        </PopupPanel>
      </Presence>
    </div>
  )
}

type PopupPanelProps = {
  popupRef: React.RefObject<HTMLDivElement | null>
  popupClassName?: string
  position: PopupPosition
  popupRole?: string
  popupAriaLabel?: string
  children: React.ReactNode
}

const PopupPanel = ({
  popupRef,
  popupClassName,
  position,
  popupRole,
  popupAriaLabel,
  children,
}: PopupPanelProps) => {
  const presence = usePresence()

  return (
    <div
      ref={popupRef}
      className={twMerge(
        'pointer-events-auto absolute',
        position === 'above-left' && 'bottom-0 left-0',
        position === 'above-right' && 'right-0 bottom-0',
        position === 'below-left' && 'top-0 left-0',
        position === 'below-right' && 'top-0 right-0',
        'scale-95 opacity-0 transition-[scale,opacity] data-[state=open]:scale-100 data-[state=open]:opacity-100',
        popupClassName,
      )}
      style={presence.transitionStyle}
      data-state={presence.state}
      aria-label={popupAriaLabel}
      role={popupRole}
    >
      {children}
    </div>
  )
}
