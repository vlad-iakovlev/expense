import { Popup, PopupProps } from '../Popup/Popup.jsx'
import { Scrollable } from '../Scrollable/Scrollable.jsx'

export type CardMenuProps = PopupProps

export const CardMenu = ({ children, ...rest }: CardMenuProps) => {
  return (
    <Popup popupRole="menu" {...rest}>
      <Scrollable
        className="bg-secondary rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        contentClassName="max-h-64 py-2 -mx-px px-px"
      >
        {children}
      </Scrollable>
    </Popup>
  )
}
