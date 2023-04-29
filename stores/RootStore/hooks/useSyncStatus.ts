import { useRootStore } from '../RootStore.tsx'

export const useSyncStatus = () => {
  const { state } = useRootStore()

  return {
    isSyncing: state.isSyncing,
    syncedAt: state.syncedAt,
  }
}
