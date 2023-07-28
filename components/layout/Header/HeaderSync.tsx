import * as fns from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { useSyncStatus } from '../../../contexts/RootStore/hooks/useSyncStatus.ts'
import { formatDateTimeForAriaLabel } from '../../../utils/formatDate.ts'

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
        'flex flex-col items-center justify-center w-28 h-10 px-2 font-medium bg-green-700 text-white rounded-md shadow-inner',
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
