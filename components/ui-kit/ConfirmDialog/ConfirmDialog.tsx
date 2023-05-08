import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'
import { Button } from '../Button/Button.tsx'
import { Card } from '../Card/Card.tsx'
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
      <Card>
        <Card.Title
          title={title}
          actions={
            <div className="flex-none flex items-center justify-center -my-1 w-10 h-10 rounded-full bg-red-100">
              <ExclamationTriangleIcon
                className="w-6 h-6 text-red-700"
                aria-hidden="true"
              />
            </div>
          }
        />
        <Card.Divider />
        <Card.Block className="flex items-center">{description}</Card.Block>
        <Card.Divider />
        <Card.Footer>
          <Button theme="error" onClick={onConfirm}>
            {action}
          </Button>
          <Button theme="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Card.Footer>
      </Card>
    </Dialog>
  )
}
