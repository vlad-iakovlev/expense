import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useIsBrowser } from '../../../hooks/useIsBrowser.ts'

export interface PortalProps {
  children: ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const isBrowser = useIsBrowser()

  if (!isBrowser) {
    return null
  }

  return createPortal(children, document.body)
}
