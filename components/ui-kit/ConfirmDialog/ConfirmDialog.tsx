import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
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

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
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
        <Card.Block>{description}</Card.Block>
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
