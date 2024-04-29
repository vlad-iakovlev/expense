import { Loading } from '@/components/pages/Loading.jsx'
import { useRootStore } from '@/contexts/RootStore/RootStore.jsx'

interface Props {
  children: React.ReactNode
}

export const PageStore = ({ children }: Props) => {
  const { state } = useRootStore()

  return (
    <>
      {!!state.syncedAt && children}
      {!state.syncedAt && <Loading />}
    </>
  )
}
