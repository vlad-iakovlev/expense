import { Popup, PopupProps } from '../Popup/Popup.tsx'
import { Scrollable } from '../Scrollable/Scrollable.tsx'

export type CardMenuProps = PopupProps

export const CardMenu = ({ children, ...rest }: CardMenuProps) => {
  return (
    <Popup popupRole="menu" {...rest}>
      <Scrollable
        className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        contentClassName="max-h-64 py-2 -mx-px px-px"
      >
        {children}
      </Scrollable>
    </Popup>
  )
}
