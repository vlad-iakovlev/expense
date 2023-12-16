import * as fns from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { useSyncStatus } from '../../../contexts/RootStore/hooks/useSyncStatus.js'
import { formatDateTimeForAriaLabel } from '../../../utils/formatDate.js'

interface Props {
  className?: string
}

export const HeaderSync = ({ className }: Props) => {
  const { isSyncing, syncedAt } = useSyncStatus()

  if (!syncedAt) {
    return null
  }

  return (
    <div
      className={twMerge(
        'flex h-10 w-28 flex-col items-center justify-center rounded-md bg-green-700 px-2 font-medium text-white shadow-inner',
        className,
      )}
      role="status"
      tabIndex={0}
    >
      {isSyncing ? (
        <span className="text-sm">Syncing...</span>
      ) : (
        <>
          <span className="text-xs" aria-label="Synced on">
            Synced
          </span>
          <span
            className="text-xs"
            aria-label={formatDateTimeForAriaLabel(syncedAt)}
          >
            {fns.format(syncedAt, `d MMM, H:mm`)}
          </span>
        </>
      )}
    </div>
  )
}
