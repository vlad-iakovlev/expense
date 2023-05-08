import { PlusIcon } from '@heroicons/react/20/solid'
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { FC, useCallback, useState } from 'react'
import { createInvite } from '../../../api/client/invites.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { useIsOnline } from '../../../hooks/useIsOnline.ts'
import { useGroup } from '../../../stores/RootStore/hooks/useGroup.ts'
import { formatDate } from '../../../utils/formatDate.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
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
  const [isCopied, setIsCopied] = useState(false)

  const handleInvite = useCallback(() => {
    void (async () => {
      try {
        const { token, expiresAt } = await createInvite({ groupId })
        setInviteLink(`${window.location.origin}${ROUTES.INVITE(token)}`)
        setExpirationDate(expiresAt)
        setIsCopied(false)
        setIsOpen(true)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [groupId])

  const handleCopy = useCallback(() => {
    void (async () => {
      await navigator.clipboard.writeText(inviteLink)
      setIsCopied(true)
    })()
  }, [inviteLink])

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
        iconStart={<PlusIcon />}
        onClick={handleInvite}
      />

      <Dialog isOpen={isOpen} onClose={handleClose}>
        <div className="px-4 pt-5 pb-4 sm:p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-green-100">
            <CheckIcon className="h-6 w-6 text-green-700" aria-hidden="true" />
          </div>
          <h3 className="mt-5 text-xl font-medium leading-6">
            Your invite link for {group.name} is ready
          </h3>
          <button
            className="relative max-w-full h-9 mt-4 mx-auto py-1.5 pl-3 pr-12 truncate cursor-pointer rounded-md bg-zinc-100 shadow-sm ring-1 ring-black ring-opacity-5"
            onClick={handleCopy}
          >
            {inviteLink}
            {isCopied ? (
              <CheckIcon className="absolute top-1.5 right-3 w-6 h-6 text-green-700" />
            ) : (
              <DocumentDuplicateIcon className="absolute top-1.5 right-3 w-6 h-6" />
            )}
          </button>
          <p className="mt-4 text-zinc-600">
            Share this link with the person you&apos;d like to invite.
            Remember,&nbsp;each link is unique and for one-time use only.
          </p>
          <p className="mt-2 text-zinc-600">
            Will expire on {formatDate(expirationDate)}.
          </p>
          <Button className="w-full mt-6" onClick={handleClose}>
            Go back to group
          </Button>
        </div>
      </Dialog>
    </>
  )
}
