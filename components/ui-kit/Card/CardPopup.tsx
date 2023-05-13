import { ReactNode, RefObject, forwardRef } from 'react'
import { Popup, PopupPosition } from '../Popup/Popup.tsx'
import { Scrollable } from '../Scrollable/Scrollable.tsx'

export interface CardPopupProps {
  anchorRef: RefObject<HTMLElement>
  className?: string
  fullMaxWidth?: boolean
  fullWidth?: boolean
  isOpen: boolean
  position: PopupPosition
  children: ReactNode
  onClose?: () => void
}

export const CardPopup = forwardRef<HTMLDivElement, CardPopupProps>(
  function CardPopup(
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
    return (
      <Popup
        ref={ref}
        anchorRef={anchorRef}
        className={className}
        fullMaxWidth={fullMaxWidth}
        fullWidth={fullWidth}
        isOpen={isOpen}
        position={position}
        onClose={onClose}
      >
        <Scrollable
          className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
          contentClassName="max-h-64 py-2 -mx-px px-px"
        >
          {children}
        </Scrollable>
      </Popup>
    )
  }
)
