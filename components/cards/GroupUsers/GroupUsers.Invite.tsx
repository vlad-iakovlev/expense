import { CheckIcon } from '@heroicons/react/24/solid'
import { FC, useCallback, useState } from 'react'
import { createInvite } from '../../../api/client/invites.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { useIsOnline } from '../../../hooks/useIsOnline.ts'
import { useGroup } from '../../../stores/RootStore/hooks/useGroup.ts'
import { formatDateTime } from '../../../utils/formatDate.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { CopyField } from '../../ui-kit/CopyField/CopyField.tsx'
import { Dialog } from '../../ui-kit/Dialog/Dialog.tsx'

interface Props {
  groupId: string
}

export const Invite: FC<Props> = ({ groupId }) => {
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
      <Button disabled={isLoading} rounded size="sm" onClick={handleInvite}>
        Invite
      </Button>

      <Dialog isOpen={isOpen} onClose={handleClose}>
        <Card>
          <Card.Title
            title="Your invite link is ready"
            actions={
              <div className="flex-none flex items-center justify-center -my-1 w-10 h-10 rounded-full bg-green-100">
                <CheckIcon className="w-6 h-6 text-green-700" />
              </div>
            }
          />
          <Card.Divider />
          <Card.Block>
            <CopyField value={inviteLink} />
          </Card.Block>
          <Card.Block>
            Share this link with the person you&apos;d like to invite.
            Remember,&nbsp;each link is unique and for one-time use only.
          </Card.Block>
          <Card.Block>
            Will expire on {formatDateTime(expirationDate)}.
          </Card.Block>
          <Card.Divider />
          <Card.Footer fullWidth>
            <Button onClick={handleClose}>Go back to group</Button>
          </Card.Footer>
        </Card>
      </Dialog>
    </>
  )
}
