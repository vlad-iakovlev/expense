import { Popup, PopupProps } from '../Popup/index'
import { Scrollable } from '../Scrollable/index'

export type CardMenuProps = PopupProps

export const CardMenu = ({ children, ...rest }: CardMenuProps) => (
  <Popup popupRole="menu" {...rest}>
    <Scrollable
      className="rounded-md border border-primary-border bg-secondary-background shadow-lg"
      contentClassName="max-h-64 py-2 -mx-px px-px"
    >
      {children}
    </Scrollable>
  </Popup>
)
