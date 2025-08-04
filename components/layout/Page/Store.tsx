import { useRootStore } from '@/contexts/RootStore/index'
import { Loading } from '../Loading'

type PageStoreProps = {
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
