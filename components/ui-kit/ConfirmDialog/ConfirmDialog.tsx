import { Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'
import { Button } from '../Button'
import { Portal } from '../Portal'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  action: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  action,
  onConfirm,
  onCancel,
}) => {
  return (
    <Portal>
      <Transition
        appear
        className="fixed z-20 inset-0 overflow-y-auto"
        show={isOpen}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            className="fixed inset-0 bg-zinc-500"
            enter="transition ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-75"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-75"
            leaveTo="opacity-0"
            onClick={onCancel}
          />

          <Transition.Child
            className="relative overflow-hidden sm:w-full sm:max-w-lg sm:my-8 rounded-lg bg-white text-center sm:text-left shadow-xl"
            enter="transition-all ease-out duration-300"
            enterFrom="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="transform opacity-100 translate-y-0 sm:scale-100"
            leave="transition-all ease-in duration-200"
            leaveFrom="transform opacity-100 translate-y-0 sm:scale-100"
            leaveTo="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="sm:flex sm:items-start px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex-none flex items-center justify-center w-12 sm:w-10 h-12 sm:h-10 mx-auto sm:mx-0 rounded-full bg-red-100">
                <ExclamationTriangleIcon
                  className="h-6 w-6 text-red-700"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <h3 className="text-lg font-medium leading-6">{title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{description}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row-reverse px-4 sm:px-6 py-3 gap-3 bg-zinc-50">
              <Button theme="error" onClick={onConfirm}>
                {action}
              </Button>
              <Button theme="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </Portal>
  )
}
