import * as fns from 'date-fns'
import { FC } from 'react'
import { useSyncStatus } from '../../stores/RootStore/hooks/useSyncStatus.ts'

export const HeaderSync: FC = () => {
  const { isSyncing, syncedAt } = useSyncStatus()

  if (!syncedAt) {
    return null
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-28 h-10 px-2 font-medium bg-green-700 text-white rounded-md shadow-sm">
      {isSyncing ? (
        <span className="text-sm">Syncing...</span>
      ) : (
        <>
          <span className="text-xs">Synced</span>
          <span className="text-xs">{fns.format(syncedAt, `d MMM hh:mm`)}</span>
        </>
      )}
    </div>
  )
}
