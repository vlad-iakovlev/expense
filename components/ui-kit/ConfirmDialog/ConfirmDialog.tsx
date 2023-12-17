import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { Button } from '../Button/Button.jsx'
import { Card } from '../Card/Card.jsx'
import { Dialog } from '../Dialog/Dialog.jsx'

export interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  action: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  action,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={onCancel}>
      <Card>
        <Card.Title
          title={title}
          actions={
            <div
              className="-my-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-red-100 dark:bg-red-800"
              aria-hidden="true"
            >
              <ExclamationTriangleIcon className="h-6 w-6 text-red-700 dark:text-zinc-100" />
            </div>
          }
          tabIndex={0}
          aria-disabled="true"
        />
        <Card.Divider />
        <Card.Block tabIndex={0} aria-disabled="true">
          {description}
        </Card.Block>
        <Card.Divider />
        <Card.Footer>
          <Button size="md" theme="red" onClick={onConfirm}>
            {action}
          </Button>
          <Button size="md" theme="white" onClick={onCancel}>
            Cancel
          </Button>
        </Card.Footer>
      </Card>
    </Dialog>
  )
}
