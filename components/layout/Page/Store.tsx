import { useRootStore } from '@/contexts/RootStore/index.jsx'
import { Loading } from '../Loading.jsx'

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
