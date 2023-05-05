import { useMemo } from 'react'
import { useRootStore } from '../RootStore.tsx'
import { isTransactionEmpty } from '../utils.ts'

export const useSyncStatus = () => {
  const { state } = useRootStore()

  const isSyncing = useMemo(
    () => !isTransactionEmpty(state.syncingTransaction),
    [state.syncingTransaction]
  )

  return {
    isSyncing,
    syncedAt: state.syncedAt,
  }
}
