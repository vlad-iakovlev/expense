import * as fns from 'date-fns'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { useSyncStatus } from '../../../stores/RootStore/hooks/useSyncStatus.ts'

interface Props {
  className?: string
}

export const HeaderSync: FC<Props> = ({ className }) => {
  const { isSyncing, syncedAt } = useSyncStatus()

  if (!syncedAt) {
    return null
  }

  return (
    <div
      className={twMerge(
        'flex flex-col items-center justify-center w-28 h-10 px-2 font-medium bg-green-700 text-white rounded-md shadow-inner',
        className
      )}
    >
      {isSyncing ? (
        <span className="text-sm">Syncing...</span>
      ) : (
        <>
          <span className="text-xs">Synced</span>
          <span className="text-xs">{fns.format(syncedAt, `d MMM, H:mm`)}</span>
        </>
      )}
    </div>
  )
}
