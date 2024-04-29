import { useRootStore } from '../index.jsx'

export const useSyncStatus = () => {
  const { state } = useRootStore()

  return {
    isSyncing: state.isSyncing,
    syncedAt: state.syncedAt,
  }
}
