import { Popup, PopupProps } from '../Popup/Popup.jsx'
import { Scrollable } from '../Scrollable/Scrollable.jsx'

export type CardMenuProps = PopupProps

export const CardMenu = ({ children, ...rest }: CardMenuProps) => {
  return (
    <Popup popupRole="menu" {...rest}>
      <Scrollable
        className="bg-secondary rounded-md border border-zinc-200 shadow-lg dark:border-zinc-700"
        contentClassName="max-h-64 py-2 -mx-px px-px"
      >
        {children}
      </Scrollable>
    </Popup>
  )
}
