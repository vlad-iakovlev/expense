import { Popup, PopupPosition } from '../Popup/Popup.tsx'
import { Scrollable } from '../Scrollable/Scrollable.tsx'

export interface CardPopupProps {
  className?: string
  popupClassName?: string
  isOpen: boolean
  position: PopupPosition
  children: React.ReactNode
  ariaLabel?: string
  onClose?: () => void
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void
}

export const CardPopup = ({
  className,
  popupClassName,
  isOpen,
  position,
  children,
  ariaLabel,
  onClose,
  onPointerDown,
}: CardPopupProps) => {
  return (
    <Popup
      className={className}
      popupClassName={popupClassName}
      isOpen={isOpen}
      position={position}
      ariaLabel={ariaLabel}
      role="menu"
      onClose={onClose}
      onPointerDown={onPointerDown}
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
