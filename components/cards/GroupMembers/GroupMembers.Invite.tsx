import { CheckIcon } from '@heroicons/react/24/solid'
import { useCallback, useState } from 'react'
import { createInvite } from '../../../api/client/invites.js'
import { ROUTES } from '../../../constants/routes.js'
import { useGroup } from '../../../contexts/RootStore/hooks/useGroup.js'
import { useIsOnline } from '../../../hooks/useIsOnline.js'
import {
  formatDateTime,
  formatDateTimeForAriaLabel,
} from '../../../utils/formatDate.js'
import { Button } from '../../ui-kit/Button/Button.jsx'
import { Card } from '../../ui-kit/Card/Card.jsx'
import { CopyField } from '../../ui-kit/CopyField/CopyField.jsx'
import { Dialog } from '../../ui-kit/Dialog/Dialog.jsx'

interface Props {
  groupId: string
}

export const Invite = ({ groupId }: Props) => {
  const isOnline = useIsOnline()
  const { group } = useGroup({ groupId })
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const [expirationDate, setExpirationDate] = useState(new Date(0))

  const handleInvite = useCallback(() => {
    void (async () => {
      try {
        const { token, expiresAt } = await createInvite({ groupId })
        setInviteLink(`${window.location.origin}${ROUTES.INVITE(token)}`)
        setExpirationDate(expiresAt)
        setIsOpen(true)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [groupId])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  if (!isOnline || group.clientOnly) {
    return null
  }

  return (
    <>
      <Button
        disabled={isLoading}
        rounded
        size="sm"
        theme="green"
        onClick={handleInvite}
      >
        Invite
      </Button>

      <Dialog isOpen={isOpen} onClose={handleClose}>
        <Card>
          <Card.Title
            title="Your invite link is ready"
            actions={
              <div
                className="-my-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-green-100 dark:bg-opacity-75"
                aria-hidden="true"
              >
                <CheckIcon className="h-6 w-6 text-green-700" />
              </div>
            }
            tabIndex={0}
            aria-disabled="true"
          />
          <Card.Divider />
          <Card.Block aria-disabled="true">
            <CopyField value={inviteLink} />
          </Card.Block>
          <Card.Block tabIndex={0} aria-disabled="true">
            Share this link with the person you&apos;d like to invite.
            Remember,&nbsp;each link is unique and for one-time use only.
          </Card.Block>
          <Card.Block tabIndex={0} aria-disabled="true">
            <span>
              Will expire on{' '}
              <span aria-label={formatDateTimeForAriaLabel(expirationDate)}>
                {formatDateTime(expirationDate)}
              </span>
              .
            </span>
          </Card.Block>
          <Card.Divider />
          <Card.Footer fullWidth>
            <Button size="md" theme="green" onClick={handleClose}>
              Go back to group
            </Button>
          </Card.Footer>
        </Card>
      </Dialog>
    </>
  )
}
