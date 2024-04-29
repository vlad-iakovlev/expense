import { Loading } from '@/components/layout/Loading.jsx'
import { useRootStore } from '@/contexts/RootStore/index.jsx'

interface PageStoreProps {
  children: React.ReactNode
}

export const PageStore = ({ children }: PageStoreProps) => {
  const { state } = useRootStore()

  return (
    <>
      {!!state.syncedAt && children}
      {!state.syncedAt && <Loading />}
    </>
  )
}
