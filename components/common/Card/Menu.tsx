import { Popup, PopupProps } from '../Popup/index.jsx'
import { Scrollable } from '../Scrollable/index.jsx'

export type CardMenuProps = PopupProps

export const CardMenu = ({ children, ...rest }: CardMenuProps) => (
  <Popup popupRole="menu" {...rest}>
    <Scrollable
      className="bg-secondary border-primary rounded-md border shadow-lg"
      contentClassName="max-h-64 py-2 -mx-px px-px"
    >
      {children}
    </Scrollable>
  </Popup>
)
