import { useRootStore } from '@/contexts/RootStore/index'

type PageStoreProps = {
  children: React.ReactNode
}

export const PageStore = ({ children }: PageStoreProps) => {
  const { state } = useRootStore()

  return state.syncedAt ? children : null
}
