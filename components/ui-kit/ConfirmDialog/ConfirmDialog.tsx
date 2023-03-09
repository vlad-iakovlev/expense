import { Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { FC, Fragment } from 'react'
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
      <Transition.Root className="absolute z-20" show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="sm:flex sm:items-start px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-white">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    className="h-6 w-6 text-red-700"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
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
        </div>
      </Transition.Root>
    </Portal>
  )
}
