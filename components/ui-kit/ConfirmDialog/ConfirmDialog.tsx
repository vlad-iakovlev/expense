import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'
import { Button } from '../Button/Button.tsx'
import { Dialog } from '../Dialog/Dialog.tsx'

export interface ConfirmDialogProps {
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
    <Dialog isOpen={isOpen} onClose={onCancel}>
      <div className="sm:flex sm:items-start px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center sm:text-left">
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
    </Dialog>
  )
}
