import { Popup, PopupPosition } from '../Popup/Popup.tsx'
import { Scrollable } from '../Scrollable/Scrollable.tsx'

export interface CardPopupProps {
  className?: string
  popupClassName?: string
  isOpen: boolean
  position: PopupPosition
  children: React.ReactNode
  onClose?: () => void
}

export const CardPopup: React.FC<CardPopupProps> = ({
  className,
  popupClassName,
  isOpen,
  position,
  children,
  onClose,
}) => {
  return (
    <Popup
      className={className}
      popupClassName={popupClassName}
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
