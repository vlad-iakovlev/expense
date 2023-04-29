import { Transition } from '@headlessui/react'
import { FC } from 'react'
import { Portal } from '../Portal/Portal.tsx'

interface OverlayProps {
  isVisible: boolean
}

export const Overlay: FC<OverlayProps> = ({ isVisible }) => {
  return (
    <Portal>
      <Transition
        show={isVisible}
        className="fixed z-50 inset-0 bg-zinc-500"
        enter="transition ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-75"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-75"
        leaveTo="opacity-0"
      />
    </Portal>
  )
}
