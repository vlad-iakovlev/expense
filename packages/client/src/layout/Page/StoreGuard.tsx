import { useRootStore } from '@/contexts/RootStore'

type PageStoreGuardProps = {
  children: React.ReactNode
}

export const PageStoreGuard = ({ children }: PageStoreGuardProps) => {
  const { state } = useRootStore()

  return state.syncedAt ? children : null
}
